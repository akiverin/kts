import { PaginationT } from 'entities/pagination/types';
import qs from 'qs';
import { ApiResponse } from 'types/apiResponse';
import { api, apiRoutes } from 'config/api';
import { formatApiError } from 'utils/errors';
import { Recipe, RecipeDetails } from './types';

export const getRecipeById = async (documentId: string): Promise<RecipeDetails> => {
  try {
    const query = qs.stringify(
      {
        populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category'],
      },
      {
        encodeValuesOnly: true,
        addQueryPrefix: true,
      },
    );
    const url = `${apiRoutes.recipes.getById(documentId)}${query}`;
    const response = await api.get<ApiResponse<RecipeDetails>>(url);
    return response.data.data;
  } catch (error) {
    throw new Error(formatApiError('getRecipeById', error));
  }
};

export const getPaginatedRecipes = async (
  page: number,
  pageSize: number,
  filters?: Record<string, string | number | boolean | null>,
): Promise<{ data: Recipe[]; pagination: PaginationT }> => {
  try {
    const query = qs.stringify(
      {
        populate: ['images'],
        filters: filters || {},
        pagination: { page, pageSize },
      },
      {
        encodeValuesOnly: true,
        addQueryPrefix: true,
      },
    );

    const response = await api.get<ApiResponse<Recipe[]>>(`${apiRoutes.recipes.getAll}${query}`);

    return {
      data: response.data.data,
      pagination: response.data.meta?.pagination ?? {
        page: 1,
        pageSize: 10,
        pageCount: 1,
        total: 0,
      },
    };
  } catch (error) {
    throw new Error(formatApiError('getPaginatedRecipes', error));
  }
};
