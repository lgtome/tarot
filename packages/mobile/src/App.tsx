import { GideonRoman_400Regular, useFonts } from '@expo-google-fonts/gideon-roman'
import * as SplashScreen from 'expo-splash-screen'
import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './navigation'
import { AuthProvider } from './hooks/useAuth'
import { ApolloProvider } from './providers/ApolloProvider'
import './i18n'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    GideonRoman: GideonRoman_400Regular,
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaProvider style={styles.container} onLayout={onLayoutRootView}>
      <ApolloProvider>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </ApolloProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
})
