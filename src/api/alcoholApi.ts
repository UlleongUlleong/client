import { apiClient } from './categoryApi';

export const getAlcoholDetail = async (id: string) => {
  try {
    const response = apiClient.get(`/api/alcohol/${id}`);
    console.log(response);
    return response;
  } catch (error) {
    console.log('getAlcoholDetail : ', error);
  }
};
