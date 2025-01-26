import React from 'react';
import { toast } from 'react-toastify';
import { apiClient } from '../apiClient';

interface LoginContentProps {
  email: string;
  password: string;
}

export const loginApi = async (loginContent: LoginContentProps) => {
  try {
    const response = await apiClient.post('/api/auth/login', loginContent);
    // const accessToken = response.headers['authorization'];

    // if (!accessToken) {
    //   throw new Error('서버 응답에 액세스 토큰이 포함되어 있지 않습니다.');
    // }
    // localStorage.setItem('accessToken', accessToken);
    return response.data;
  } catch (error: any) {
    console.log('error in login', error.response?.data || error.message);
    throw error;
  }
};

export const logoutApi = async () => {
  try {
    const response = await apiClient.get('/api/auth/logout');
    return response.data;
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

  window.location.href = `https://ulleong-idbiv.run.goorm.site/api/auth/${provider}`;
};

export const findPassword = async () => {
  try {
    const response = await apiClient.get(`/api/auth/${encodeURIComponent('')}`);
    return response.data;
  } catch (error: any) {
    console.log('error in login', error.response?.data || error.message);
    throw error;
  }
};

export const testApi = async () => {
  try {
    const res = await apiClient.get('/api/auth/test');
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
