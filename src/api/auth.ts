import axios from '@/axios';
import type { AuthToken } from '@/types/auth';

type LoginResponse = {
  access: AuthToken;
};

export const refreshAuth = async () => {
  const url = `/api/v1/auth/token/refresh/`;

  return (await axios.post(url)).data as LoginResponse;
};

export const loginWithCredentials = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const url = `/api/v1/auth/token/`;
  const data = {
    username,
    password,
  };

  return (await axios.post(url, data)).data as LoginResponse;
};

export const clearToken = async () => {
  const url = `/api/v1/auth/token/`;
  await axios.delete(url);
};
