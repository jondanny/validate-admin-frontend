import { AxiosInstance } from 'axios'
import { getAccessToken } from '../auth/index'

const onRequest = (config: any ) => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`
  return config
}

export function setUpInterceptor (axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest)
  return axiosInstance
}