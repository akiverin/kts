import { makeAutoObservable } from 'mobx';
import { PaginationT } from '../types';

export class PaginationStore {
  page = 1;
  pageSize = 9;
  pageCount = 1;
  total = 0;

  constructor() {
    makeAutoObservable(this);
  }
  setPagination({ page, pageSize, pageCount, total }: PaginationT) {
    this.page = page;
    this.pageSize = pageSize;
    this.pageCount = pageCount;
    this.total = total;
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.pageCount) {
      this.page = page;
    }
  }

  nextPage() {
    if (this.page < this.pageCount) {
      this.page += 1;
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page -= 1;
    }
  }

  reset() {
    this.page = 1;
    this.pageSize = 9;
    this.pageCount = 1;
    this.total = 0;
  }
}
