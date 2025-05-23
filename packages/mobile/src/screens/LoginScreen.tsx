import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import background from '../assets/images/background.png';
import { useAuth } from '../hooks/useAuth';
import { RootStackParamList } from '../navigation';
import { colors, spacing, typography } from '../styles/theme';
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

// Register WebBrowser for redirects
WebBrowser.maybeCompleteAuthSession();

// Google OAuth config
const googleDiscoveryUri = 'https://accounts.google.com';
const googleClientId = 'YOUR_WEB_CLIENT_ID'; // Replace with your Google client ID
const useGoogleAuth = () => {
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: googleClientId,
      scopes: ['profile', 'email'],
      redirectUri: AuthSession.makeRedirectUri({ scheme: 'tarotcards' }),
    },
    {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
      revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
    }
  );

  return { request, response, promptAsync };
};

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);
  const [useNativeAppleButton, setUseNativeAppleButton] = useState(true);

  // Set up Google Auth
  const {
    request: googleRequest,
    response: googleResponse,
    promptAsync: googlePromptAsync,
  } = useGoogleAuth();

  // Check if Apple Authentication is available
  useEffect(() => {
    const checkAppleAuthAvailability = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailable(isAvailable);
    };

    if (Platform.OS === 'ios') {
      checkAppleAuthAvailability();
    }
  }, []);

  // Handle Google Sign-In response
  React.useEffect(() => {
    if (googleResponse?.type === 'success') {
      handleGoogleSuccess(googleResponse.authentication?.accessToken);
    }
  }, [googleResponse]);

  // Process Google authentication success
  const handleGoogleSuccess = async (accessToken?: string) => {
    try {
      setIsLoading(true);

      if (!accessToken) {
        throw new Error('No access token received');
      }

      // Fetch user info from Google
      const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const userData = await userInfoResponse.json();
      console.log('Google user data:', userData);

      // Use the auth context to login
      await login({
        id: userData.id || String(Date.now()),
        email: userData.email,
        name: userData.name,
        provider: 'google',
      });

      setIsLoading(false);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      setIsLoading(false);
      Alert.alert('Error', 'Failed to sign in with Google');
    }
  };

  // Initiate Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      if (!googleRequest) {
        Alert.alert('Error', 'Google authentication is not ready');
        return;
      }

      setIsLoading(true);
      await googlePromptAsync();
    } catch (error) {
      console.error('Error starting Google sign-in:', error);
      setIsLoading(false);
      Alert.alert('Error', 'Failed to start Google sign-in process');
    }
  };

  // Handle Apple Sign In (only for iOS)
  const handleAppleSignIn = async () => {
    try {
      setIsLoading(true);

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // Got Apple credential successfully
      console.log('Apple Sign-In success:', credential.identityToken, credential);

      // Use the auth context to login
      await login({
        id: credential.user,
        email: credential.email || undefined,
        name: credential.fullName?.givenName
          ? `${credential.fullName.givenName} ${credential.fullName.familyName || ''}`.trim()
          : undefined,
        provider: 'apple',
      });

      setIsLoading(false);
      navigation.navigate('Home');
    } catch (error: any) {
      setIsLoading(false);

      // Handle user cancelling the sign-in flow
      if (error.code === 'ERR_CANCELED') {
        console.log('User cancelled Apple Sign-In');
      } else {
        console.error('Apple Sign-In Error:', error);
        Alert.alert('Error', 'Failed to sign in with Apple');
      }
    }
  };

  // Continue as guest
  const handleGuestSignIn = async () => {
    try {
      setIsLoading(true);

      // Create a guest user with a random ID
      const guestId = `guest-${Date.now()}`;

      // Use the auth context to login
      await login({
        id: guestId,
        provider: 'guest',
      });

      setIsLoading(false);
      navigation.navigate('Home');
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to continue as guest');
    }
  };

  // Render Apple Auth Button - either native or custom
  const renderAppleAuthButton = () => {
    if (!appleAuthAvailable || Platform.OS !== 'ios') {
      return null;
    }

    if (useNativeAppleButton) {
      return (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={30}
          style={styles.appleAuthButton}
          onPress={handleAppleSignIn}
        />
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.authButton, styles.appleButton]}
          onPress={handleAppleSignIn}
        >
          <Text style={styles.authButtonText}>Continue with Apple</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <ImageBackground source={background} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.authContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.gold} />
          ) : (
            <>
              <TouchableOpacity
                style={styles.authButton}
                onPress={handleGoogleSignIn}
                disabled={!googleRequest}
              >
                <Text style={styles.authButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              {renderAppleAuthButton()}
            </>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

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
  appleButton: {
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
});

export default LoginScreen;
