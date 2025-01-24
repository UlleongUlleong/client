import {
  useInfiniteQuery,
  useQueries,
  UseQueryResult,
} from '@tanstack/react-query';

import {
  fetchChatRoomsCursor,
  FetchCursorParams,
  FetchCursorResponse,
} from '../api/chatRoom';

import {
  moodTypeCategories,
  alcoholTypeCategories,
  ICategory,
} from '../models/categories';

export const useChatRoomsByMainPage = (
  userCategory: ICategory[],
  limit: number,
  sort: string,
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
    queryKey: ['chatrooms', sort, moodCategory, alcoholCategory],
    queryFn: ({ pageParam = 0 }) =>
      fetchChatRoomsCursor({
        sort,
        moodCategory,
        alcoholCategory,
        cursor: pageParam,
        limit,
      }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.pagination.hasNext ? lastPage.pagination.nextCursor : undefined,
    initialPageParam: 0,
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
