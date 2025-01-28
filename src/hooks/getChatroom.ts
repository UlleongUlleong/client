import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchChatRoomsCursor, fetchChatRoomsOffset } from '../api/chatRoom';

import { ICategory } from '../models/categories';

export const useChatRoomsWithCursor = (
  userMoodCategory: ICategory[],
  userAlcoholCategory: ICategory[],
  limit: number,
  sort: string,
  searchText?: string,
) => {
  const moodCategory = userMoodCategory
    .map((category) => category.id)
    .join(',');

  const alcoholCategory = userAlcoholCategory
    .map((category) => category.id)
    .join(',');

  return useInfiniteQuery({
    queryKey: ['chatrooms', sort, moodCategory, alcoholCategory, searchText],

    queryFn: ({ pageParam }) =>
      fetchChatRoomsCursor({
        sort,
        ...(moodCategory && { moodCategory }),
        ...(alcoholCategory && { alcoholCategory }),
        cursor: pageParam || undefined,
        limit,
        searchText,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNext ? lastPage.pagination.nextCursor : undefined,
    initialPageParam: undefined,
  });
};

export const useChatRoomWithOffset = (page: number, pageSize: number) => {
  return useInfiniteQuery({
    queryKey: ['chatrooms', page, pageSize],
    queryFn: ({ pageParam }) =>
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
    initialPageParam: 1,
  });
};

export const useFetchRecentChatRooms = (limit: number) => {
  return useInfiniteQuery({
    queryKey: ['chatrooms', 'createdAt'],
    queryFn: ({ pageParam }) =>
      fetchChatRoomsCursor({
        sort: 'createdAt',
        cursor: pageParam || undefined,
        limit,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNext ? lastPage.pagination.nextCursor : undefined,
    initialPageParam: undefined,
  });
};
