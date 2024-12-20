import axios, { AxiosInstance } from 'axios';
import { useAuth } from '../_hooks/useAuth';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const { token } = useAuth();

    if (token && config.headers?.requiresToken) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    delete config.headers?.requiresToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error.response || error.message);
  },
);

export default instance;
