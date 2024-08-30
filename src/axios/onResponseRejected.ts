import { ToastSeverity } from 'primevue/api';
import { type ToastMessageOptions } from 'primevue/toast';

import responseCaseMiddleware from '@/axios/responseCaseMiddleware';
import { ACCESS_TOKEN_NOT_VALID, USER_INACTIVE } from '@/axios/responseCodes';
import useAuth from '@/stores/auth';
import { APIError } from '@/types/axios';

const onResponseRejected = (error: APIError, enableCaseMiddleware: boolean): Promise<APIError> => {
  if (error.response) {
    if (error.response.data && enableCaseMiddleware) {
      error.response.data = responseCaseMiddleware(error.response.data);
    }

    if (![ACCESS_TOKEN_NOT_VALID, USER_INACTIVE].includes(error.response.data.code || '')) {
      window.$toast.add({
        severity: ToastSeverity.ERROR,
        summary: 'Oops',
        detail: error.response.data.detail || 'Something went wrong',
        life: 3000,
      } as ToastMessageOptions);
    }

    if (error.response.data.code === USER_INACTIVE) {
      const auth = useAuth();
      auth.logout('User account is no longer active', ToastSeverity.WARN);
    }
  }

  return Promise.reject(error);
};

export default onResponseRejected;
