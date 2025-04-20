import { makeAutoObservable, reaction } from 'mobx';
import { ProductModel } from '../model';

const SHOP_KEY = 'shoppingList';

export class ShoppingListStore {
  products: ProductModel['data'][] = [];

  constructor() {
    makeAutoObservable(this);

    const stored = localStorage.getItem(SHOP_KEY);
    if (stored) {
      try {
        this.products = JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse shopping list from localStorage', error);
      }
    }

    reaction(
      () => this.products.slice(),
      (products) => {
        localStorage.setItem(SHOP_KEY, JSON.stringify(products));
      },
    );
  }

  addShop(product: ProductModel) {
    if (!this.isShop(product.documentId)) {
      this.products.push(product['data']);
    }
  }

  removeShop(productId: string) {
    this.products = this.products.filter((r) => r.documentId !== productId);
  }

  isShop(productId: string): boolean {
    return this.products.some((r: ProductModel['data']) => r.documentId === productId);
  }

  toggleShop(product: ProductModel) {
    if (this.isShop(product.documentId)) {
      this.removeShop(product.documentId);
    } else {
      this.addShop(product);
    }
  }
}
