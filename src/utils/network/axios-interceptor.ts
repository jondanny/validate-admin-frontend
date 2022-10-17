import { AxiosInstance } from 'axios';
import { appConfig } from '../../config/app-config';
import { getAccessToken } from '../auth/index';

const onRequest = (config: any) => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;
  config.withCredentials = true;
  config.baseURL = appConfig.apiUrl;

  return config;
};

export function setUpInterceptor(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest);

  return axiosInstance;
}
