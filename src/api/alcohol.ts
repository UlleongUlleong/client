import { IAlcohol } from '../models/alcohol';
import { categoryForFetch } from '../models/categories';
import { apiClient } from './apiClient';

export interface FetchAlcoholsParams {
  categoryId?: number;
  keyword?: string;
  sort?: string;
  cursor?: number;
  limit?: number;
}

export interface pagination {
  hasNext: boolean;
  nextCursor: number;
}
export interface FetchAlcoholsResponse {
  data: IAlcohol[];
  pagination: pagination;
}

export interface FetchEachAlcoholsResponse {
  id: number;
  name: string;
  alcohols: { data: IAlcohol[] };
}

export const fetchAlcohols = async ({
  categoryId,
  keyword,
  sort,
  cursor,
  limit,
}: FetchAlcoholsParams): Promise<FetchAlcoholsResponse> => {
  try {
    const params: FetchAlcoholsParams = {};

    if (categoryId !== undefined) params.categoryId = categoryId;
    if (keyword !== undefined) params.keyword = keyword;
    if (sort !== undefined) params.sort = sort;
    if (cursor !== undefined) params.cursor = cursor;
    if (limit !== undefined) params.limit = limit;

    const response = await apiClient.get('/alcohol', {
      params: {
        category: categoryId,
        keyword,
        sort,
        cursor,
        limit,
      },
    });
    if (response.status !== 200) {
      throw new Error('fetchAlcohols response가 정상적이지 않습니다.');
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(' fetchAlcohols 오류');
  }
};

export const fetchAlcoholsTop10 = async (
  limit: number,
): Promise<FetchEachAlcoholsResponse> => {
  try {
    const response = await apiClient.get('/alcohol', {
      params: { limit, sort: 'star', category: 0 },
    });

    return {
      alcohols: response.data,
      name: '평점 TOP 10',
      id: 0,
    };
  } catch (error) {
    console.error(error);
    throw new Error('alcohol Top10오류');
  }
};

export const fetchEachAlcoholsByCategory = async (
  category: number,
  limit: number,
): Promise<FetchEachAlcoholsResponse> => {
  try {
    const response = await apiClient.get('/alcohol', {
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
