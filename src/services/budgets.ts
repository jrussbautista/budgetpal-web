import apiClient from 'lib/apiClient';
import { Result } from 'types';
import { Budget, ManageBudgetFields } from 'types/Budget';

export const getBudgets = async (): Promise<Result<Budget>> => {
  const { data } = await apiClient.get('/api/budgets');
  return data;
};

export const getBudget = async (id: string): Promise<Budget> => {
  const url = `/api/budgets/${id}`;
  const { data } = await apiClient.get(url);
  return data.data;
};

export const addBudget = async (fields: ManageBudgetFields): Promise<Budget> => {
  const { data } = await apiClient.post('/api/budgets', fields);
  return data.data;
};

export const deleteBudget = async (id: string): Promise<string> => {
  await apiClient.delete(`/api/budgets/${id}`);
  return id;
};

export const updateBudget = async (id: string, fields: ManageBudgetFields): Promise<Budget> => {
  const { data } = await apiClient.put(`/api/budgets/${id}`, fields);
  return data.data;
};
