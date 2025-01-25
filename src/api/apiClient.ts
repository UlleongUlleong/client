import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://ulleong-idbiv.run.goorm.site',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
