import { Pagination } from './pagination';

export type ApiResponse<T> = {
  data: T;
  meta?: {
    pagination: Pagination;
  };
};
