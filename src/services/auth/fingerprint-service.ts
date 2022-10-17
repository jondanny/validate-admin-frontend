import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import { toast } from 'react-toastify';
import { appConfig } from '../../config/app-config';
import { setFingerprint } from '../../utils/auth';

export const getFingerprintHandler = async (): Promise<string> => {
  try {
    const fingerprint = await FingerprintJS.load({
      apiKey: appConfig.fingerprintApiKey as string,
    });
    const { visitorId } = await fingerprint.get();
    setFingerprint(visitorId);

    return visitorId;
  } catch (error) {
    toast.error('Failed to fetch fingerprint', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    throw error;
  }
};
