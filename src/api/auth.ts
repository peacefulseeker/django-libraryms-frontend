import axios from '@/axios';
import type {
  AuthenticatedResponse,
  RegistrationCredentials,
  RegistrationResponse,
} from '@/types/auth';

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

export const registerMember = async ({
  username,
  password,
  passwordConfirm,
  email,
  firstName,
  lastName,
}: RegistrationCredentials): Promise<RegistrationResponse> => {
  const url = `/api/v1/auth/register/`;
  const data = {
    username,
    password,
    passwordConfirm,
    email,
    firstName,
    lastName,
  };

  return (await axios.post(url, data)).data as RegistrationResponse;
};

export const clearToken = async (): Promise<void> => {
  const url = `/api/v1/auth/token/`;
  await axios.delete(url);
};
