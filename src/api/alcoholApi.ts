import { apiClient } from './apiClient';

export const getAlcoholDetail = async (id: string) => {
  try {
    const response = apiClient.get(`/api/alcohol/${id}`);
    console.log(response);
    return response;
  } catch (error) {
    console.log('getAlcoholDetail : ', error);
  }
};

export const getAlcoholReview = async (id: string) => {
  try {
    const response = apiClient.get(`/api/alcohol/${id}/reviews`);
    console.log(response);
    return response;
  } catch (error) {
    console.log('getAlcoholReview : ', error);
  }
};

export const handleBookmark = async (id: string) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczNzQzODEwNCwiZXhwIjoxNzM4MDQyOTA0fQ.MZzYULu7nG57K6qa9KGuTPikzKHXpaqD3eAMzypbLPQ';
  try {
    const response = apiClient.put(
      `/api/alcohol/${id}/mark`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log('handleBookmark :', error);
  }
};

export const getValidBookmark = async (id: string) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczNzQzODEwNCwiZXhwIjoxNzM4MDQyOTA0fQ.MZzYULu7nG57K6qa9KGuTPikzKHXpaqD3eAMzypbLPQ';
  try {
    const response = apiClient.get(`/api/alcohol/${id}/mark`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log('getValidBookmark :', error);
    throw error;
  }
};
