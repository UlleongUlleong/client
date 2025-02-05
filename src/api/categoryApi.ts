import { apiClient } from './apiClient';

export interface Category {
  id: number;
  name: string;
}

interface CategoryApiResponse {
  status: string;
  data: Category[];
  message: string;
}

export const alcoholCategory = async (): Promise<Category[]> => {
  try {
    const response = await apiClient.get<CategoryApiResponse>(
      '/api/categories/alcohol',
    );
    return response.data.data;
  } catch (error) {
    console.error('alcoholCategory error :', error);
    throw error;
  }
};

export const moodsCategory = async (): Promise<Category[]> => {
  try {
    const response = await apiClient.get<CategoryApiResponse>(
      '/api/categories/moods',
    );
    return response.data.data;
  } catch (error) {
    console.error('moodsCategory error :', error);
    throw error;
  }
};
