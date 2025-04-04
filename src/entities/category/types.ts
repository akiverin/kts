import { Recipe } from 'entities/recipe/types';

export interface Category {
  id: number;
  documentId: string;
  title: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  recipes: Recipe[];
}
