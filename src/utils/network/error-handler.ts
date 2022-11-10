import { AxiosError } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

export function errorHandler(err: AxiosError, navigate: NavigateFunction) {
  const { response }: any = err || {};
  const { data, status } = response || {};
  const { message } = data || {};
  toast.error(status === 401 ? `Session expired. Please login again.` : `${message[0]}`, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
  if (status === 401) {
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  }
}
