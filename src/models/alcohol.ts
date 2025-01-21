import { Category } from '../api/categoryApi';

export interface ReviewListType {
  imageUrl?: string;
  nickName: string;
  comment: string;
  score: number;
}

export interface AlcoholDetailType {
  id: number;
  name: string;
  alcoholCategory: Category[];
  scoreAverage: number;
  reviewCount: number;
  imageUrl?: string;
}

export interface AlcoholDetailType {
  alcoholInfo: AlcoholDetailType;
  reviews: ReviewListType[];
}
