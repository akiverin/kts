export interface Product {
  id: number;
  name: string;
  amount: number;
  unit: string;
  isInStock: boolean;
}

export interface ProductListResponse {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
