import { Category } from './types';

export class CategoryModel {
  constructor(public data: Category) {}

  get id() {
    return this.data.id;
  }

  get documentId() {
    return this.data.documentId;
  }

  get name() {
    return this.data.title;
  }

  toOption() {
    return { value: this.name, key: this.id.toString() };
  }
}
