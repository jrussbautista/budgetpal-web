import apiClient from '@/shared/lib/apiClient';

const getDashboard = () => {
  return apiClient.get('/api/dashboard');
};

export const DashboardApi = {
  getDashboard,
};
