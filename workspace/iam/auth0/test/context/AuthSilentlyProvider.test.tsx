import { faker } from '@kurocado-studio/qa';
import { ReactTestingLibrary } from '@kurocado-studio/qa';
import * as React from 'react';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  type AuthProviderProps,
  AuthSilentlyContext,
  type AuthSilentlyContextState,
  AuthSilentlyProvider,
  OrgUser,
  OrgUserToken,
  useAuthSilentlyContext,
} from '../../src';

const { screen, render, renderHook } = ReactTestingLibrary;

function TestAuthAccessSilentlyProvider(
  props: AuthProviderProps,
): React.ReactNode {
  return (
    <AuthSilentlyProvider {...props}>
      {({ isLoading }) =>
        isLoading ? <h1>Loading...</h1> : <h1>Hello User!</h1>
      }
    </AuthSilentlyProvider>
  );
}

describe('AuthAccessSilentlyProvider', () => {
  let logoutMock: Mock;
  let mockContext: AuthSilentlyContextState;
  let auth0ProviderParams: AuthProviderProps;
  let domainName: string;
  let clientId: string;
  let domain: string;

  beforeEach(() => {
    clientId = faker.string.uuid();
    domain = faker.string.uuid();
    domainName = faker.internet.domainName();

    auth0ProviderParams = {
      clientId,
      domain,
      authorizationParams: {
        redirect_uri: domainName,
      },
      children: ({ isLoading }) => {
        return isLoading ? <h1>Loading...</h1> : <h1>Hello User!</h1>;
      },
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initial render', () => {
    it('lets the user know the provider is trying to login the user', () => {
      render(<TestAuthAccessSilentlyProvider {...auth0ProviderParams} />);
      expect(screen.getByText(/Loading.../i)).toBeDefined();
    });
  });

  describe('interfacing with context', () => {
    beforeEach(() => {
      logoutMock = vi.fn();

      mockContext = {
        isAuthenticated: true,
        isLoading: false,
        userToken: OrgUserToken.create({
          accessToken: faker.string.uuid(),
          expiresIn: 3600,
        }),
        handleLogout: logoutMock,
        user: OrgUser.create({
          name: faker.person.firstName(),
          email: faker.internet.email(),
        }),
      };
    });

    it('should interface correctly with the state of useAuth0', () => {
      const { result } = renderHook(() => useAuthSilentlyContext(), {
        wrapper: ({
          children,
        }: {
          children: React.ReactNode;
        }): React.ReactNode => (
          <AuthSilentlyContext.Provider value={mockContext}>
            {children}
          </AuthSilentlyContext.Provider>
        ),
      });

      expect(result.current.isAuthenticated).toBeTruthy();
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.userToken).toStrictEqual(mockContext.userToken);
      expect(result.current.user).toStrictEqual(mockContext.user);
    });

    it('should call logout with default params if no params are passed', () => {
      const { result } = renderHook(() => useAuthSilentlyContext(), {
        wrapper: ({
          children,
        }: {
          children: React.ReactNode;
        }): React.ReactNode => (
          <AuthSilentlyContext.Provider value={mockContext}>
            {children}
          </AuthSilentlyContext.Provider>
        ),
      });

      result.current.handleLogout();

      expect(logoutMock).toHaveBeenCalledTimes(1);
    });
  });
});
