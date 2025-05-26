import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as AppleAuthentication from 'expo-apple-authentication'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin'

import background from '../assets/images/background.png'
import { useAuth } from '../hooks/useAuth'
import { RootStackParamList } from '../navigation'
import { colors, spacing, typography } from '../styles/theme'
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

// Initialize Google Sign In
GoogleSignin.configure({
  iosClientId: '748833929545-20qbo095b9fvbl1d6amaosk8onr0ecet.apps.googleusercontent.com',
  scopes: ['openid', 'profile', 'email'],
})

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false)
  const [useNativeAppleButton, setUseNativeAppleButton] = useState(true)

  // Check if Apple Authentication is available
  useEffect(() => {
    const checkAppleAuthAvailability = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync()
      setAppleAuthAvailable(isAvailable)
    }

    if (Platform.OS === 'ios') {
      checkAppleAuthAvailability()
    }
  }, [])

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)

      // Check if user is already signed in
      await GoogleSignin.hasPlayServices()

      const user = GoogleSignin.getCurrentUser()

      console.log(user, '@@')

      // Sign in
      const userInfo = await GoogleSignin.signIn()

      console.log(userInfo, '!?')

      if (userInfo) {
        // Use the auth context to login
        await login({
          id: userInfo.data?.user?.id || '',
          email: userInfo.data?.user?.email || undefined,
          name: userInfo.data?.user?.name || undefined,
          provider: 'google',
        })

        setIsLoading(false)
        navigation.navigate('Home')
      }
    } catch (error: any) {
      setIsLoading(false)

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the sign-in flow')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is in progress')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Play services not available or outdated')
      } else {
        console.error('Google Sign-In Error:', error)
        Alert.alert('Error', 'Failed to sign in with Google')
      }
    }
  }

  // Handle Apple Sign In (only for iOS)
  const handleAppleSignIn = async () => {
    try {
      setIsLoading(true)

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })

      // Got Apple credential successfully
      console.log('Apple Sign-In success:', credential.identityToken, credential)

      // Use the auth context to login
      await login({
        id: credential.user,
        email: credential.email || undefined,
        name: credential.fullName?.givenName
          ? `${credential.fullName.givenName} ${credential.fullName.familyName || ''}`.trim()
          : undefined,
        provider: 'apple',
      })

      setIsLoading(false)
      navigation.navigate('Home')
    } catch (error: any) {
      setIsLoading(false)

      // Handle user cancelling the sign-in flow
      if (error.code === 'ERR_CANCELED') {
        console.log('User cancelled Apple Sign-In')
      } else {
        console.error('Apple Sign-In Error:', error)
        Alert.alert('Error', 'Failed to sign in with Apple')
      }
    }
  }

  // Render Apple Auth Button - either native or custom
  const renderAppleAuthButton = () => {
    if (!appleAuthAvailable || Platform.OS !== 'ios') {
      return null
    }

    if (useNativeAppleButton) {
      return (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={0}
          style={styles.appleAuthButton}
          onPress={handleAppleSignIn}
        />
      )
    } else {
      return (
        <TouchableOpacity
          style={[styles.authButton, styles.appleButton]}
          onPress={handleAppleSignIn}
        >
          <Text style={styles.authButtonText}>Continue with Apple</Text>
        </TouchableOpacity>
      )
    }
  }

  return (
    <ImageBackground source={background} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.authContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.gold} />
          ) : (
            <>
              <GoogleSigninButton
                onPress={handleGoogleSignIn}
                size={GoogleSigninButton.Size.Wide}
                style={styles.googleButton}
              />
              {renderAppleAuthButton()}
            </>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: spacing.xxl * 2,
  },
  title: {
    fontFamily: typography.fontFamilies.title,
    fontSize: typography.fontSizes.xxlarge,
    color: colors.gold,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSizes.medium,
    color: colors.gold,
    textAlign: 'center',
  },
  authContainer: {
    display: 'flex',
    width: '80%',
    height: '100%',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundGreen,
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: 30,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    width: '100%',
    marginBottom: spacing.md,
  },
  googleButton: {
    width: '100%',
  },
  appleButton: {
    width: '100%',
    backgroundColor: '#000',
  },
  appleAuthButton: {
    width: '100%',
    height: 50,
    marginBottom: spacing.md,
    fontFamily: typography.fontFamilies.body,
  },
  authButtonText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSizes.medium,
    color: colors.gold,
  },
  skipButton: {
    marginTop: spacing.md,
  },
  skipButtonText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSizes.medium,
    color: colors.gold,
    textDecorationLine: 'underline',
  },
})

export default LoginScreen
