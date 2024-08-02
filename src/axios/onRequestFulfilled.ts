import useAuth from '@/stores/auth';
import type { InternalAxiosRequestConfig } from 'axios';

const onRequestFulfilled = (request: InternalAxiosRequestConfig) => {
  const auth = useAuth();

  if (auth.token) {
    request.headers['Authorization'] = `Bearer ${auth.token}`;
  }

  return request;
};

export default onRequestFulfilled;
