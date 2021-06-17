import apiClient from '../../shared/utils/apiClient';

const getCategories = () => {
  return apiClient.get('/api/categories');
};

export const CategoryApi = {
  getCategories,
};
