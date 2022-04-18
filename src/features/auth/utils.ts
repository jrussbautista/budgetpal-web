import apiClient from 'lib/apiClient';
import { User } from 'types';

export const setUserLocalStorage = (user: User) => {
  window.localStorage.setItem('currentUser', JSON.stringify(user));
};

export const removeUserLocalStorage = () => {
  window.localStorage.removeItem('currentUser');
};

export const removeTokenLocalStorage = () => {
  window.localStorage.removeItem('accessToken');
};

export const setTokenLocalStorage = (token: string) => {
  window.localStorage.setItem('accessToken', token);
};

export const setAuth = (user: User, token: string) => {
  setUserLocalStorage(user);
  setTokenLocalStorage(token);
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuth = () => {
  removeTokenLocalStorage();
  removeUserLocalStorage();
  apiClient.defaults.headers.common['Authorization'] = `Bearer`;
};
