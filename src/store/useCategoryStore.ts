import { create } from 'zustand';
import { ICategory } from '../models/categories';
import { getAlcoholCategory, getMoodCategory } from '../api/category';

interface CategoryStore {
  moodCategories: ICategory[];
  alcoholCategories: ICategory[];
  isLoading: boolean;
  error: string | null;
  setMoodCategories: (categories: ICategory[]) => void;
  setAlcoholCategories: (categories: ICategory[]) => void;
  fetchMoodCategories: () => Promise<void>;
  fetchAlcoholCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  moodCategories: [],
  alcoholCategories: [],
  isLoading: false,
  error: null,
  setMoodCategories: (categories) => set({ moodCategories: categories }),
  setAlcoholCategories: (categories) => set({ alcoholCategories: categories }),
  fetchMoodCategories: async () => {
    if (get().moodCategories.length > 0) return;
    set({ isLoading: true, error: null });
    try {
      const categories = await getMoodCategory();
      set({ moodCategories: categories, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch mood categories', isLoading: false });
      console.error('fetchMoodCategories error:', error);
    }
  },
  fetchAlcoholCategories: async () => {
    if (get().alcoholCategories.length > 0) return;
    set({ isLoading: true, error: null });
    try {
      const categories = await getAlcoholCategory();
      set({ alcoholCategories: categories, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch alcohol categories', isLoading: false });
      console.error('fetchAlcoholCategories error:', error);
    }
  },
}));
