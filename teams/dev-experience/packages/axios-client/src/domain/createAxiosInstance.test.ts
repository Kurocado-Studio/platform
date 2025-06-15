import axios from 'axios';

import { createAxiosInstance } from './createAxiosInstance';

vi.mock('axios', () => ({
  default: {
    create: vi.fn(),
  },
}));

describe('createAxiosInstance', () => {
  const mockCreate = axios.create as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockCreate.mockReset();
  });

  it('should create axios instance with default headers', () => {
    createAxiosInstance();

    expect(mockCreate).toHaveBeenCalledWith({
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  });

  it('should merge custom headers with default headers', () => {
    const config = {
      headers: {
        Authorization: 'Bearer token',
        Accept: 'application/custom+json',
      },
    };

    createAxiosInstance(config);

    expect(mockCreate).toHaveBeenCalledWith({
      ...config,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/custom+json',
        Authorization: 'Bearer token',
      },
    });
  });

  it('should merge additional config fields', () => {
    const config = {
      baseURL: 'https://api.example.com',
      timeout: 1000,
    };

    createAxiosInstance(config);

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://api.example.com',
      timeout: 1000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  });
});
