import network from '../../utils/network';

export interface LoginDataInterface {
  email: string;
  password: string;
}

export const loginServiceHandler = async (data: LoginDataInterface) => {
  return await network.post(`/auth/login`, data);
};
