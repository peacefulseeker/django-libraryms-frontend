import { ToastSeverity } from 'primevue/api';
import { type ToastMessageOptions } from 'primevue/toast';

import responseCodes from '@/axios/response_codes';
import responseCaseMiddleware from '@/axios/responseCaseMiddleware';
import { APIError } from '@/types/axios';

const onResponseRejected = (error: APIError, enableCaseMiddleware: boolean): Promise<APIError> => {
  if (error.response) {
    if (error.response.data && enableCaseMiddleware) {
      error.response.data = responseCaseMiddleware(error.response.data);
    }

    if (error.response.data.code !== responseCodes.ACCESS_TOKEN_NOT_VALID) {
      window.$toast.add({
        severity: ToastSeverity.ERROR,
        summary: 'Oops',
        detail: error.response.data.detail || 'Something went wrong',
        life: 3000,
      } as ToastMessageOptions);
    }
  }

  return Promise.reject(error);
};

export default onResponseRejected;
