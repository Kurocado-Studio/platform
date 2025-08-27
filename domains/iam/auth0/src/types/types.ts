import type { Auth0ContextInterface } from '@auth0/auth0-react';

export interface AuthOktaUserAdapter {
  toUser: (authOktaUser?: Partial<AuthOktaUser>) => User;
  toUserToken: (authOktaToken?: Partial<AuthOktaToken>) => UserToken;
}

export interface UserAdapter {
  toAuthOktaUser: (user: User) => AuthOktaUser;
}

export interface UserAccessTokenSilentlyOptions {
  cacheMode?: 'on' | 'off' | 'cache-only';
  domain: string;
  clientId: string;
  authorizationParams: {
    redirect_uri?: string;
    scope?: string;
    audience?: string;
    [key: string]: any;
  };
  timeoutInSeconds?: number;
  detailedResponse?: boolean;
}

export type UseAccessTokenSilentlyState = Pick<
  Auth0ContextInterface<User>,
  | 'error'
  | 'isAuthenticated'
  | 'isLoading'
  | 'loginWithRedirect'
  | 'logout'
  | 'user'
> & {
  userToken: UserToken;
  user: User;
  handleGetAccessTokenSilently: () => Promise<void>;
};

export type AuthOktaToken = {
  id_token: string;
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  scope?: string;
};

export interface UserToken {
  accessToken: string;
  expiresIn: number;
  idToken: string;
  refreshToken?: string;
  scope?: string;
}

export interface AuthOktaUser {
  name: string;
  given_name: string;
  family_name: string;
  middle_name: string;
  nickname: string;
  preferred_username: string;
  profile: string;
  picture: string;
  website: string;
  email: string;
  email_verified: boolean;
  gender: string;
  birthdate: string;
  zoneinfo: string;
  locale: string;
  phone_number: string;
  phone_number_verified: boolean;
  address: string;
  updated_at: string;
  sub: string;
  [key: string]: any;
}

export interface User {
  name: string;
  givenName: string;
  familyName: string;
  middleName: string;
  nickname: string;
  preferredUsername: string;
  profile: string;
  picture: string;
  website: string;
  email: string;
  emailVerified: boolean;
  gender: string;
  birthdate: string;
  zoneInfo: string;
  locale: string;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  address: string;
  updatedAt: string;
  sub: string;
}
