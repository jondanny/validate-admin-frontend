import network from '../../utils/network';

export interface LoginDataInterface {
  email: string;
  password: string;
}

export const loginServiceHandler = async (data: LoginDataInterface) => {
  const response = await network.post(`/auth/login`, data);
  return response;
};
