import apiClient from '../../shared/utils/apiClient';

const getCSRFCookie = () => {
  return apiClient.get('/sanctum/csrf-cookie');
};

const login = (email: string, password: string) => {
  return apiClient.post('/api/login', { email, password });
};

const register = (fields: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  return apiClient.post('/api/register', fields);
};

const getCurrentUser = () => {
  return apiClient.get('/api/users/me');
};

export const AuthApi = {
  login,
  getCSRFCookie,
  register,
  getCurrentUser,
};
