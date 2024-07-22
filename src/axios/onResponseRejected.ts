import useAuth from '@/stores/auth';
import type { AxiosError } from 'axios';
import responseCaseMiddleware from './responseCaseMiddleware';
import { useToast } from 'primevue/usetoast';
import { app } from '@/main';
import { ToastSeverity } from 'primevue/api';

const onResponseRejected = (error: AxiosError, enableCaseMiddleware: boolean) => {
  const auth = useAuth();

  if (error.response) {
    if (error.response.data && enableCaseMiddleware) {
      error.response.data = responseCaseMiddleware(error.response.data);
    }

    // TODO: move to separate module
    if (error.response.data.code !== 'token_not_valid') {
      app.config.globalProperties.$toast.add({
        severity: ToastSeverity.ERROR,
        summary: 'Failure',
        detail: error.response.data.detail,
        life: 3000,
      });
    }
  }

  return Promise.reject(error);
};

export default onResponseRejected;
