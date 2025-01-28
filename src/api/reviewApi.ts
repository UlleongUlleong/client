import { apiClient } from './apiClient';

export const AddReview = async (
  id: string,
  selectedscore: number,
  reviewText: string,
) => {
  try {
    const response = apiClient.post(
      `/api/alcohol/${id}/reviews`,
      {
        score: selectedscore,
        review: reviewText,
      },
      {},
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log('AddReview :', error);
  }
};
