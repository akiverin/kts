import axios from 'axios';
import { FoodDetails } from 'pages/TheFood';
import qs from 'qs';

export const API_URL = 'https://front-school-strapi.ktsdev.ru/api/recipes';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => qs.stringify(params, { encodeValuesOnly: true }),
});

export type Recipe = {
  id: number;
  documentId: string;
  calories: number;
  cookingTime: number;
  createdAt: string;
  images: [{ url: string }];
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

type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

type ResponseData = {
  data: Recipe[];
  meta: {
    pagination: Pagination;
  };
};

export const getAllRecipes = async (): Promise<Recipe[]> => {
  try {
    const countQuery = qs.stringify(
      {
        populate: ['images'],
        pagination: {
          page: 1,
          pageSize: 1,
        },
      },
      { encodeValuesOnly: true },
    );

    const countResponse = await api.get<ResponseData>(`?${countQuery}`);
    const totalItems = countResponse.data.meta.pagination.total;

    const fullQuery = qs.stringify(
      {
        populate: ['images'],
        pagination: {
          page: 1,
          pageSize: totalItems,
        },
      },
      { encodeValuesOnly: true },
    );

    const fullResponse = await api.get<ResponseData>(`?${fullQuery}`);
    return fullResponse.data.data;
  } catch (error) {
    console.error('Error fetching all recipes:', error);
    throw new Error('Failed to fetch recipes');
  }
};

export const getRecipe = async (documentId: string): Promise<FoodDetails> => {
  try {
    const query = qs.stringify(
      {
        populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category'],
      },
      { encodeValuesOnly: true },
    );

    const response = await api.get<{ data: FoodDetails }>(`/${documentId}?${query}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching recipe ${documentId}:`, error);
    throw new Error('Failed to fetch recipe');
  }
};

export const getPaginatedRecipes = async (
  page: number,
  pageSize: number,
): Promise<{ data: Recipe[]; pagination: Pagination }> => {
  try {
    const query = qs.stringify(
      {
        populate: ['images'],
        pagination: { page, pageSize },
      },
      { encodeValuesOnly: true },
    );

    const response = await api.get<ResponseData>(`?${query}`);
    return {
      data: response.data.data,
      pagination: response.data.meta.pagination,
    };
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipes');
  }
};
