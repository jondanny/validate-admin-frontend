import network from '../../utils/network';
interface LogoutDataInterface {
  refreshToken: any
}

export const logoutServiceHandler = async (data: LogoutDataInterface) => {
  const response = await network.post(`/auth/logout`, data);
  return response?.data;
};
