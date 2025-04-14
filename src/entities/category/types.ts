import { Recipe } from 'entities/recipe/types';
import { Image } from 'types/image';

export interface Category {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: Image;
  recipes: Recipe[];
}

export interface CategoryListResponse {
  data: Category[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
