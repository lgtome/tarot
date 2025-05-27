import { STORAGE_KEYS } from '@/constants/storage.constants'
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import AsyncStorage from '@react-native-async-storage/async-storage'

const GRAPHQL_ENDPOINT = process.env.EXPO_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql'

const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
})

const authLink = setContext(async (_, { headers }) => {
  try {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  } catch (error) {
    console.error('Error getting auth token:', error)
    return { headers }
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`)
    })
  }

  if (networkError) {
    console.error(`Network error: ${networkError}`)

    if ('statusCode' in networkError && networkError.statusCode === 401) {
      AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    }
  }
})

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'ignore',
    },
    query: {
      errorPolicy: 'all',
    },
  },
})

export const setAuthToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
    await apolloClient.resetStore()
  } catch (error) {
    console.error('Error setting auth token:', error)
  }
}

export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    await apolloClient.clearStore()
  } catch (error) {
    console.error('Error removing auth token:', error)
  }
}

export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  } catch (error) {
    console.error('Error getting auth token:', error)
    return null
  }
}
