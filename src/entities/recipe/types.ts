import { ApiResponse } from 'types/apiResponse';

export type Recipe = {
  id: number;
  documentId: string;
  calories: number;
  cookingTime: number;
  createdAt: string;
  images: Array<{ url: string }>;
  likes: number;
  name: string;
  preparationTime: number;
  publishedAt: string;
  rating: number;
  servings: number;
  summary: string;
  totalTime: number;
  updatedAt: string;
  vegetarian: boolean;
};

export type RecipeDetails = {
  documentId: string;
  name: string;
  preparationTime: number;
  cookingTime: number;
  totalTime: number;
  likes: number;
  servings: number;
  rating: number;
  images: Array<{ url: string }>;
  calories: number;
  category: {
    title: string;
  };
  directions: Array<{ description: string }>;
  equipments: Array<{ name: string }>;
  ingradients: Array<{ name: string }>;
  summary: string;
  vegetarian: boolean;
};

export type RecipeResponse = ApiResponse<Recipe[]>;
