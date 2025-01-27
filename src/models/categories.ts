export const moodTypeCategories: ICategory[] = [
  { id: 1, name: '혼술', type: 'mood' },
  { id: 2, name: '반주', type: 'mood' },
  { id: 3, name: '시끌시끌', type: 'mood' },
  { id: 4, name: '조용한', type: 'mood' },
  { id: 5, name: '고민상담', type: 'mood' },
  { id: 6, name: '레시피공유', type: 'mood' },
];

export const alcoholTypeCategories: ICategory[] = [
  { id: 1, name: '소주', type: 'alcohol' },
  { id: 2, name: '맥주', type: 'alcohol' },
  { id: 3, name: '위스키', type: 'alcohol' },
  { id: 4, name: '와인', type: 'alcohol' },
  { id: 5, name: '막걸리', type: 'alcohol' },
  { id: 6, name: '기타', type: 'alcohol' },
];

export interface CategoryType {
  categories: number;
}

export interface ICategory {
  id: number;
  name: string;
  type: 'alcohol' | 'mood';
}

export interface IFetchCategory {
  id: number;
  name: string;
}

export const categoryForFetch: IFetchCategory[] = [
  { id: 0, name: '평점 TOP 10' },
  { id: 1, name: '소주' },
  { id: 2, name: '맥주' },
  { id: 3, name: '위스키' },
  { id: 4, name: '와인' },
  { id: 5, name: '막걸리' },
  { id: 6, name: '기타' },
];

export const categoryForIndex = [
  '평점 TOP 10',
  '소주',
  '맥주',
  '위스키',
  '와인',
  '막걸리',
  '기타',
];
