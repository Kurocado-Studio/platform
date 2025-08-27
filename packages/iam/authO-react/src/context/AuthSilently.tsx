import { Auth0Provider, type LogoutOptions } from '@auth0/auth0-react';
import { get } from 'lodash-es';
import * as React from 'react';
import { useCallback, useMemo } from 'react';

import { OrgUser, OrgUserToken } from '../domain/models';
import type {
  User,
  UserAccessTokenSilentlyOptions,
  UserToken,
} from '../domain/types';
import { useAccessTokenSilently } from '../hooks/useAccessTokenSilently';

export interface AuthSilentlyContextState {
  isAuthenticated: boolean;
  isLoading: boolean;
  userToken: UserToken;
  handleLogout: (options?: LogoutOptions) => Promise<void>;
  user: User;
}

export const AuthSilentlyContext =
  React.createContext<AuthSilentlyContextState>({
    isAuthenticated: false,
    isLoading: true,
    userToken: OrgUserToken.create({}),
    handleLogout: () => Promise.resolve(),
    user: OrgUser.create(),
  });

export const useAuthSilentlyContext = (): AuthSilentlyContextState =>
  React.useContext(AuthSilentlyContext);

export interface AuthProviderProps extends UserAccessTokenSilentlyOptions {
  children: React.FC<{
    isLoading: boolean;
    isAuthenticated: boolean;
    user: User;
  }>;
  loaderComponent?: React.ReactNode;
  onRedirectComponent?: React.ReactNode;
}

function AuthSilently({
  children,
  ...restAuthProviderOpts
}: AuthProviderProps): React.ReactNode {
  const { isLoading, isAuthenticated, logout, user, userToken } =
    useAccessTokenSilently(restAuthProviderOpts);

  const handleLogout: AuthSilentlyContextState['handleLogout'] = useCallback(
    (options) => {
      const defaultOptions = {
        logoutParams: {
          returnTo: get(import.meta.env, ['VITE_AUTH_REDIRECT_URI'], ''),
        },
      };
      return logout(options || defaultOptions);
    },
    [logout],
  );

  const authAccess: AuthSilentlyContextState = useMemo(
    () => ({
      isAuthenticated,
      userToken,
      isLoading,
      user,
      handleLogout,
    }),
    [isAuthenticated, isLoading, handleLogout, user, userToken],
  );

  return (
    <AuthSilentlyContext.Provider value={authAccess}>
      {children({ isLoading, isAuthenticated, user })}
    </AuthSilentlyContext.Provider>
  );
}

export function AuthSilentlyProvider({
  children,
  ...restAuthProviderOpts
}: AuthProviderProps): React.JSX.Element {
  return (
    <Auth0Provider {...restAuthProviderOpts}>
      <AuthSilently {...restAuthProviderOpts}>{children}</AuthSilently>
    </Auth0Provider>
  );
}
