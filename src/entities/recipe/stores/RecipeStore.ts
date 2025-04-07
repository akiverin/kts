import { makeAutoObservable, runInAction } from 'mobx';
import { getRecipeById } from '../api';
import { RecipeDetails } from '../types';
import { Meta } from 'utils/meta';
import { RecipeDetailsModel } from '../model';

export class RecipeStore {
  recipe: RecipeDetailsModel | null = null;
  meta: Meta = Meta.initial;
  error: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchRecipe(documentId: string) {
    this.meta = Meta.loading;
    try {
      const data: RecipeDetails = await getRecipeById(documentId);
      const recipeModel = new RecipeDetailsModel(data);

      runInAction(() => {
        this.recipe = recipeModel;
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
