import axios, { AxiosRequestHeaders } from 'axios';
import { setUpInterceptor } from './axios-interceptor';
import { errorHandler } from './error-handler'

class Network {
  axios = setUpInterceptor(axios);

  public async get({ path, headers, options }: { path: string; headers?: AxiosRequestHeaders; options?: any }) {
    try {
      const response = await axios.get(path, {
        headers,
        ...options,
      });
  
      return response;
    }catch(err: any){
      const { response } = err;
      const { status } = response
      if(status === 401){
        await errorHandler(err)
      }
    }
  }

  public async post(path: string, data?: any, headers?: AxiosRequestHeaders, options?: any) {
    try {
      const response = await axios.post(path, data, {
        ...options,
      });
  
      return response;
    }catch(err: any) {
      const { response } = err;
      const { status } = response
      if(status === 401){
        await errorHandler(err)
      }
    }
  }

  public async patch(path: string, data: any, headers?: AxiosRequestHeaders, options?: any) {
    try {
      const response = await axios.patch(path, data, {
        headers,
        ...options,
      });
  
      return response;
    }catch(err: any) {
      const { response } = err;
      const { status } = response
      if(status === 401){
        await errorHandler(err)
      }
    }
  }

  public async delete(path: string, data?: any, headers?: AxiosRequestHeaders, options?: any) {
    try {
      const response = await axios.delete(path, {
        headers,
        ...options,
      });
  
      return response;
    }catch(err: any){
      const { response } = err;
      const { status } = response
      if(status === 401){
        await errorHandler(err)
      }
    }
  }
}

export default new Network();
