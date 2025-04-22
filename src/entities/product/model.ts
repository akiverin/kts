import { Product } from './types';
export class ProductModel {
  constructor(readonly data: Product) {}

  get id() {
    return this.data.id;
  }

  get name() {
    return this.data.name;
  }

  get amount() {
    return this.data.amount;
  }

  get unit() {
    return this.data.unit;
  }

  get isInStock() {
    return this.data.isInStock;
  }
  get toJSON() {
    return this.data;
  }
}
