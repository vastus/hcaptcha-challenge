const isAuthenticated = () => {
  const expiresAt = parseInt(localStorage.getItem('auth:expires_at'), 10);
  return Date.now() < expiresAt;
};

const setSession = ({accessToken, expiresIn, idToken}) => {
  localStorage.setItem('auth:access_token', accessToken);
  localStorage.setItem('auth:id_token', idToken);
  localStorage.setItem('auth:expires_at', expiresIn * 1000 + Date.now());
}

const clearSession = () => {
  ['auth:access_token', 'auth:id_token', 'auth:expires_at']
    .forEach((item) => localStorage.removeItem(item));
}

const getToken = () =>
  localStorage.getItem('auth:id_token');

export {
  clearSession,
  getToken,
  isAuthenticated,
  setSession,
};
