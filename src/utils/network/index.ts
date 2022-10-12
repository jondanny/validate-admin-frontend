import axios, { AxiosRequestHeaders } from 'axios';
import { appConfig } from '../../config/app-config';
import { setUpInterceptor } from './axios-interceptor'

class Network {
  axios = setUpInterceptor(axios)
  baseUrl = appConfig.apiUrl;

  public async get({path, headers, options}: {path: string, headers?: AxiosRequestHeaders, options?: any}) {
    const response = await axios.get(this.baseUrl + path, {
      headers,
      ...options,
    });

    return response;
  }

  public async post(path: string, data: any, headers?: AxiosRequestHeaders, options?: any) {
    const response = await axios.post(this.baseUrl + path, data, {
      headers,
      ...options,
    });

    return response;
  }

  public async delete(path: string, data?: any, headers?: AxiosRequestHeaders, options?: any) {
    const response = await axios.delete(this.baseUrl + path, {
      headers,
      ...options,
    });

    return response;
  }
}

export default new Network();
