import { api } from './index';
import { chatRoomSort } from '../models/sort';
import { IChatRoom } from '../models/chatRoom';
export interface FetchCursorParams {
  sort?: string;
  alcoholCategory?: string;
  moodCategory?: string;
  cursor?: number;
  limit?: number;
  keyword?: string;
}
interface paginationCursor {
  hasNext: boolean;
  nextCursor: number;
}
export interface FetchCursorResponse {
  data: IChatRoom[];
  pagination: paginationCursor;
}

interface paginationOffset {
  total: number;
  pageSize: number;
  page: number;
  totalPages: number;
}

export interface FetchOffsetParams {
  sort?: string;
  alcoholCategory?: string;
  moodCategory?: string;
  page?: number;
  pageSize?: number;
}

export interface FetchOffsetResponse {
  data: IChatRoom[];
  pagination: paginationOffset;
}

export const fetchChatRoomsCursor = async ({
  sort,
  moodCategory,
  alcoholCategory,
  cursor,
  limit,
}: FetchCursorParams): Promise<FetchCursorResponse> => {
  const sortId = chatRoomSort.indexOf(sort);

  try {
    const response = await api.get('/chat/rooms/cursor', {
      params: {
        sort: sortId,
        moodCategory,
        alcoholCategory,
        cursor,
        limit,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('채팅방을 불러오는데 실패했습니다.');
  }
};

export const fetchChatRoomsOffset = async ({
  sort,
  moodCategory,
  alcoholCategory,
  page,
  pageSize,
}: FetchOffsetParams): Promise<FetchOffsetResponse> => {
  const sortId = chatRoomSort.indexOf(sort);
  try {
    const response = await api.get('/chat/rooms/offset', {
      params: {
        sort: sortId,
        moodCategory,
        alcoholCategory,
        page,
        pageSize,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
