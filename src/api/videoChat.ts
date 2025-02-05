import axios from 'axios';

const getBasicAuthHeader = (secretKey: string) => {
  const basicAuth = btoa(`${secretKey}`);
  return `Basic ${basicAuth}`;
};

const openViduApi = axios.create({
  baseURL: 'https://api.sulleong.coderoom.site',
  headers: {
    'Content-Type': 'application/json',
    Authorization: getBasicAuthHeader('ulleong-openvidu-secret'), // Replace with your secret key
  },
});
export interface Participant {
  id: string;
  nickname: string;
}

export interface RoomConfig {
  maxParticipants?: number;
  title: string;
}

interface RoomSessionResponse {
  data: { sessionId: string };
}
interface RoomSessionRequest {
  roomId: string;
}

interface MakeRoomResponse {
  data: string;
}
export const createSession = async (
  request: RoomSessionRequest,
): Promise<RoomSessionResponse> => {
  try {
    const response = await openViduApi.post<RoomSessionResponse>(
      '/api/openvidu/session',
      request,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to create session: ${error.response?.data?.message || error.message}`,
      );
    }
    throw error;
  }
};

export const createToken = async (sessionId: string) => {
  try {
    const response = await openViduApi.post('/api/openvidu/token', {
      sessionId,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to create token: ${error.response?.data?.message || error.message}`,
      );
    }
    throw error;
  }
};

export const joinRoom = async (roomId: string) => {
  try {
    const tokenResponse = await createToken(roomId);
    return { data: tokenResponse.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to join room: ${error.response?.data?.message || error.message}`,
      );
    }
    throw error;
  }
};
export const leaveSession = async (roomId: number, participantId: string) => {
  try {
    await openViduApi.delete(
      `/api/openvidu/session/${roomId}/participant/${participantId}`,
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to leave session: ${error.response?.data?.message || error.message}`,
      );
    }
    throw error;
  }
};

// 요청 인터셉터 설정
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('userToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export class VideoService {
//   static async createRoom(config: RoomConfig): Promise<RoomResponse> {
//     try {
//       const response = await apiClient.post('/api/openvidu/session', config);
//       return response.data;
//     } catch (error) {
//       console.error('Error while creating room', error);
//       throw error;
//     }
//   }

//   static async joinRoom(
//     roomId: string,
//     nickname: string,
//   ): Promise<RoomResponse> {
//     try {
//       const response = await apiClient.post(`/api/openvidu/${roomId}/join`, {
//         nickname,
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error while joining room', error);
//       throw error;
//     }
//   }

//   static async leaveRoom(roomId: string, participantId: string): Promise<void> {
//     try {
//       await apiClient.delete(`/api/openvidu/${roomId}/leave/${participantId}`);
//     } catch (error) {
//       console.error('Error while leaving room', error);
//       throw error;
//     }
//   }
// }
