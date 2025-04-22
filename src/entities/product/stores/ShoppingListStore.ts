import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { Meta } from 'utils/meta';
import { PaginationStore } from 'entities/pagination/stores/PaginationStore';
import { LoadResponse } from 'types/loadResponse';
import { ProductModel } from '../model';
import { Product } from '../types';
import { errorMessage } from 'utils/errors';

const STORAGE_KEY = 'shoppingList';

export class ShoppingListStore {
  products: ProductModel[] = [];
  searchQuery = '';
  meta = Meta.initial;
  error = '';
  pagination = new PaginationStore();

  constructor() {
    makeAutoObservable(this);
    this.loadFromStorage();

    // Сохранять изменения в localStorage при изменении списка продуктов
    reaction(
      () => this.products.map((p) => p.data),
      (list) => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        } catch {
          // игнорируем ошибки записи
        }
      },
    );
  }

  private loadFromStorage() {
    this.meta = Meta.loading;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const items: Product[] = JSON.parse(raw);
        this.products = items.map((data) => new ProductModel(data));
      }
      this.meta = Meta.success;
    } catch (e) {
      this.error = e instanceof Error ? e.message : 'Unknown error';
      this.meta = Meta.error;
    }
  }

  /** Отфильтрованные (по поиску) */
  get filteredProducts(): ProductModel[] {
    const q = this.searchQuery.trim().toLowerCase();
    return q ? this.products.filter((p) => p.name.toLowerCase().includes(q)) : this.products;
  }

  /** Отфильтрованные + пагинация */
  get paginatedProducts(): ProductModel[] {
    const { page, pageSize } = this.pagination;
    const start = (page - 1) * pageSize;
    return this.filteredProducts.slice(start, start + pageSize);
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
    this.pagination.setPage(1);
  }

  async fetchProducts(page = 1): Promise<LoadResponse> {
    this.meta = Meta.loading;
    try {
      const total = this.filteredProducts.length;
      const pageCount = Math.max(Math.ceil(total / this.pagination.pageSize), 1);
      runInAction(() => {
        this.pagination.setPagination({
          page,
          pageSize: this.pagination.pageSize,
          total,
          pageCount,
        });
        this.meta = Meta.success;
      });
      return { success: true };
    } catch (e) {
      this.error = errorMessage(e);
      this.meta = Meta.error;
      return { success: false, error: errorMessage(e) };
    }
  }

  addProduct(product: ProductModel) {
    this.products.push(product);
    this.pagination.setPage(1);
  }

  removeProduct(id: string) {
    this.products = this.products.filter((p) => p.id.toString() !== id);
    this.pagination.setPage(1);
  }

  toggleProduct(product: Product) {
    if (this.products.some((p) => p.id === product.id)) {
      this.removeProduct(product.id.toString());
    } else {
      this.addProduct(new ProductModel(product));
    }
  }

  hasProduct(id: string): boolean {
    return this.products.some((p) => p.id.toString() === id);
  }

  clearAll() {
    this.products = [];
    this.pagination.setPage(1);
  }
}
