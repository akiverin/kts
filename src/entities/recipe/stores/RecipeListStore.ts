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
  ratingFilter: number | null = null;
  vegetarianFilter: boolean = false;
  timeFilters: {
    totalTime: number | null;
    cookingTime: number | null;
    preparationTime: number | null;
  } = {
    totalTime: null,
    cookingTime: null,
    preparationTime: null,
  };
  constructor() {
    makeAutoObservable(this);
  }

  setRatingFilter(rating: number | null) {
    this.ratingFilter = rating;
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }
  setTotalTime(query: number | null) {
    if (query !== null) {
      this.timeFilters.totalTime = query;
    } else {
      this.timeFilters.totalTime = null;
    }
  }

  setCookingTime(query: number | null) {
    if (query !== null) {
      this.timeFilters.cookingTime = query;
    } else {
      this.timeFilters.cookingTime = null;
    }
  }

  setPreparationTime(query: number | null) {
    if (query !== null) {
      this.timeFilters.preparationTime = query;
    } else {
      this.timeFilters.preparationTime = null;
    }
  }

  setVegetarianFilter(vegetarian: boolean) {
    this.vegetarianFilter = vegetarian;
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

      if (this.ratingFilter !== null) {
        filters.rating = {
          $gte: this.ratingFilter,
        };
      }

      if (this.vegetarianFilter === true) {
        filters.vegetarian = {
          $eq: this.vegetarianFilter,
        };
      } else {
        filters.vegetarian = {};
      }

      // Меньше или равно значению
      if (this.timeFilters.totalTime !== null) {
        filters.totalTime = { $lte: this.timeFilters.totalTime };
      }

      if (this.timeFilters.cookingTime !== null) {
        filters.cookingTime = { $lte: this.timeFilters.cookingTime };
      }

      if (this.timeFilters.preparationTime !== null) {
        filters.preparationTime = { $lte: this.timeFilters.preparationTime };
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
