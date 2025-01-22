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
    const response = await apiClientForForm.post(
      '/api/users/register',
      qs.stringify(registerContent),
    );
    return response.data;
  } catch (error: any) {
    console.log('error in registration', error.response?.data || error.message);
    throw error;
  }
};

export const checkEmailAvailability = async (email: string) => {
  try {
    const response = await apiClientForJson.post(
      'api/users/email/availability',
      { email },
    );
    return response.data;
  } catch (error: any) {
    console.log('error in registration', error.response?.data || error.message);
    throw error;
  }
};
