import axios from '@/axios';
import type { AuthenticatedResponse } from '@/types/auth';

export const refreshAuth = async () => {
  const url = `/api/v1/auth/token/refresh/`;

  return (await axios.post(url)).data as AuthenticatedResponse;
};

export const loginWithCredentials = async (
  username: string,
  password: string,
): Promise<AuthenticatedResponse> => {
  const url = `/api/v1/auth/token/`;
  const data = {
    username,
    password,
  };

  return (await axios.post(url, data)).data as AuthenticatedResponse;
};

export const clearToken = async () => {
  const url = `/api/v1/auth/token/`;
  await axios.delete(url);
};
