import apiClient from '../../shared/utils/apiClient';

const getCSRFCookie = () => {
  return apiClient.get('/sanctum/csrf-cookie');
};

const login = (email: string, password: string) => {
  return apiClient.post('/api/login', { email, password });
};

const forgotPassword = (email: string) => {
  return apiClient.post('/api/forgot-password', { email });
};

const resetPassword = (fields: {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}) => {
  return apiClient.post('/api/reset-password', fields);
};

const loginWithGoogle = (accessToken: string) => {
  return apiClient.post('/api/login/google', { accessToken });
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
  return apiClient.get('/api/account/me');
};

const changePassword = async (fields: {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}) => {
  const response = await apiClient.post('/api/account/change-password', fields);
  const accessToken = response.data.data.token;
  window.localStorage.setItem('accessToken', accessToken);
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

const updateProfile = (fields: { name: string; email: string }) => {
  return apiClient.post('/api/account/update-profile', fields);
};

const updateSettings = (fields: {
  language: string;
  currency: string;
  theme: string;
}) => {
  return apiClient.put('/api/settings', fields);
};

export const AuthApi = {
  login,
  loginWithGoogle,
  getCSRFCookie,
  register,
  getCurrentUser,
  changePassword,
  updateProfile,
  updateSettings,
  forgotPassword,
  resetPassword,
};
