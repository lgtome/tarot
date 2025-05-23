declare module 'react-native-apple-authentication' {
  export enum Operation {
    LOGIN = 0,
    REFRESH = 1,
    LOGOUT = 2,
    IMPLICIT = 3,
  }

  export enum Scope {
    EMAIL = 0,
    FULL_NAME = 1,
  }

  export interface AppleRequestResponse {
    user?: string;
    email?: string;
    nonce?: string;
    identityToken?: string;
    realUserStatus?: number;
    state?: string;
    authorizedScopes?: Scope[];
    fullName?: {
      namePrefix?: string;
      givenName?: string;
      nameSuffix?: string;
      middleName?: string;
      familyName?: string;
      nickname?: string;
    };
  }

  export interface AppleRequestOptions {
    requestedOperation?: Operation;
    requestedScopes?: Scope[];
    user?: string;
    nonce?: string;
    state?: string;
  }

  export function performRequest(options: AppleRequestOptions): Promise<AppleRequestResponse>;

  export const isSupported: boolean;

  export default {
    Operation,
    Scope,
    performRequest,
    isSupported,
  };
}
