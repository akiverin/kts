import qs from 'qs';
import { api, apiRoutes } from 'config/api';
import { ApiResponse } from 'types/apiResponse';
import { Category } from './types';

export const getCategories = async (): Promise<Category[]> => {
  const query = qs.stringify({ populate: '*' }, { encodeValuesOnly: true, addQueryPrefix: true });
  const response = await api.get<ApiResponse<Category[]>>(`${apiRoutes.categories.getAll}${query}`);
  console.log('response', response.data.data);
  return response.data.data;
};
