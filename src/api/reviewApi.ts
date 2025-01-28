import { apiClient } from './apiClient';

export const AddReview = async (
  id: string,
  selectedscore: number,
  reviewText: string,
) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczNzQzODEwNCwiZXhwIjoxNzM4MDQyOTA0fQ.MZzYULu7nG57K6qa9KGuTPikzKHXpaqD3eAMzypbLPQ';
  try {
    const response = apiClient.post(
      `/api/alcohol/${id}/reviews`,
      {
        score: selectedscore,
        review: reviewText,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log('AddReview :', error);
  }
};
