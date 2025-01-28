import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.sulleong.coderoom.site',
  // timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
