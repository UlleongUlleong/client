import { ICategory } from '../models/categories';
import { apiClient } from './apiClient';

interface responseCategory {
  status: string;
  message: string;
  data: ICategory[];
}

export const getMoodCategory = async (): Promise<ICategory[]> => {
  try {
    const response = await apiClient.get<responseCategory>(
      '/api/categories/moods',
    );
    return response.data.data;
  } catch (error) {
    console.log('moodsCategory error :', error);
    throw error;
  }
};

export const getAlcoholCategory = async (): Promise<ICategory[]> => {
  try {
    const response = await apiClient.get<responseCategory>(
      '/api/categories/alcohol',
    );
    return response.data.data;
  } catch (error) {
    console.log('alcoholCategory error :', error);
    throw error;
  }
};
