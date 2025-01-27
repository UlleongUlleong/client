import { AxiosError } from 'axios';
import { apiClient } from './categoryApi';
import { ModifyProfile } from '../models/profile';

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
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczNzQzODEwNCwiZXhwIjoxNzM4MDQyOTA0fQ.MZzYULu7nG57K6qa9KGuTPikzKHXpaqD3eAMzypbLPQ';
  try {
    const response = await apiClient.get('api/users/me/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log('getProfile : ', error);
  }
};

export const modifyProfile = async (data: ModifyProfile) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczNzQzODEwNCwiZXhwIjoxNzM4MDQyOTA0fQ.MZzYULu7nG57K6qa9KGuTPikzKHXpaqD3eAMzypbLPQ';
  try {
    const response = await apiClient.put('api/users/me/profile', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log('modifyProfile : ', error);
  }
};

export const getInterestAlcohol = async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczNzQzODEwNCwiZXhwIjoxNzM4MDQyOTA0fQ.MZzYULu7nG57K6qa9KGuTPikzKHXpaqD3eAMzypbLPQ';
  try {
    const response = await apiClient.get(`api/users/interest`, {
      params: {
        limit: 1000,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('getInterestAlcohol :', error);
  }
};

export const getReviewAlcohol = async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczNzQzODEwNCwiZXhwIjoxNzM4MDQyOTA0fQ.MZzYULu7nG57K6qa9KGuTPikzKHXpaqD3eAMzypbLPQ';
  try {
    const response = await apiClient.get(`api/users/reviews`, {
      params: {
        limit: 1000,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('getReviewAlcohol :', error);
  }
};
