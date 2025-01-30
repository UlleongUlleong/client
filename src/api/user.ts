import { apiClient } from './apiClient';
export const isLogin = async () => {
  try {
    const response = await apiClient.get('api/users/me/profile');
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('isLogin : ', error);
    new Error('유저 파악 시 에러가 발생했습니다.');
  }
};
