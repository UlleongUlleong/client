import {
  useInfiniteQuery,
  useQueries,
  UseQueryResult,
} from '@tanstack/react-query';
import {
  fetchAlcohols,
  fetchAlcoholsTop10,
  fetchEachAlcoholsByCategory,
  FetchEachAlcoholsResponse,
} from '../api/alcohol';
import { categoryForFetch } from '../models/categories';

export const useAlcoholsByCategory = () => {
  const queries = useQueries({
    queries: [
      ...categoryForFetch.map((category) => ({
        queryKey: ['alcohols', category.id],
        queryFn: () => fetchEachAlcoholsByCategory(category.id, 10),
        staleTime: 5 * 60 * 1000,
      })),
    ],
  }) as UseQueryResult<FetchEachAlcoholsResponse, Error>[];

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);

  const categoriesData = queries.reduce<
    Record<number, FetchEachAlcoholsResponse>
  >((acc, result, index) => {
    const data = result.data;
    acc[index] = data;

    return acc;
  }, {});

  return {
    categoriesData,
    isLoading,
    isError,
  };
};

export const useAlcoholsQuery = (
  categoryId: number,
  limit: number,
  sort?: string,
  keyword?: string,
) => {
  return useInfiniteQuery({
    queryKey: [categoryId, sort, keyword],
    queryFn: ({ pageParam = 0 }) =>
      fetchAlcohols({
        categoryId,
        sort,
        cursor: pageParam,
        limit,
        keyword,
      }),
    getNextPageParam: (lastPage, page) =>
      lastPage.pagination.hasNext ? lastPage.pagination.nextCursor : undefined,
    initialPageParam: 0,
  });
};
