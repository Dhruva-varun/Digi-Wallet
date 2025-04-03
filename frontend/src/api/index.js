import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
