import { apiClient } from '../apiClient';

interface LoginContentProps {
  email: string;
  password: string;
  isRemembered: boolean;
}

export const loginApi = async (loginContent: LoginContentProps) => {
  try {
    const response = await apiClient.post('/api/auth/login', loginContent);
    return response.data;
  } catch (error: any) {
    console.log('error in login', error.response?.data || error.message);
    throw error;
  }
};

export const logoutApi = async () => {
  try {
    const response = await apiClient.get('/api/auth/logout');
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

interface OauthLoginContentProps {
  provider: string;
}

export const oauthLogin = async (oauthLoginContent: OauthLoginContentProps) => {
  const { provider } = oauthLoginContent;
  if (!provider) {
    throw new Error('OAuth provider is required');
  }

  window.location.href = `https://api.sulleong.coderoom.site/api/auth/${provider}`;
};

interface findPasswordProps {
  email: string;
}

export const findPassword = async (email: findPasswordProps) => {
  try {
    const response = await apiClient.post('/api/auth/email-password', email);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log('error in login', error.response?.data || error.message);
    throw error;
  }
};
