import { AxiosError } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

export function errorHandler(err: AxiosError, navigate: NavigateFunction) {
  console.log(err);
  const { response }: any = err || {};
  const { data, status, statusText } = response || {};
  const { message } = data || {};

  let errorMessage;
  switch (status) {
    case 400:
      errorMessage = `${message[0]}`;
      break;

    case 401:
      errorMessage = `Session expired. Please login again.`;
      break;

    default:
      errorMessage = statusText;
      break;
  }

  toast.error(errorMessage, {
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
