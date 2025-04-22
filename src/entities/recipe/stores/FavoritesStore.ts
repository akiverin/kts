import { makeAutoObservable, reaction } from 'mobx';
import { Recipe } from '../types';

const FAVORITES_KEY = 'favoriteRecipes';

export class FavoritesStore {
  favorites: Recipe[] = [];

  constructor() {
    makeAutoObservable(this);

    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        this.favorites = JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse favorites from localStorage', error);
      }
    }

    reaction(
      () => this.favorites.slice(),
      (favorites) => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      },
    );
  }

  addFavorite(recipe: Recipe) {
    if (!this.isFavorite(recipe.documentId)) {
      this.favorites.push(recipe);
    }
  }

  removeFavorite(recipeId: string) {
    this.favorites = this.favorites.filter((r) => r.documentId !== recipeId);
  }

  isFavorite(recipeId: string): boolean {
    return this.favorites.some((r) => r.documentId === recipeId);
  }

  toggleFavorite(recipe: Recipe) {
    if (this.isFavorite(recipe.documentId)) {
      this.removeFavorite(recipe.documentId);
    } else {
      this.addFavorite(recipe);
    }
  }
}
