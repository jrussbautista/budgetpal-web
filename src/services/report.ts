import apiClient from 'lib/apiClient';

export const getReport = (filter: Record<string, string>) => {
  const params = new URLSearchParams(filter).toString();
  return apiClient.get(`/api/reports?${params}`);
};
