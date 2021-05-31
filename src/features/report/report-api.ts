import apiClient from '../../shared/utils/apiClient';

const getReport = () => {
  return apiClient.get('/api/reports');
};

export const ReportApi = {
  getReport,
};
