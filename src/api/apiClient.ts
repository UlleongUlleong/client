import axios from 'axios';

export const apiClientForJson = axios.create({
  baseURL: 'https://ulleong-idbiv.run.goorm.site',
  // timeout: ??
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiClientForForm = axios.create({
  baseURL: 'https://ulleong-idbiv.run.goorm.site',
  // timeout: ??
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
