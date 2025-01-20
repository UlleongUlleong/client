import { apiClient } from '../apiClient';
import qs from 'qs';

export const fetchData = async () => {};

interface RegisterContentProps {
  email: string;
  password: string;
  reEnterPassword: string;
  nickName: string;
  mood: number[] | null;
  mainAlcohol: number[] | null;
}

export const register = async (registerContent: RegisterContentProps) => {
  try {
    const response = await apiClient.post('/api/users/register', {
      registerContent,
    });
    return response.data;
  } catch (error: any) {
    console.log('error in registration', error.response?.data || error.message);
    throw error;
  }
};

export const checkEmailAvailability = async (email: string) => {
  try {
    const response = await apiClient.get(
      `api/users/email/availability?email=${encodeURIComponent(email)}`,
    );
    return response.data;
  } catch (error: any) {
    console.log(
      'error in registration/email',
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const checkNicknameAvailability = async (nickName: string) => {
  try {
    const response = await apiClient.get(
      `/api/users/nickname/availability?nickname=${encodeURIComponent(nickName)}`,
    );
    return response.data;
  } catch (error: any) {
    console.log(
      'error in registration/nickName',
      error.response?.data || error.message,
    );
    throw error;
  }
};
