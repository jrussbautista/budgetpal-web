import apiClient from '../../shared/utils/apiClient';

const getDashboard = () => {
  return apiClient.get('/api/dashboard');
};

export const DashboardApi = {
  getDashboard,
};
