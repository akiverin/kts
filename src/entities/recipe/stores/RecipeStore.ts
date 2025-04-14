import { makeAutoObservable, runInAction } from 'mobx';
import { getRecipeById } from '../api';
import { RecipeDetails } from '../types';
import { Meta } from 'utils/meta';
import { RecipeDetailsModel } from '../model';
import { LoadResponse } from 'types/loadResponse';

export class RecipeStore {
  recipe: RecipeDetailsModel | null = null;
  meta: Meta = Meta.initial;
  error: string = '';
  private _currentRequest: Promise<LoadResponse> | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchRecipe(documentId: string): Promise<LoadResponse> {
    if (this._currentRequest) {
      return this._currentRequest;
    }
    this.meta = Meta.loading;
    this._currentRequest = (async () => {
      try {
        const data: RecipeDetails = await getRecipeById(documentId);
        const recipeModel = new RecipeDetailsModel(data);

        runInAction(() => {
          this.recipe = recipeModel;
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
}
