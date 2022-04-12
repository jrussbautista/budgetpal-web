import apiClient from 'lib/apiClient';
import { Budget } from 'types/Budget';

export const getBudgets = () => {
  return apiClient.get('/api/budgets');
};

export const getBudget = async (id: string): Promise<{ data: Budget }> => {
  const url = `/api/budgets/${id}`;
  const res = await apiClient.get(url);
  return res.data;
};

export const addBudget = (fields: { category_id: string; amount: number }) => {
  return apiClient.post('/api/budgets', fields);
};

export const deleteBudget = (id: string) => {
  return apiClient.delete(`/api/budgets/${id}`);
};

export const updateBudget = (id: string, fields: { category_id: string; amount: number }) => {
  return apiClient.put(`/api/budgets/${id}`, fields);
};
