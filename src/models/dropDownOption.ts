export interface ISortOption {
  label: string;
  value: string;
}

export const sortReviewOptions = [
  { value: 'name', label: '이름 순' },
  { value: 'star', label: '별점 순' },
  { value: 'recent', label: '최신 순' },
  { value: 'review', label: '리뷰 순' },
];

export const sortChatRoomOptions = [
  { value: 'creationDate', label: '이름 순' },
  { value: 'userCount', label: '생성일 순' },
];
