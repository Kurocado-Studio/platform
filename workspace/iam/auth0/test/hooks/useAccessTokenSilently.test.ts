import { useAuth0 } from '@auth0/auth0-react';
import { ReactTestingLibrary } from '@kurocado-studio/qa';
import { type Mock, vi } from 'vitest';

import {
  type UserAccessTokenSilentlyOptions,
  useAccessTokenSilently,
} from '../../src';

const { renderHook, waitFor } = ReactTestingLibrary;

vi.mock('@auth0/auth0-react', () => ({
  useAuth0: vi.fn(),
}));

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
    mockUseAuth0 = useAuth0 as Mock;
    mockLoginWithRedirect = vi.fn();
    mockGetAccessTokenSilently = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call getAccessTokenSilently onload', async () => {
    mockUseAuth0.mockReturnValue({
      error: null,
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
      error: null,
      getAccessTokenSilently: mockGetAccessTokenSilently,
      isAuthenticated: false,
      isLoading: false,
      loginWithRedirect: mockLoginWithRedirect,
      logout: vi.fn(),
      user: null,
    });

    const { result } = renderHook(() => useAccessTokenSilently(options));
    await waitFor(() => result);

    expect(mockLoginWithRedirect).toHaveBeenCalledWith(options);
  });
});
