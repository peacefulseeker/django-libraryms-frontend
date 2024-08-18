import responseCaseMiddleware from './responseCaseMiddleware';
import responseCodes from './response_codes';

export type ErrorResponse = {
  response?: {
    data: {
      code?: string;
      detail?: string;
    };
  };
};

const onResponseRejected = (
  error: ErrorResponse,
  enableCaseMiddleware: boolean,
): Promise<ErrorResponse> => {
  if (error.response) {
    if (error.response.data && enableCaseMiddleware) {
      error.response.data = responseCaseMiddleware(error.response.data);
    }

    if (error.response.data.code !== responseCodes.ACCESS_TOKEN_NOT_VALID) {
      window.$toast.add({
        severity: 'error',
        summary: 'Oops',
        detail: error.response.data.detail || 'Something went wrong',
        life: 3000,
      });
    }
  }

  return Promise.reject(error);
};

export default onResponseRejected;
