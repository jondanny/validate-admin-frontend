import network from '../../utils/network';

export const logoutServiceHandler = async () => {
  const response = await network.post(`/auth/logout`);
  return response.data;
};
