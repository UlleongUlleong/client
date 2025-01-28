import {
  useInfiniteQuery,
  useQueries,
  UseQueryResult,
} from '@tanstack/react-query';
import {
  fetchAlcohols,
  fetchEachAlcoholsByCategory,
  FetchEachAlcoholsResponse,
} from '../api/alcohol';
import { useCategoryStore } from '../store/useCategoryStore';

export const useAlcoholsByCategory = () => {
  const alcoholCategories = useCategoryStore(
    (state) => state.alcoholCategories,
  );
  const queries = useQueries({
    queries: [
      ...alcoholCategories.map((category) => ({
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
    const categoryId = alcoholCategories[index]?.id;
    if (categoryId !== undefined && result.data) {
      acc[categoryId] = result.data;
    }
    return acc;
  }, {});

  return {
    categoriesData,
    isLoading,
    isError,
  };
};

export const useAlcoholsQuery = (
  categoryId: number = 0,
  limit: number,
  sort?: string,
  keyword?: string,
) => {
  return useInfiniteQuery({
    queryKey: ['alcohols', categoryId, sort, keyword],
    queryFn: ({ pageParam }) =>
      fetchAlcohols({
        categoryId,
        sort,
        cursor: pageParam,
        limit,
        keyword,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNext ? lastPage.pagination.nextCursor : undefined,
    initialPageParam: 0,
  });
};
