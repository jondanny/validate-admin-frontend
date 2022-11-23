import axios, { AxiosRequestHeaders } from 'axios';
import { setUpInterceptor } from './axios-interceptor';

class Network {
  axios = setUpInterceptor(axios);

  public async get({ path, headers, options }: { path: string; headers?: AxiosRequestHeaders; options?: any }) {
      const response = await axios.get(path, {
        headers,
        ...options,
      });
  
      return response;
  }

  public async post(path: string, data?: any, headers?: AxiosRequestHeaders, options?: any) {
      const response = await axios.post(path, data, {
        ...options,
      });
  
      return response;
  }

  public async patch(path: string, data: any, headers?: AxiosRequestHeaders, options?: any) {
      const response = await axios.patch(path, data, {
        headers,
        ...options,
      });
  
      return response;
  }

  public async delete(path: string, data?: any, headers?: AxiosRequestHeaders, options?: any) {
    
      const response = await axios.delete(path, {
        headers,
        ...options,
      });
  
      return response;
  }
}

export default new Network();
