import {
  useInfiniteQuery,
  useQueries,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

import {
  fetchChatRoomsCursor,
  fetchChatRoomsOffset,
  FetchCursorParams,
  FetchCursorResponse,
} from '../api/chatRoom';

import {
  moodTypeCategories,
  alcoholTypeCategories,
  ICategory,
} from '../models/categories';

export const useChatRoomsWithCursor = (
  userCategory: ICategory[],
  limit: number,
  sort: string,
  searchText?: string,
) => {
  const moodCategory = userCategory
    .filter((category) => category.type === 'mood')
    .map((category) => category.id)
    .join(',');

  const alcoholCategory = userCategory
    .filter((category) => category.type === 'alcohol')
    .map((category) => category.id)
    .join(',');

  return useInfiniteQuery({
    queryKey: ['chatrooms', sort, moodCategory, alcoholCategory, searchText],
    queryFn: ({ pageParam = 0 }) =>
      fetchChatRoomsCursor({
        sort,
        moodCategory,
        alcoholCategory,
        cursor: pageParam,
        limit,
        searchText,
      }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.pagination.hasNext ? lastPage.pagination.nextCursor : undefined,
    initialPageParam: 0,
  });
};

export const useChatRoomWithOffset = (page: number, pageSize: number) => {
  return useInfiniteQuery({
    queryKey: ['chatrooms', page, pageSize],
    queryFn: ({ pageParam = 1 }) =>
      fetchChatRoomsOffset({ page: pageParam, pageSize }),
    getNextPageParam: (lastPage) =>
      Number(lastPage.pagination.page) < Number(lastPage.pagination.totalPages)
        ? Number(lastPage.pagination.page) + 1
        : undefined,
    getPreviousPageParam: (firstPage) => {
      return Number(firstPage.pagination.page) > 1
        ? Number(firstPage.pagination.page) - 1
        : undefined;
    },
    initialPageParam: page,
  });
};

export const useFetchRecentChatRooms = (limit: number) => {
  return useInfiniteQuery({
    queryKey: ['chatrooms', 'createdAt'],
    queryFn: ({ pageParam = 0 }) =>
      fetchChatRoomsCursor({
        sort: 'createdAt',
        cursor: pageParam,
        limit,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNext ? lastPage.pagination.nextCursor : undefined,
    initialPageParam: 0,
  });
};
