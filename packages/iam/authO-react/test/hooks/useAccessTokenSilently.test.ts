import { useAuth0 } from '@auth0/auth0-react';
import { renderHook, waitFor } from '@kurocado-studio/qa/web';
import { type Mock, vi } from 'vitest';

import {
  type UserAccessTokenSilentlyOptions,
  useAccessTokenSilently,
} from '../../src';

vi.mock('@auth0/auth0-react', async () => {
  const actual = await vi.importActual('@auth0/auth0-react');
  return {
    ...actual,
    useAuth0: vi.fn(),
  };
});

const options: UserAccessTokenSilentlyOptions = {
  cacheMode: 'on',
  domain: 'test.domain.com',
  clientId: 'test-client-id',
  authorizationParams: {
    redirect_uri: 'http://localhost',
  },
};

describe('useAccessTokenSilently', () => {
  let mockLoginWithRedirect: Mock;
  let mockGetAccessTokenSilently: Mock;
  let mockUseAuth0: Mock;

  beforeEach(() => {
    mockUseAuth0 = vi.mocked(useAuth0);
    mockLoginWithRedirect = vi.fn();
    mockGetAccessTokenSilently = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call getAccessTokenSilently onload', async () => {
    mockUseAuth0.mockReturnValue({
      error: undefined,
      getAccessTokenSilently: mockGetAccessTokenSilently,
      isAuthenticated: false,
      isLoading: false,
      loginWithRedirect: mockLoginWithRedirect,
      logout: vi.fn(),
    });

    const { result } = renderHook(() => useAccessTokenSilently(options));
    await waitFor(() => result);

    expect(mockGetAccessTokenSilently).toHaveBeenCalledWith({
      ...options,
      detailedResponse: true,
    });
    expect(mockLoginWithRedirect).not.toHaveBeenCalled();
  });

  it('should call loginWithRedirect when getAccessTokenSilently fails', async () => {
    mockGetAccessTokenSilently.mockRejectedValue(
      new Error('Access token error'),
    );
    mockLoginWithRedirect.mockResolvedValue({});

    mockUseAuth0.mockReturnValue({
      error: undefined,
      getAccessTokenSilently: mockGetAccessTokenSilently,
      isAuthenticated: false,
      isLoading: false,
      loginWithRedirect: mockLoginWithRedirect,
      logout: vi.fn(),
      user: undefined,
    });

    const { result } = renderHook(() => useAccessTokenSilently(options));
    await waitFor(() => result);

    expect(mockLoginWithRedirect).toHaveBeenCalledWith(options);
  });
});
