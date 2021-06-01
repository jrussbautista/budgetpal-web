import apiClient from '../../shared/utils/apiClient';

const getReport = (filter: Record<string, string>) => {
  const params = new URLSearchParams(filter).toString();
  return apiClient.get(`/api/reports?${params}`);
};

export const ReportApi = {
  getReport,
};
