import axios from 'axios';
import { IAlcohol } from '../models/alcohol';
import { categoryForFetch } from '../models/categories';
import { sortData } from '../models/sort';
const BASE_URL = 'http://localhost:3000/api';

export interface FetchAlcoholsParams {
  categoryId?: number;
  keyword?: string;
  sort?: string;
  cursor?: number;
  limit?: number;
}

export interface FetchAlcoholsResponse {
  data: IAlcohol[];
  count: number;
  cursor: number | null;
  total: number;
}

export interface FetchEachAlcoholsResponse {
  id: number;
  name: string;
  alcohols: IAlcohol[];
}
export const api = axios.create({
  baseURL: 'https://ulleong-idbiv.run.goorm.site/api',
});

export const fetchAlcohols = async ({
  categoryId,
  keyword,
  sort,
  cursor,
  limit,
}: FetchAlcoholsParams): Promise<FetchAlcoholsResponse> => {
  const sortId = sortData.indexOf(sort);
  console.log(sortId, 'sortId');
  try {
    const response = await api.get('/alcohol/search', {
      params: {
        category: categoryId,
        keyword,
        sort: sortId,
        cursor,
        limit,
      },
    });
    console.log(response, 'rseponse');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAlcoholsTop10 = async (
  limit: number,
): Promise<FetchEachAlcoholsResponse> => {
  try {
    const response = await api.get('/alcohol/search', {
      params: { limit, sort: 'star' },
    });

    return {
      alcohols: response.data,
      name: '평점 TOP 10',
      id: 0,
    };
  } catch (error) {
    console.error(error);
    throw new Error('alcohot Top10오류');
    // React Query will handle the error
  }
};

export const fetchEachAlcoholsByCategory = async (
  category: number,
  limit: number,
): Promise<FetchEachAlcoholsResponse> => {
  try {
    const response = await api.get('/alcohol/search', {
      params: { category, limit },
    });

    return {
      alcohols: response.data,
      name: categoryForFetch.find((c) => c.id === category)?.name || '',
      id: category,
    };
  } catch (error) {
    console.error(error);
    throw new Error('술 카테고리 api 오류'); // // React Query will handle the error
  }
};
