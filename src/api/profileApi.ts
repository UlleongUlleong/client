import { AxiosError } from 'axios';
import { ModifyProfile } from '../models/profile';
import { apiClient } from './apiClient';

export const validNickname = async (nickname: string): Promise<string> => {
  try {
    const response = await apiClient.get(
      `/api/users/nickname/availability?nickname=${nickname}`,
    );
    if (response.data.status === 'success') {
      return response.data.message;
    }
    return response.data.message;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status === 409) {
          return error.response.data.message;
        }
        return error.response.data.message;
      }
    }
    return '유효하지 않은 닉네임입니다. 다시 시도해주세요.';
  }
};

export const getProfile = async () => {
  try {
    const response = await apiClient.get('/api/users/me/profile');
    return response.data.data;
  } catch (error) {
    console.log('getProfile : ', error);
  }
};

export const modifyProfile = async (data: ModifyProfile) => {
  try {
    const response = await apiClient.put('api/users/me/profile', data, {});
    console.log(response.data);
  } catch (error) {
    console.log('modifyProfile : ', error);
  }
};

export const getInterestAlcohol = async () => {
  try {
    const response = await apiClient.get(`api/users/interest`, {
      params: {
        limit: 1000,
      },
    });
    return response.data;
  } catch (error) {
    console.log('getInterestAlcohol :', error);
  }
};

export const getReviewAlcohol = async () => {
  try {
    const response = await apiClient.get(`api/users/reviews`, {
      params: {
        limit: 1000,
      },
    });
    return response.data;
  } catch (error) {
    console.log('getReviewAlcohol :', error);
  }
};

export const AddProfileImage = async (formData: FormData) => {
  try {
    const response = await apiClient.put(
      '/api/users/me/profile/image',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log('AddProfileImage :', error);
  }
};

export const RemoveProfileImage = async () => {
  try {
    const response = await apiClient.delete('/api/users/me/profile/image');
    return response;
  } catch (error) {
    console.log('RemoveProfileImage :', error);
  }
};

export const WithdrawUser = async (password: string) => {
  try {
    const response = await apiClient.delete(`/api/users/me`, {
      data: {
        password: password,
      },
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      console.error('WithdrawUser API 오류:', error.response.data);
      console.error('HTTP 상태 코드:', error.response.status);
    } else {
      console.error('WithdrawUser 요청 실패:', error.message);
    }
    throw error;
  }
};

export const ResetPassword = async (password: string, confirmPassword: string) => {
  try {
    const response = await apiClient.put(`/api/users/password`, {
      password: password,
      confirmPassword: confirmPassword
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
