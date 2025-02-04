import { apiClient } from './apiClient';

interface getRoomInfoContentProps {
  roomId: string;
}

export const getRoomInfo = async (
  getRoomInfoContent: getRoomInfoContentProps,
) => {
  const { roomId } = getRoomInfoContent;
  try {
    const response = await apiClient.get(`/api/chat/rooms/${roomId}`);
    return response.data;
  } catch (error: any) {
    console.log('error', error.response?.data || error.message);
    throw error;
  }
};

interface getRoomParticipantsContentProps {
  roomId: string;
}

export const getRoomParticipants = async (
  getRoomParticipantsContent: getRoomParticipantsContentProps,
) => {
  const { roomId } = getRoomParticipantsContent;
  try {
    const response = await apiClient.get(
      `/api/chat/rooms/${roomId}/participants`,
    );
    return response.data;
  } catch (error: any) {
    console.log('error in login', error.response?.data || error.message);
    throw error;
  }
};
