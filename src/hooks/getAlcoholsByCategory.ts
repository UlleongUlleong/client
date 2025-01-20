import { useQueries, useInfiniteQuery } from '@tanstack/react-query';
import { fetchAlcohols, fetchAlcoholsByCategory } from '../api/alcohol';

export const useAlcoholsByCategory = () => {
  const categories = [
    '소주',
    '맥주',
    '와인',
    '칵테일',
    '하이볼',
    '전통주',
    '위스키',
  ];

  const results = useQueries({
    queries: categories.map((category) => ({
      queryKey: ['alcohols', category],
      queryFn: () => fetchAlcoholsByCategory(category),
    })),
  });

  const categoriesData = categories.map((category, index) => ({
    categoryName: category,
    alcoholsData: results[index].data || [],
    isLoading: results[index].isLoading,
    isError: results[index].isError,
  }));
  return {
    categoriesData,
    isLoading: results.some((result) => result.isLoading),
    isError: results.some((result) => result.isError),
  };
};

export const useAlcoholsQuery = (category: string, sort?: string) => {
  return useInfiniteQuery({
    queryKey: [category],
    queryFn: ({ pageParam }) =>
      fetchAlcohols({
        category,
        sort,
        cursor: pageParam,
        limit: 4,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.cursor !== null ? lastPage.cursor : undefined,
    initialPageParam: 0,
  });
};
