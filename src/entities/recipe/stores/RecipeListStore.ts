import { makeAutoObservable, runInAction } from 'mobx';
import { getPaginatedRecipes } from '../api';
import { Recipe } from '../types';
import { Meta } from 'utils/meta';
import { PaginationStore } from 'entities/pagination/stores/PaginationStore';
import { LoadResponse } from 'types/loadResponse';
import { Category } from 'entities/category/types';
import { getCategories } from 'entities/category/api';
import SearchParamsModel from 'entities/searchParams/model';

export class RecipeListStore {
  recipes: Recipe[] = [];
  categories: Category[] = [];
  pagination = new PaginationStore();
  meta: Meta = Meta.initial;
  categoriesMeta: Meta = Meta.initial;
  error: string = '';
  searchModel: SearchParamsModel;
  private _currentRequest: Promise<LoadResponse> | null = null;
  private _categoriesRequest: Promise<LoadResponse> | null = null;

  constructor(updateParams: (params: URLSearchParams) => void, initialParams: URLSearchParams) {
    makeAutoObservable(this);
    this.searchModel = new SearchParamsModel(updateParams, initialParams);
  }
  private _prepareFilters(): Record<string, { [key: string]: unknown }> {
    const filters: Record<string, { [key: string]: unknown }> = {};

    if (this.searchModel.search) {
      filters.name = { $containsi: this.searchModel.search };
    }

    if (this.searchModel.category !== null) {
      filters.category = {
        id: {
          $eq: this.searchModel.category,
        },
      };
    }

    if (this.searchModel.rating !== null) {
      filters.rating = {
        $gte: this.searchModel.rating,
      };
    }

    if (this.searchModel.vegetarian === true) {
      filters.vegetarian = {
        $eq: true,
      };
    } else {
      filters.vegetarian = {};
    }

    if (this.searchModel.totalTime !== null) {
      filters.totalTime = { $lte: this.searchModel.totalTime };
    }

    if (this.searchModel.cookingTime !== null) {
      filters.cookingTime = { $lte: this.searchModel.cookingTime };
    }

    if (this.searchModel.preparationTime !== null) {
      filters.preparationTime = { $lte: this.searchModel.preparationTime };
    }

    return filters;
  }

  /** Получение списка рецептов с фильтрацией */
  async fetchRecipes(): Promise<LoadResponse> {
    if (this._currentRequest) {
      return this._currentRequest;
    }
    this.meta = Meta.loading;
    const page = this.searchModel.page;
    this._currentRequest = (async () => {
      try {
        const filters = this._prepareFilters();

        const { data, pagination } = await getPaginatedRecipes(
          page,
          this.pagination.pageSize,
          filters as unknown as Record<string, string | number | boolean | null>,
        );
        runInAction(() => {
          this.recipes = data;
          this.pagination.setPagination(pagination);
          this.meta = Meta.success;
        });
        return { success: true };
      } catch (error) {
        runInAction(() => {
          this.error = 'Error loading recipe';
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
  /** Получение всех категорий для выпадающего списка */
  fetchAllCategories(): Promise<LoadResponse> {
    if (this._categoriesRequest) return this._categoriesRequest;

    this.categoriesMeta = Meta.loading;

    this._categoriesRequest = (async () => {
      try {
        const data = await getCategories();
        runInAction(() => {
          this.categories = data;
          this.categoriesMeta = Meta.success;
        });
        return {
          success: true,
        };
      } catch (error) {
        runInAction(() => {
          this.categoriesMeta = Meta.error;
        });
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      } finally {
        runInAction(() => {
          this._categoriesRequest = null;
        });
      }
    })();

    return this._categoriesRequest;
  }

  /** Для использования в селектах / выпадающих меню */
  get categoryOptions() {
    return this.categories.map((c) => ({
      key: String(c.id),
      value: String(c.title),
    }));
  }
}
