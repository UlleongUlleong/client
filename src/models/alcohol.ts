import { Category } from '../api/categoryApi';

export interface ReviewType {
  id: number;
  score: number;
  comment: string;
  alcoholId: number;
  alcohol: {
    imageUrl: string;
    name: string;
  };
}

export interface AlcoholReviewType {
  id: number;
  score: number;
  comment: string;
  user: {
    nickname: string;
    imageUrl: string;
  };
}

export interface AlcoholDetailType {
  id?: number;
  name: string;
  alcoholCategory: Category[];
  scoreAverage: number;
  reviewCount: number;
  imageUrl?: string;
  price: number;
  origin: string;
  interestCount: number;
  abv: number;
  volume: number;
  description: string;
}
