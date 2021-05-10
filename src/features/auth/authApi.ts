import apiClient from '../../shared/utils/apiClient';

const getCSRFCookie = () => {
  return apiClient.get('/sanctum/csrf-cookie');
};

const login = (email: string, password: string) => {
  return apiClient.post('/api/login', { email, password });
};

export const AuthApi = {
  login,
  getCSRFCookie,
};
