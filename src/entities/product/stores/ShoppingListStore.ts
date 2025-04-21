import { makeAutoObservable, reaction, computed } from 'mobx';
import { ProductModel } from '../model';
import { Meta } from 'utils/meta';
import { PaginationStore } from 'entities/pagination/stores/PaginationStore';
import { LoadResponse } from 'types/loadResponse';
import { Product } from '../types';

const SHOP_KEY = 'shoppingList';

export class ShoppingListStore {
  products: ProductModel[] = [];
  filteredProducts: ProductModel[] = [];
  meta: Meta = Meta.initial;
  error = '';
  pagination = new PaginationStore();
  searchQuery = '';

  constructor() {
    makeAutoObservable(this, {
      paginatedProducts: computed,
    });

    // Загрузка данных из localStorage
    this.loadFromStorage();

    // Реакция на изменения для сохранения в localStorage
    reaction(
      () => this.products.map((product) => product.name),
      (productsData) => {
        localStorage.setItem(SHOP_KEY, JSON.stringify(productsData));
      },
    );

    // Реакция на изменения поиска или products
    reaction(
      () => [this.searchQuery, this.products.length],
      () => {
        this.filterProducts();
        this.pagination.setPagination({
          page: this.pagination.page,
          pageSize: this.pagination.pageSize,
          pageCount: Math.ceil(this.filteredProducts.length / this.pagination.pageSize),
          total: this.filteredProducts.length,
        });
      },
    );
  }

  get paginatedProducts() {
    const start = (this.pagination.page - 1) * this.pagination.pageSize;
    const end = start + this.pagination.pageSize;
    return this.filteredProducts.slice(start, end);
  }

  loadFromStorage() {
    this.meta = Meta.loading;
    try {
      const stored = localStorage.getItem(SHOP_KEY);
      if (stored) {
        const productsData: Product[] = JSON.parse(stored);
        this.products = productsData.map((product) => new ProductModel(product));
        this.filterProducts();
        this.pagination.setPagination({
          page: 1,
          pageSize: this.pagination.pageSize,
          pageCount: Math.ceil(this.filteredProducts.length / this.pagination.pageSize),
          total: this.filteredProducts.length,
        });
        this.meta = Meta.success;
      } else {
        this.products = [];
        this.filteredProducts = [];
        this.pagination.setPagination({
          page: 1,
          pageSize: this.pagination.pageSize,
          pageCount: 0,
          total: 0,
        });
        this.meta = Meta.success;
      }
    } catch (error) {
      console.error('Failed to parse shopping list from localStorage', error);
      this.error = error instanceof Error ? error.message : 'Unknown error';
      this.meta = Meta.error;
    }
  }

  filterProducts() {
    if (!this.searchQuery) {
      this.filteredProducts = [...this.products];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter((product) => {
      return product.name.toLowerCase().includes(query);
    });
  }

  async fetchProducts(page = 1): Promise<LoadResponse> {
    this.meta = Meta.loading;

    try {
      // Имитация задержки, как если бы это был API-запрос
      await new Promise((resolve) => setTimeout(resolve, 100));

      this.pagination.setPagination({
        ...this.pagination,
        page,
      });
      this.meta = Meta.success;
      return { success: true };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      this.error = errorMsg;
      this.meta = Meta.error;
      return {
        success: false,
        error: errorMsg,
      };
    }
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  addShop(product: ProductModel) {
    if (!this.isShop(product.id.toString())) {
      this.products.push(product);
      this.filterProducts();
      this.pagination.setPagination({
        ...this.pagination,
        pageCount: Math.ceil(this.filteredProducts.length / this.pagination.pageSize),
        total: this.filteredProducts.length,
      });
    }
  }

  removeShop(productId: string) {
    this.products = this.products.filter((product) => product.id.toString() !== productId);
    this.filterProducts();
    this.pagination.setPagination({
      ...this.pagination,
      pageCount: Math.ceil(this.filteredProducts.length / this.pagination.pageSize),
      total: this.filteredProducts.length,
    });
  }

  isShop(productId: string): boolean {
    return this.products.some((product) => product.id.toString() === productId);
  }

  toggleShop(product: ProductModel) {
    if (this.isShop(product.id.toString())) {
      this.removeShop(product.id.toString());
    } else {
      this.addShop(product);
    }
  }

  clearAll() {
    this.products = [];
    this.filterProducts();
    this.pagination.setPagination({
      page: 1,
      pageSize: this.pagination.pageSize,
      pageCount: 0,
      total: 0,
    });
  }
}
