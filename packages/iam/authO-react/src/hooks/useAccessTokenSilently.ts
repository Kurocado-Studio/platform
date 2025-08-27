import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useEffect, useState } from 'react';

import { OktaUserAdapter } from '../domain/adapters';
import type {
  AuthOktaToken,
  AuthOktaUser,
  UseAccessTokenSilentlyState,
  UserAccessTokenSilentlyOptions,
} from '../domain/types';

export const useAccessTokenSilently = (
  options: UserAccessTokenSilentlyOptions,
): UseAccessTokenSilentlyState => {
  const { toUser, toUserToken } = OktaUserAdapter.create();

  const {
    error,
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    user,
  } = useAuth0<AuthOktaUser>();

  const [authOktaToken, setAuthOktaToken] = useState<
    AuthOktaToken | undefined
  >();

  const handleGetAccessTokenSilently = useCallback(async () => {
    try {
      const payload: AuthOktaToken = await getAccessTokenSilently({
        ...options,
        detailedResponse: true,
      });

      setAuthOktaToken(payload);
    } catch {
      loginWithRedirect(options).then();
    }
  }, [getAccessTokenSilently, loginWithRedirect, options]);

  useEffect(() => {
    if (authOktaToken === undefined && !isLoading) {
      handleGetAccessTokenSilently().then();
    }
  }, [handleGetAccessTokenSilently, isLoading, authOktaToken]);

  return {
    error,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    handleGetAccessTokenSilently,
    userToken: toUserToken(authOktaToken),
    user: toUser(user),
  };
};
