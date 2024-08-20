import { AxiosError, type AxiosResponse } from 'axios';

interface ErrorResponse extends AxiosResponse {
  data: {
    code?: string;
    detail?: string;
    password?: string;
    username?: string;
    email?: string;
  };
}

export class APIError extends AxiosError {
  response?: ErrorResponse;
}
