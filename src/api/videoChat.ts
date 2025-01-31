import { apiClient } from './apiClient';

interface Participant {
  id: string;
  nickname: string;
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

export const getParticipants = async (roomId: string) => {
  try {
    const response = await apiClient.get(
      `/api/chat/room/${roomId}/participants`,
    );
    return response.data.data as Participant[];
  } catch (error) {
    console.error('Error while fetching participants', error);
    throw error;
  }
};
