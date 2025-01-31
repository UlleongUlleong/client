import { Category } from '../api/categoryApi';

export interface ProfileType {
  imageUrl: string;
  nickname: string;
  moodCategory: Category[];
  alcoholCategory: Category[];
}

export interface ModifyProfile {
  nickname: string;
  moodCategory: number[];
  alcoholCategory: number[];
}

export interface LikeAlcoholType {
  id: number;
  name: string;
  scoreAverage: number;
  imageUrl: string;
}

export interface ReviewAlcoholType {
  id: number;
  score: number;
  comment: string;
  alcoholId: number;
  alcohol: { name: string; imageUrl: string };
}
