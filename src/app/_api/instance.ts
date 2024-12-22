import axios, { AxiosInstance } from 'axios';
import { getGlobalToken } from './globaltoken';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getGlobalToken();

    if (token && config.headers?.requiresToken) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('요청 헤더 확인:', config.headers);
    delete config.headers?.requiresToken;
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error(error.response || error.message);
    return Promise.reject(error.response || error.message);
  },
);

export default instance;
