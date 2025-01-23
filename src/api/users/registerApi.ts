import { apiClient } from '../apiClient';

export const fetchData = async () => {};

interface RegisterContentProps {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  moodCategory: number[] | null;
  alcoholCategory: number[] | null;
}

export const register = async (registerContent: RegisterContentProps) => {
  try {
    const response = await apiClient.post('/api/users', registerContent);
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

export const requestEmailCode = async (email: string) => {
  const response = await apiClient.post('/api/auth/email-codes', { email });
  return response.data;
};

export const verifyEmailCode = async (email: string, code: string) => {
  const response = await apiClient.post('/api/auth/email-codes/verification', {
    email,
    code,
  });
  return response.data;
};
