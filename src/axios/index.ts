import axios, { AxiosError, AxiosResponse } from 'axios';

import useAuth from '@/stores/auth';
import onResponseFulfilled from '@/axios/onResponseFulfilled';
import onResponseRejected from '@/axios/onResponseRejected';
import onRequestFulfilled from '@/axios/onRequestFulfilled';

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

  const { useResponseCaseMiddleware } = config;

  instance.interceptors.request.use((request) => onRequestFulfilled(request));
  instance.interceptors.response.use(
    (response: AxiosResponse) => onResponseFulfilled(response, useResponseCaseMiddleware),
    (error: AxiosError) => onResponseRejected(error, useResponseCaseMiddleware),
  );

  return instance;
};

export default customAxiosInstance();
