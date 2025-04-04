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
  searchQuery: string = '';
  selectedCategory: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  setSelectedCategory(categoryId: number | null) {
    this.selectedCategory = categoryId;
  }

  async fetchRecipes(page: number) {
    this.meta = Meta.loading;
    try {
      const filters: Record<string, { [key: string]: unknown }> = {};
      if (this.searchQuery) {
        filters.name = { $containsi: this.searchQuery };
      }
      if (this.selectedCategory !== null) {
        filters.category = {
          id: {
            $eq: this.selectedCategory,
          },
        };
      }

      const { data, pagination } = await getPaginatedRecipes(
        page,
        this.pagination.pageSize,
        filters as unknown as Record<string, string | number | boolean | null>,
      );
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
