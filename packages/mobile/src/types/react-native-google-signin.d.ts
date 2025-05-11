declare module '@react-native-google-signin/google-signin' {
  export interface User {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
  }

  export interface SignInResult {
    idToken: string | null;
    serverAuthCode: string | null;
    user: User;
  }

  export const statusCodes: {
    SIGN_IN_CANCELLED: string;
    IN_PROGRESS: string;
    PLAY_SERVICES_NOT_AVAILABLE: string;
    SIGN_IN_REQUIRED: string;
  };

  export const GoogleSignin: {
    configure(options: {
      scopes?: string[];
      webClientId?: string;
      offlineAccess?: boolean;
      hostedDomain?: string;
      loginHint?: string;
      forceCodeForRefreshToken?: boolean;
      accountName?: string;
      iosClientId?: string;
    }): void;
    hasPlayServices(options?: { showPlayServicesUpdateDialog: boolean }): Promise<boolean>;
    signIn(): Promise<SignInResult>;
    signInSilently(): Promise<SignInResult>;
    isSignedIn(): Promise<boolean>;
    getCurrentUser(): Promise<SignInResult | null>;
    clearCachedToken(token: string): Promise<null>;
    revokeAccess(): Promise<null>;
    signOut(): Promise<null>;
  };
} 