import {
  useQuery,
  useMutation,
  useLazyQuery,
  QueryHookOptions,
  MutationHookOptions,
} from '@apollo/client'
import { DocumentNode } from 'graphql'

// Custom hook for queries with common error handling
export const useAppQuery = <TData = any, TVariables = any>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>,
) => {
  const result = useQuery<TData, TVariables>(query, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    ...options,
  })

  return {
    ...result,
    isLoading: result.loading,
    hasError: !!result.error,
  }
}

// Custom hook for mutations with common error handling
export const useAppMutation = <TData = any, TVariables = any>(
  mutation: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>,
) => {
  const [mutate, result] = useMutation<TData, TVariables>(mutation, {
    errorPolicy: 'all',
    ...options,
  })

  return [
    mutate,
    {
      ...result,
      isLoading: result.loading,
      hasError: !!result.error,
    },
  ] as const
}

// Custom hook for lazy queries
export const useAppLazyQuery = <TData = any, TVariables = any>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>,
) => {
  const [execute, result] = useLazyQuery<TData, TVariables>(query, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    ...options,
  })

  return [
    execute,
    {
      ...result,
      isLoading: result.loading,
      hasError: !!result.error,
    },
  ] as const
}
