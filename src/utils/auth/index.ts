import Cookies from 'js-cookie'

export const setAccessToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
};

export const deleteAccessToken = () => {
  localStorage.removeItem('accessToken');
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
};

export const setRefreshTokenCookie = (refreshToken: string) => {
  Cookies.set('refreshToken', refreshToken)
}

export const deleteRefreshToken = () => {
  localStorage.removeItem('refreshToken');
};

export const getRefreshToken = () => {
  console.log(Cookies.get('refreshToken'))
  return Cookies.get('refreshToken');
};

export const setFingerprint = (fingerprint: string) => {
  return localStorage.setItem('fingerprint', fingerprint);
};

export const getFingerprint = () => {
  return localStorage.getItem('fingerprint');
};
