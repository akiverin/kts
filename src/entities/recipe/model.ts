import { Recipe } from './types';

export class RecipeModel {
  constructor(private readonly data: Recipe) {}

  get id() {
    return this.data.documentId;
  }

  get calories() {
    return `${Math.round(this.data.calories)} kcal`;
  }

  get cookingTime() {
    return `${this.data.cookingTime} mins`;
  }

  get rating() {
    return `${this.data.rating}/5`;
  }
}
