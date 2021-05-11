import axios from 'axios';

const accessToken = localStorage.getItem('accessToken') || null;

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
});

export default apiClient;
