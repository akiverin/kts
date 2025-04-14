import { makeAutoObservable, runInAction } from 'mobx';
import { Meta } from 'utils/meta';
import { CategoryModel } from '../model';
import { getCategoryList } from '../api';
import { Category } from '../types';
import { PaginationStore } from 'entities/pagination/stores/PaginationStore';
import { LoadResponse } from 'types/loadResponse';

export class CategoryListStore {
  categories: CategoryModel[] = [];
  meta: Meta = Meta.initial;
  error = '';
  pagination = new PaginationStore();
  searchQuery = '';
  private _currentRequest: Promise<LoadResponse> | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCategories(page = 1): Promise<LoadResponse> {
    if (this._currentRequest) {
      return this._currentRequest;
    }
    this.meta = Meta.loading;
    this._currentRequest = (async () => {
      try {
        const response = await getCategoryList(page, this.pagination.pageSize, this.searchQuery || undefined);
        runInAction(() => {
          this.categories = response.data.map((c: Category) => new CategoryModel(c));
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
