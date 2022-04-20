import apiClient from 'lib/apiClient';
import { Result } from 'types';
import { Category, ManageCategoryFields } from 'types/Category';

export const getCategories = async (): Promise<Result<Category>> => {
  const { data } = await apiClient.get('/api/categories');
  return data;
};

export const getCategory = async (id: string): Promise<Category> => {
  const url = `/api/categories/${id}`;
  const { data } = await apiClient.get(url);
  return data.data;
};

export const addCategory = async (fields: ManageCategoryFields): Promise<Category> => {
  const { data } = await apiClient.post('/api/categories', fields);
  return data.data;
};

export const deleteCategory = async (id: string): Promise<string> => {
  await apiClient.delete(`/api/categories/${id}`);
  return id;
};

export const updateCategory = async (
  id: string,
  fields: ManageCategoryFields
): Promise<Category> => {
  const { data } = await apiClient.put(`/api/categories/${id}`, fields);
  return data.data;
};
