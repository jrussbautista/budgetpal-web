import apiClient from '../../../lib/apiClient';

export const getTransactions = (page = 1, filter: Record<string, string>) => {
  const params = new URLSearchParams({
    page: page.toString(),
    ...filter,
  }).toString();
  const url = `/api/transactions?${params}`;
  return apiClient.get(url);
};

export const deleteTransaction = (id: string) => {
  return apiClient.delete(`/api/transactions/${id}`);
};

export const updateTransaction = (
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

export const addTransaction = (fields: {
  category_id: string;
  title: string;
  amount: number;
  type: string;
}) => {
  return apiClient.post('/api/transactions', fields);
};
