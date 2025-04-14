import { RecipeDetails } from './types';

export class RecipeDetailsModel {
  constructor(private readonly data: RecipeDetails) {}

  get documentId() {
    return this.data.documentId;
  }

  get name() {
    return this.data.name;
  }

  get summary() {
    return this.data.summary;
  }

  get image() {
    return this.data.images[0]?.url || '';
  }

  get equipment() {
    return this.data.equipments;
  }

  get ingredients() {
    return this.data.ingradients;
  }

  get directions() {
    return this.data.directions;
  }

  get preparationTime() {
    return `${this.data.preparationTime} minutes`;
  }

  get cookingTime() {
    return `${this.data.cookingTime} minutes`;
  }

  get totalTime() {
    return `${this.data.totalTime} minutes`;
  }

  get likes() {
    return this.data.likes.toLocaleString();
  }

  get servings() {
    return `${this.data.servings} servings`;
  }

  get rating() {
    return `${this.data.rating} / 5`;
  }

  get details() {
    return [
      { label: 'Preparation', value: this.preparationTime },
      { label: 'Cooking', value: this.cookingTime },
      { label: 'Total', value: this.totalTime },
      { label: 'Likes', value: this.likes },
      { label: 'Servings', value: this.servings },
      { label: 'Ratings', value: this.rating },
    ];
  }

  toOption(): { value: string; key: string } {
    return { value: this.name, key: this.documentId.toString() };
  }
}
