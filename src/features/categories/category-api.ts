import apiClient from '../../shared/utils/apiClient';

const getCategories = () => {
  return apiClient.get('/api/categories');
};

const addCategory = (fields: { title: string }) => {
  return apiClient.post('/api/categories', fields);
};

const deleteCategory = (id: string) => {
  return apiClient.delete(`/api/categories/${id}`);
};

const updateCategory = (id: string, fields: { title: string }) => {
  return apiClient.put(`/api/categories/${id}`, fields);
};

export const CategoryApi = {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
};
