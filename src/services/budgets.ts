import apiClient from 'lib/apiClient';
import { Budget, ManageBudgetFields } from 'types/Budget';

export const getBudgets = () => {
  return apiClient.get('/api/budgets');
};

export const getBudget = async (id: string): Promise<Budget> => {
  const url = `/api/budgets/${id}`;
  const res = await apiClient.get(url);
  return res.data.data;
};

export const addBudget = async (fields: ManageBudgetFields): Promise<Budget> => {
  const res = await apiClient.post('/api/budgets', fields);
  return res.data.data;
};

export const deleteBudget = async (id: string): Promise<string> => {
  await apiClient.delete(`/api/budgets/${id}`);
  return id;
};

export const updateBudget = async (id: string, fields: ManageBudgetFields): Promise<Budget> => {
  const res = await apiClient.put(`/api/budgets/${id}`, fields);
  return res.data.data;
};
