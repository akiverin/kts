import { Product } from './types';
export class ProductModel {
  constructor(private readonly data: Product) {}

  get id() {
    return this.data.id;
  }

  get documentId() {
    return this.data.documentId;
  }

  get name() {
    return this.data.title;
  }

  get desc() {
    return this.data.description;
  }

  get price() {
    return `${this.data.price} $`;
  }

  get discountPercent() {
    return this.data.discountPercent;
  }

  get oldPrice() {
    return `${Math.round(this.data.price / (1 - this.data.discountPercent / 100))} $`;
  }

  get rating() {
    return this.data.rating;
  }

  get isInStock() {
    return this.data.isInStock;
  }
}
