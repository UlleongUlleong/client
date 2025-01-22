import { apiClient } from '../apiClient';

interface LoginContentProps {
  email: string;
  password: string;
}

export const loginApi = async (loginContent: LoginContentProps) => {
  try {
    const response = await apiClient.post('api/auth/login', loginContent);
    return response.data;
  } catch (error: any) {
    console.log('error in login', error.response?.data || error.message);
    throw error;
  }
};

interface oauthLoginContentProps {
  provider: string;
}

export const oauthLogin = async (oauthLoginContent: oauthLoginContentProps) => {
  try {
    const response = await apiClient.get(
      `api/auth/${encodeURIComponent(oauthLoginContent.provider)}`,
    );
    return response.data;
  } catch (error: any) {
    console.log('error in login', error.response?.data || error.message);
    throw error;
  }
};
