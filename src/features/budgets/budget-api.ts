import apiClient from '../../shared/utils/apiClient';

const getBudgets = () => {
  return apiClient.get('/api/budgets');
};

const addBudget = (fields: { category_id: string; amount: number }) => {
  return apiClient.post('/api/budgets', fields);
};

const deleteBudget = (id: string) => {
  return apiClient.delete(`/api/budgets/${id}`);
};

const updateBudget = (id: string, fields: { category_id: string; amount: number }) => {
  return apiClient.put(`/api/budgets/${id}`, fields);
};

export const BudgetApi = {
  getBudgets,
  addBudget,
  deleteBudget,
  updateBudget,
};
