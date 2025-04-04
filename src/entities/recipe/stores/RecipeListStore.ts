import { makeAutoObservable, runInAction } from 'mobx';
import { getPaginatedRecipes } from '../api';
import { Recipe } from '../types';
import { Pagination } from 'types/pagination';
import { Meta } from 'utils/meta';

export class RecipeListStore {
  recipes: Recipe[] = [];
  pagination: Pagination = { page: 1, pageSize: 9, pageCount: 1, total: 0 };
  meta: Meta = Meta.initial;
  error: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchRecipes(page: number) {
    this.meta = Meta.loading;
    try {
      const { data, pagination } = await getPaginatedRecipes(page, this.pagination.pageSize);
      runInAction(() => {
        this.recipes = data;
        this.pagination = pagination;
        this.meta = Meta.success;
      });
    } catch {
      runInAction(() => {
        this.error = 'Error loading recipe';
        this.meta = Meta.error;
      });
    }
  }
}
