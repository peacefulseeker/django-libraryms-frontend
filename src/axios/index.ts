import axios, { type AxiosResponse } from 'axios';

import onRequestFulfilled from '@/axios/onRequestFulfilled';
import onResponseFulfilled from '@/axios/onResponseFulfilled';
import onResponseRejected from '@/axios/onResponseRejected';
import { APIError } from '@/types/axios';

interface CustomAxiosInstanceConfig {
  useResponseCaseMiddleware: boolean;
  useRequestCaseMiddleware: boolean;
}

export const customAxiosInstance = (userConfig: Partial<CustomAxiosInstanceConfig> = {}) => {
  const instance = axios.create();

  const defaultConfig = {
    useResponseCaseMiddleware: true,
    useRequestCaseMiddleware: true,
  };

  const config = {
    ...defaultConfig,
    ...userConfig,
  } as CustomAxiosInstanceConfig;

  const { useResponseCaseMiddleware, useRequestCaseMiddleware } = config;

  instance.interceptors.request.use((request) =>
    onRequestFulfilled(request, useRequestCaseMiddleware),
  );
  instance.interceptors.response.use(
    (response: AxiosResponse) => onResponseFulfilled(response, useResponseCaseMiddleware),
    (error: APIError) => onResponseRejected(error, useResponseCaseMiddleware),
  );

  return instance;
};

export default customAxiosInstance();
