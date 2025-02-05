import axios from 'axios';
import { apiClient } from './apiClient';
export const isLogin = async () => {
  try {
    const response = await apiClient.get('api/users/me/profile');
    return response.status === 200;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return false;
    }
    console.error('isLogin : ', error);
    new Error('유저 파악 시 에러가 발생했습니다.');
  }
};
