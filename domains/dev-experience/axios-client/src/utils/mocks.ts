import type { AxiosInstance } from 'axios';
import type { Mock } from 'vitest';

import type { createAxiosInstance } from '../createAxiosInstance';

export const mockAxiosInstance = vi.fn() as unknown as Mock<AxiosInstance> &
  ReturnType<typeof createAxiosInstance>;
