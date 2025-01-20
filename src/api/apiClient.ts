import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://ulleong-idbiv.run.goorm.site',
  // timeout: ??
  headers: {
    'Content-Type': 'application/json',
  },
});
