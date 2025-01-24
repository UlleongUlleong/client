import { IAlcohol } from '../models/alcohol';
import { categoryForFetch } from '../models/categories';
import { sortData } from '../models/sort';
import { api } from './index';
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
  const sortId = sortData.indexOf(sort);
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
