import { getFingerprintHandler } from './fingerprint-service';
import network from '../../utils/network';
import { getFingerprint } from '../../utils/auth';

export interface LoginDataInterface {
  email: string;
  password: string;
}

export const loginServiceHandler = async (data: LoginDataInterface) => {
  const fingerprint = getFingerprint() || (await getFingerprintHandler());

  const response = await network.post(`/auth/login`, { ...data, fingerprint });

  return response;
};
