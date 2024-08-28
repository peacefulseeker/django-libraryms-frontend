import axios from '@/axios';
import type {
  AuthenticatedResponse,
  RegistrationCredentials,
  RegistrationResponse,
  User,
} from '@/types/auth';

export const refreshAuth = async (fetchUser: boolean = false) => {
  let url = '/api/v1/auth/token/refresh/';
  if (fetchUser) {
    url += '?fetch_user';
  }
  return (await axios.post(url)).data as AuthenticatedResponse;
};

export const loginWithCredentials = async (
  username: string,
  password: string,
  fetchUser: boolean = false,
): Promise<AuthenticatedResponse> => {
  let url = '/api/v1/auth/token/';
  if (fetchUser) {
    url += '?fetch_user';
  }
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

export const changePassword = async (
  passwordCurrent: string,
  passwordNew: string,
  passwordNewConfirm: string,
): Promise<void> => {
  const url = `/api/v1/auth/password/change/`;
  const data = {
    passwordCurrent,
    passwordNew,
    passwordNewConfirm,
  };

  return (await axios.put(url, data)).data as void;
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  const url = `/api/v1/auth/password/reset/`;
  const data = {
    email,
  };

  return (await axios.post(url, data)).data as void;
};

export const confirmPasswordReset = async (
  token: string,
  newPassword: string,
  newPasswordConfirm: string,
): Promise<void> => {
  const url = `/api/v1/auth/password/reset-confirm/`;
  const data = {
    token,
    newPassword,
    newPasswordConfirm,
  };

  return (await axios.post(url, data)).data as void;
};

export const clearToken = async (): Promise<void> => {
  const url = `/api/v1/auth/token/`;
  await axios.delete(url);
};

export const getUser = async (): Promise<User> => {
  const url = `/api/v1/auth/me/`;
  return (await axios.get(url)).data as User;
};
