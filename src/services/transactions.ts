import apiClient from 'lib/apiClient';
import { Transaction } from 'types/Transaction';

export const getTransactions = (page = 1, filter: Record<string, string>) => {
  const params = new URLSearchParams({
    page: page.toString(),
    ...filter,
  }).toString();
  const url = `/api/transactions?${params}`;
  return apiClient.get(url);
};

export const getTransaction = async (id: string): Promise<{ data: Transaction }> => {
  const url = `/api/transactions/${id}`;
  const res = await apiClient.get(url);
  return res.data;
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
