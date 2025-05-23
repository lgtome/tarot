# Authentication Setup for Tarot Cards App

This document provides instructions for setting up Google and Apple authentication for the Tarot Cards mobile app.

## Implementation Status

The app now uses:

- Expo Auth Session for Google authentication
- Expo Apple Authentication for Apple Sign-In on iOS devices

## Google Sign-In Configuration

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Choose "Web application" as the application type (required for Expo Auth Session)

   - Add authorized JavaScript origins:
     - `https://auth.expo.io`
   - Add authorized redirect URIs:
     - `https://auth.expo.io/@your-expo-username/tarot-cards`
     - Replace `your-expo-username` with your actual Expo username
   - Click "Create"
   - Save the Client ID (this is your webClientId)

6. Update the LoginScreen.tsx file with your Google client ID:

```typescript
// In LoginScreen.tsx
const googleClientId = 'YOUR_WEB_CLIENT_ID'; // Replace with your Web client ID from Google Cloud Console
```

## Apple Sign-In Configuration

Apple Sign In has been implemented using expo-apple-authentication and requires:

1. An Apple Developer account (paid membership)
2. Proper configuration in your Apple Developer account

To set up Apple Sign In:

1. Go to the [Apple Developer Console](https://developer.apple.com/account/)
2. Navigate to "Certificates, IDs & Profiles"
3. Register a new App ID if you haven't already
4. Enable "Sign In with Apple" capability for your App ID
5. Go to your Xcode project and ensure:
   - Your bundle identifier matches the one in app.json
   - "Sign In with Apple" capability is enabled
   - You have proper provisioning profiles

Note: Apple Sign In requires a real iOS device for testing. It will not work in the iOS simulator.

## Testing Authentication

To test the authentication flow:

1. Update the Google client ID in the code as shown above
2. Make sure your app.json has the correct "scheme" setting (currently set to "tarotcards")
3. Run the app:
   ```
   yarn start
   ```
4. Test Google Sign-In:

   - This should work on both iOS and Android
   - You'll be redirected to a browser for authentication
   - After successful authentication, you'll be redirected back to the app

5. Test Apple Sign-In (iOS only):
   - This will only work on a real iOS device, not in the simulator
   - You must have "Sign In with Apple" properly configured in your Apple Developer account
   - The user must be signed in to an Apple ID on their device

## Troubleshooting

- **Google Sign-In Issues**:

  - Make sure your Google Cloud Console project has the OAuth consent screen configured
  - Verify that you're using the Web client ID, not the iOS or Android client ID
  - Check that your redirect URI is correctly formatted with your Expo username

- **Apple Sign-In Issues**:

  - Apple Sign In only works on physical iOS devices, not simulators
  - Ensure your Apple Developer account is active (paid)
  - The bundle identifier in app.json must match your registered App ID
  - Make sure "Sign In with Apple" capability is enabled for your App ID
  - The user must be signed into an Apple ID on their device

- **Redirect Issues**:
  - Ensure the "scheme" in app.json matches the scheme in your redirect URI
  - For Expo Go, the authentication will use the auth.expo.io proxy

## Next Steps

1. For production:

   - Configure proper backend verification of tokens
   - Add token refresh logic
   - Handle first-time vs. returning users

2. Additional features:
   - Add sign-out functionality
   - Implement token expiration handling
   - Add profile information display
