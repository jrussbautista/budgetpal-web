import apiClient from 'lib/apiClient';
import { ManageTransactionFields, Transaction } from 'types/Transaction';

export const getTransactions = (page = 1, filter: Record<string, string>) => {
  const params = new URLSearchParams({
    page: page.toString(),
    ...filter,
  }).toString();
  const url = `/api/transactions?${params}`;
  return apiClient.get(url);
};

export const getTransaction = async (id: string): Promise<Transaction> => {
  const url = `/api/transactions/${id}`;
  const res = await apiClient.get(url);
  return res.data.data;
};

export const deleteTransaction = async (id: string): Promise<string> => {
  await apiClient.delete(`/api/transactions/${id}`);
  return id;
};

export const updateTransaction = async (
  id: string,
  fields: ManageTransactionFields
): Promise<Transaction> => {
  const { data } = await apiClient.put(`/api/transactions/${id}`, fields);
  return data.data;
};

export const addTransaction = async (fields: ManageTransactionFields): Promise<Transaction> => {
  const { data } = await apiClient.post('/api/transactions', fields);
  return data.data;
};
