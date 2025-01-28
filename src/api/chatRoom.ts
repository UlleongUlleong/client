import { IChatRoom } from '../models/chatRoom';
import { apiClient } from './apiClient';

export interface FetchCursorParams {
  sort?: string;
  alcoholCategory?: string;
  moodCategory?: string;
  cursor?: number;
  limit?: number;
  keyword?: string;
  searchText?: string;
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
  searchText,
}: FetchCursorParams): Promise<FetchCursorResponse> => {
  try {
    const params: Partial<FetchCursorParams> = {
      ...(sort && { sort }),
      ...(moodCategory && { moodCategory }),
      ...(alcoholCategory && { alcoholCategory }),
      ...(cursor && { cursor }),
      ...(limit && { limit }),
      ...(searchText && { keyword: searchText }),
    };

    const response = await apiClient.get('/api/chat/rooms/cursor', { params });
    if (response.status !== 200) {
      throw new Error('채팅방을 불러오는데 실패했습니다.');
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      '채팅방을 불러올 때 에러가 발생했습니다. 다시 시도해주세요.',
    );
  }
};

export const fetchChatRoomsOffset = async ({
  page,
  pageSize,
}: FetchOffsetParams): Promise<FetchOffsetResponse> => {
  try {
    const response = await apiClient.get('/api/chat/rooms/offset', {
      params: {
        page,
        pageSize,
      },
    });
    if (response.status !== 200) {
      throw new Error('채팅방을 불러오는데 실패했습니다.');
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      '채팅방을 불러올 때 에러가 발생했습니다. 다시 시도해주세요.',
    );
  }
};
