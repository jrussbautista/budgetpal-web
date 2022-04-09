import apiClient from 'lib/apiClient';

export const getCSRFCookie = () => {
  return apiClient.get('/sanctum/csrf-cookie');
};

export const login = (email: string, password: string) => {
  return apiClient.post('/api/login', { email, password });
};

export const forgotPassword = (email: string) => {
  return apiClient.post('/api/forgot-password', { email });
};

export const resetPassword = (fields: {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}) => {
  return apiClient.post('/api/reset-password', fields);
};

export const resendVerifyEmail = () => {
  return apiClient.post('/api/email/verification-notification');
};

export const loginWithGoogle = (accessToken: string) => {
  return apiClient.post('/api/login/google', { accessToken });
};

export const register = (fields: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  return apiClient.post('/api/register', fields);
};

export const getCurrentUser = () => {
  return apiClient.get('/api/account/me');
};

export const changePassword = async (fields: {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}) => {
  const response = await apiClient.post('/api/account/change-password', fields);
  const accessToken = response.data.data.token;
  window.localStorage.setItem('accessToken', accessToken);
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

export const updateProfile = (fields: { name: string; email: string }) => {
  return apiClient.post('/api/account/update-profile', fields);
};

export const updateSettings = (fields: { language: string; currency: string; theme: string }) => {
  return apiClient.put('/api/settings', fields);
};
