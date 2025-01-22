interface alcoholCategory {
  id: number;
  name: string;
}
export interface IAlcohol {
  id: number;
  name: string;
  imageUrl: string;
  scoreAverage: number;
  reviewCount: number;
  price: number;
  alcoholCategory: alcoholCategory;
}
