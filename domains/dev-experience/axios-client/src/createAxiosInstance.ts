import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { get } from 'lodash-es';
import axios from 'axios';

export const createAxiosInstance = (
  config?: Partial<AxiosRequestConfig>,
): AxiosInstance => {
  return axios.create({
    ...config,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...get(config, ['headers'], {}),
    },
  });
};
