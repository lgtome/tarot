import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { useAuth } from '../hooks/useAuth'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import ReadingScreen from '../screens/ReadingScreen'

export type RootStackParamList = {
  Login: undefined
  Home: undefined
  Reading: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const Navigation = () => {
  const { isLoggedIn, isLoading, logout } = useAuth()

  if (isLoading) {
    return null
  }

  logout()

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'Home' : 'Login'}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade',
        }}
      >
        {!isLoggedIn && <Stack.Screen name="Login" component={LoginScreen} />}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Reading" component={ReadingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
