export interface ISortOption {
  label: string;
  value: string;
}

export const sortReviewOptions = [
  { value: 'name', label: '이름 순' },
  { value: 'scoreAverage', label: '별점 순' },
  { value: 'reviewCount', label: '리뷰 순' },
  { value: 'interestCount', label: '관심 순' },
];

export const sortChatRoomOptions = [
  { value: 'createdAt', label: '생성일 순' },
  { value: 'participantCount', label: '참여자 순' },
];

export const sortOptions = [
  'name',
  'createdAt',
  'reviewCount',
  'scoreAverage',
  'interestCount',
];
