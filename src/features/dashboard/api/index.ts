import apiClient from '@/lib/apiClient';

export const getDashboard = () => {
  return apiClient.get('/api/dashboard');
};
