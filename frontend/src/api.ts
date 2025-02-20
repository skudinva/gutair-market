import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

import { Token } from './utils';

const BACKEND_URL = 'http://localhost:3000';
const REQUEST_TIMEOUT = 5000;

const getNormalError = (error: string | string[] | null | undefined) => {
  if (!error) {
    return null;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (Array.isArray(error)) {
    return error.join('\n');
  }

  return null;
};

interface ErrorResponse {
  error?: string;
  detailMessage?: string;
}

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = Token.get();

    if (token) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorResponse>) => {
      toast.dismiss();
      const errorText = error.response
        ? error.response.data.error ||
          getNormalError(error.response?.data.detailMessage)
        : error.message;

      toast.warn(errorText);

      return Promise.reject(error);
    }
  );

  return api;
};
