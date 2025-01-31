import { apiClient } from './apiClient';

export const AddReview = async (
  id: string,
  selectedscore: number,
  reviewText: string,
) => {
  try {
    const response = await apiClient.post(
      `/api/alcohol/${id}/reviews`,
      {
        score: selectedscore,
        review: reviewText,
      },
      {},
    );
    console.log(response);
    return response;
  } catch (error: any) {
    console.log('AddReview error:', error);
    if (error?.response?.status === 401) {
      throw new Error("엑세스 토큰이 필요합니다.");
    }
    throw error;
  }
};