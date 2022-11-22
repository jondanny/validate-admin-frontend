import { AxiosError } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAccessTokenHandler } from '../../services/auth/access-token-service';

export async function errorHandler(err: AxiosError, navigate?: NavigateFunction) {
  const { response }: any = err || {};
  const { data, status } = response || {};
  const { message } = data || {};

  let errorMessage;
  switch (status) {
    case 400:
      errorMessage = `${message[0]}`;
      break;

    case 401:
      errorMessage = `Session expired. Trying to extend session...`;
      break;

    default:
      errorMessage = message;
      break;
  }

  if (status === 401) {
    await getAccessTokenHandler(navigate);
  } else {
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
  }
}
