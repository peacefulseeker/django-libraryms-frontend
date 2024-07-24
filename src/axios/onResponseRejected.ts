import type { AxiosError } from 'axios';
import { ToastSeverity } from 'primevue/api';

import useAuth from '@/stores/auth';
import { app } from '@/main';
import responseCaseMiddleware from './responseCaseMiddleware';
import responseCodes from './response_codes';

const onResponseRejected = (error: AxiosError, enableCaseMiddleware: boolean) => {
  const auth = useAuth();

  if (error.response) {
    if (error.response.data && enableCaseMiddleware) {
      error.response.data = responseCaseMiddleware(error.response.data);
    }

    if (error.response.data.code !== responseCodes.ACCESS_TOKEN_NOT_VALID) {
      app.config.globalProperties.$toast.add({
        severity: ToastSeverity.ERROR,
        summary: 'Oops',
        detail: error.response.data.detail,
        life: 3000,
      });
    }
  }

  return Promise.reject(error);
};

export default onResponseRejected;
