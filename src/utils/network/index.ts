import axios, { AxiosRequestHeaders } from 'axios';
import { appConfig } from '../../config/app-config';

class Network {
  baseUrl = appConfig.apiUrl;

  public async get(path: string, headers?: AxiosRequestHeaders, options?: any) {
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
}

export default new Network();
