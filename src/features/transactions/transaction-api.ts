import apiClient from '../../shared/lib/apiClient';

const getTransactions = (page = 1, filter: Record<string, string>) => {
  const params = new URLSearchParams({
    page: page.toString(),
    ...filter,
  }).toString();
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
