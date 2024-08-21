import requestCaseMiddleware from './requestCaseMiddleware';
import type { InternalAxiosRequestConfig } from 'axios';

import useAuth from '@/stores/auth';

const onRequestFulfilled = (
  request: InternalAxiosRequestConfig,
  useRequestCaseMiddleware: boolean = false,
) => {
  const auth = useAuth();

  if (auth.token) {
    request.headers['Authorization'] = `Bearer ${auth.token}`;
  }

  if (useRequestCaseMiddleware) {
    request.data = requestCaseMiddleware(request.data);
  }

  return request;
};

export default onRequestFulfilled;
