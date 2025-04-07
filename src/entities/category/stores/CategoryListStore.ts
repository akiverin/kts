import { makeAutoObservable, runInAction } from 'mobx';
import { Meta } from 'utils/meta';
import { CategoryModel } from '../model';
import { getCategoryList } from '../api';
import { Category } from '../types';

export class CategoryListStore {
  categories: CategoryModel[] = [];
  meta: Meta = Meta.initial;
  error = '';
  pagination = {
    page: 1,
    pageCount: 0,
    total: 0,
  };
  searchQuery = '';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCategories(page = 1) {
    this.meta = Meta.loading;
    try {
      const response = await getCategoryList(page, this.searchQuery);
      runInAction(() => {
        this.categories = response.data.map((c: Category) => new CategoryModel(c));
        this.pagination = {
          page: response.meta.pagination.page,
          pageCount: response.meta.pagination.pageCount,
          total: response.meta.pagination.total,
        };
        this.meta = Meta.success;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Unknown error';
        this.meta = Meta.error;
      });
    }
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }
}
