import qs from 'qs';
import { api, apiRoutes } from 'config/api';
import { ApiResponse } from 'types/apiResponse';
import { Product, ProductListResponse } from './types';

export const getProducts = async (): Promise<Product[]> => {
  const query = qs.stringify({ populate: '*' }, { encodeValuesOnly: true, addQueryPrefix: true });
  const response = await api.get<ApiResponse<Product[]>>(`${apiRoutes.products.getAll}${query}`);
  return response.data.data;
};

export const getProductsList = async (
  page: number,
  pageSize: number,
  search?: string,
): Promise<ProductListResponse> => {
  const query = qs.stringify(
    {
      populate: '*',
      pagination: {
        page,
        pageSize,
      },
      filters: {
        title: {
          $contains: search,
        },
      },
    },
    { encodeValuesOnly: true },
  );

  const response = await api.get<ProductListResponse>(`${apiRoutes.products.getAll}?${query}`);
  return response.data;
};
