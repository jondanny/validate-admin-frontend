import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getRefreshToken, setAccessToken, getFingerprint } from '../../utils/auth';
import network from '../../utils/network';

export const getAccessTokenHandler = async (navigate: NavigateFunction ) => {
  try {
    const response = await network.post(`/auth/refresh-tokens`, { refreshToken: getRefreshToken(), fingerprint: getFingerprint() });
  
    const { accessToken } = response?.data || {};
    if (accessToken) {
      setAccessToken(accessToken);
      toast.success('Session extended, try again.', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }catch(err: any) {
    const { error, message } = err?.response?.data || {};
    if (error) {
      toast.error(message, {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  }
};
