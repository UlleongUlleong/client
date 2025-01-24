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
) => {
  const moodCategory = userCategory
    .filter((category) => category.type === 'mood')
    .map((category) => category.id)
    .join(',');

  const alcoholCategory = userCategory
    .filter((category) => category.type === 'alcohol')
    .map((category) => category.id)
    .join(',');

  const sort = 'createdAt';
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
