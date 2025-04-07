import { makeAutoObservable, runInAction } from 'mobx';
import { CategoryModel } from '../model';
import { getCategories } from '../api';
import { Meta } from 'utils/meta';

export class CategoryStore {
  categories: CategoryModel[] = [];
  meta: Meta = Meta.initial;
  error: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCategories() {
    this.meta = Meta.loading;
    try {
      const data = await getCategories();
      runInAction(() => {
        this.categories = data.map((c) => new CategoryModel(c));
        this.meta = Meta.success;
      });
    } catch {
      runInAction(() => {
        this.error = 'Error loading categories';
        this.meta = Meta.error;
      });
    }
  }

  get asOptions() {
    return this.categories.map((c) => c.toOption());
  }
}
