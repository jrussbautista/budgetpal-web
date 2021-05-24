import apiClient from '../../shared/utils/apiClient';

const getTransactions = (filter: Record<string, string>) => {
  const params = new URLSearchParams(filter).toString();
  const url = `/api/transactions?${params}`;
  return apiClient.get(url);
};

const deleteTransaction = (id: string) => {
  return apiClient.delete(`/api/transactions/${id}`);
};

const updateTransaction = (
  id: string,
  fields: {
    category_id: string;
    title: string;
    amount: number;
    type: string;
  }
) => {
  return apiClient.put(`/api/transactions/${id}`, fields);
};

const addTransaction = (fields: {
  category_id: string;
  title: string;
  amount: number;
  type: string;
}) => {
  return apiClient.post('/api/transactions', fields);
};

export const TransactionApi = {
  getTransactions,
  updateTransaction,
  addTransaction,
  deleteTransaction,
};
