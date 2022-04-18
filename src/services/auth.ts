import apiClient from 'lib/apiClient';
import { User } from 'types';
import {
  RegisterFields,
  UpdateSettingsFields,
  UpdateProfileFields,
  ChangePasswordFields,
  ResetPasswordFields,
} from 'types/Auth';

export const getCSRFCookie = (): Promise<void> => {
  return apiClient.get('/sanctum/csrf-cookie');
};

export const login = async (
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  const { data } = await apiClient.post('/api/login', { email, password });
  return data.data;
};

export const forgotPassword = (email: string): Promise<void> => {
  return apiClient.post('/api/forgot-password', { email });
};

export const resetPassword = (fields: ResetPasswordFields): Promise<void> => {
  return apiClient.post('/api/reset-password', fields);
};

export const resendVerifyEmail = (): Promise<void> => {
  return apiClient.post('/api/email/verification-notification');
};

export const loginWithGoogle = async (
  accessToken: string
): Promise<{ user: User; token: string }> => {
  const { data } = await apiClient.post('/api/login/google', { accessToken });
  return data.data;
};

export const register = async (fields: RegisterFields): Promise<{ user: User; token: string }> => {
  const { data } = await apiClient.post('/api/register', fields);
  return data.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const { data } = await apiClient.get('/api/account/me');
  return data.data;
};

export const changePassword = async (fields: ChangePasswordFields): Promise<User> => {
  const { data } = await apiClient.post('/api/account/change-password', fields);
  return data.data;
};

export const updateProfile = async (fields: UpdateProfileFields): Promise<User> => {
  const { data } = await apiClient.post('/api/account/update-profile', fields);
  return data.data.user;
};

export const updateSettings = async (fields: UpdateSettingsFields): Promise<User> => {
  const { data } = await apiClient.put('/api/settings', fields);
  return data.data;
};
