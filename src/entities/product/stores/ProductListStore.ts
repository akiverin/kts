import { makeAutoObservable, runInAction } from 'mobx';
import { Meta } from 'utils/meta';
import { ProductModel } from '../model';
import { getProductsList } from '../api';
import { Product } from '../types';
import { PaginationStore } from 'entities/pagination/stores/PaginationStore';
import { LoadResponse } from 'types/loadResponse';

export class ProductListStore {
  products: ProductModel[] = [];
  meta: Meta = Meta.initial;
  error = '';
  pagination = new PaginationStore();
  searchQuery = '';
  private _currentRequest: Promise<LoadResponse> | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProducts(page = 1): Promise<LoadResponse> {
    if (this._currentRequest) {
      return this._currentRequest;
    }
    this.meta = Meta.loading;
    this._currentRequest = (async () => {
      try {
        const response = await getProductsList(page, this.pagination.pageSize, this.searchQuery || undefined);
        runInAction(() => {
          this.products = response.data.map((c: Product) => new ProductModel(c));
          this.pagination.setPagination(response.meta.pagination);
          this.meta = Meta.success;
        });
        return { success: true };
      } catch (error) {
        runInAction(() => {
          this.error = error instanceof Error ? error.message : 'Unknown error';
          this.meta = Meta.error;
        });
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      } finally {
        runInAction(() => {
          this._currentRequest = null;
        });
      }
    })();
    return this._currentRequest;
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }
}
