import { Category } from './types';

export class CategoryModel {
  constructor(private readonly data: Category) {}

  get id() {
    return this.data.id;
  }

  get documentId() {
    return this.data.documentId;
  }

  get name() {
    return this.data.title;
  }

  get imageUrl() {
    return this.data.image.formats.thumbnail.url || '';
  }

  get recipeCount() {
    return this.data.recipes?.length || 0;
  }

  get createdAt() {
    return new Date(this.data.createdAt).toLocaleDateString();
  }
}
