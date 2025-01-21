import { Category } from '../api/categoryApi';

export interface ProfileType {
  imageUrl?: string;
  nickname: string;
  moodCategory: Category[];
  alcoholCategory: Category[];
}

export interface ModifyProfile {
  nickname: string;
  moodCategory: number[];
  alcoholCategory: number[];
}
