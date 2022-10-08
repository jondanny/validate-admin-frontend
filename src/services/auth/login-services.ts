import { HttpPostRequests } from '../../utils/network-requests/axios'

export interface LoginDataInterface {
  email: string
  password: string
}

export const loginServiceHandler = async (data: LoginDataInterface) => {
  
  return await HttpPostRequests({
    url: `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/login`,
    data
  })
}