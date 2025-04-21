import { makeAutoObservable, runInAction } from 'mobx';
import { getRecipeById } from '../api';
import { RecipeDetails } from '../types';
import { Meta } from 'utils/meta';
import { RecipeDetailsModel } from '../model';
import { LoadResponse } from 'types/loadResponse';
import { errorMessage, isCancelError } from 'utils/errors';

export class RecipeStore {
  recipe: RecipeDetailsModel | null = null;
  meta: Meta = Meta.initial;
  error: string = '';
  private _recipeAbortController: AbortController | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchRecipe(documentId: string): Promise<LoadResponse> {
    if (this._recipeAbortController) {
      this._recipeAbortController.abort();
    }

    this._recipeAbortController = new AbortController();
    const signal = this._recipeAbortController.signal;

    this.meta = Meta.loading;

    try {
      const data: RecipeDetails = await getRecipeById(documentId, signal);
      const recipeModel = new RecipeDetailsModel(data);

      runInAction(() => {
        this.recipe = recipeModel;
        this.meta = Meta.success;
      });
      return { success: true };
    } catch (error) {
      if (isCancelError(error)) {
        return { success: false };
      }
      runInAction(() => {
        this.error = 'Error loading recipe';
        this.meta = Meta.error;
      });
      return {
        success: false,
        error: errorMessage(error),
      };
    } finally {
      runInAction(() => {
        this._recipeAbortController = null;
      });
    }
  }
}
