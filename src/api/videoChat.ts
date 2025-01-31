import { apiClient } from './apiClient';

export interface Participant {
  id: string;
  nickname: string;
}

export interface RoomConfig {
  maxParticipants?: number;
  title: string;
}

interface RoomResponse {
  roomId: string;
  sessionId: string;
  token: string;
}
export const getRoomInfo = async (roomId: string) => {
  try {
    const response = await apiClient.get(`/api/chat/room/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error while fetching room info', error);
    throw error;
  }
};
// 요청 인터셉터 설정
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class VideoService {
  static async createRoom(config: RoomConfig): Promise<RoomResponse> {
    try {
      const response = await apiClient.post('/api/openvidu', config);
      return response.data;
    } catch (error) {
      console.error('Error while creating room', error);
      throw error;
    }
  }

  static async joinRoom(
    roomId: string,
    nickname: string,
  ): Promise<RoomResponse> {
    try {
      const response = await apiClient.post(`/api/openvidu/${roomId}/join`, {
        nickname,
      });
      return response.data;
    } catch (error) {
      console.error('Error while joining room', error);
      throw error;
    }
  }

  static async leaveRoom(roomId: string, participantId: string): Promise<void> {
    try {
      await apiClient.delete(`/api/openvidu/${roomId}/leave/${participantId}`);
    } catch (error) {
      console.error('Error while leaving room', error);
      throw error;
    }
  }
}
