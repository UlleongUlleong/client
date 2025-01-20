import axios from 'axios';
import { IAlcohol } from '../models/alcohol';
const BASE_URL = 'http://localhost:3000/api';

export interface FetchAlcoholsParams {
  category?: string;
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
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const fetchAlcohols = async ({
  category,
  keyword,
  sort,
  cursor,
  limit = 4,
}: FetchAlcoholsParams): Promise<FetchAlcoholsResponse> => {
  const { data } = await api.get('/alcohol/search', {
    params: {
      category,
      keyword,
      sort,
      cursor,
      limit,
    },
  });
  return data;
};

export const fetchAlcoholsByCategory = async (
  category: string,
): Promise<IAlcohol[]> => {
  const response = await axios.get(`/api/alcohols?category=${category}`);
  return response.data;
};
