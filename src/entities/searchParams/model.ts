export default class SearchParamsModel {
  search: string = '';
  category: number | null = null;
  rating: number | null = null;
  vegetarian: boolean = false;
  totalTime: number | null = null;
  cookingTime: number | null = null;
  preparationTime: number | null = null;
  page: number = 1;

  constructor(
    private updateParams: (params: URLSearchParams) => void,
    initialParams: URLSearchParams,
  ) {
    this.initFromParams(initialParams);
  }

  initFromParams(params: URLSearchParams) {
    this.search = params.get('search') || '';
    this.category = params.get('category') ? Number(params.get('category')) : null;
    this.rating = params.get('rating') ? Number(params.get('rating')) : null;
    this.vegetarian = params.get('vegetarian') === 'true';
    this.totalTime = params.get('totalTime') ? Number(params.get('totalTime')) : null;
    this.cookingTime = params.get('cookingTime') ? Number(params.get('cookingTime')) : null;
    this.preparationTime = params.get('preparationTime') ? Number(params.get('preparationTime')) : null;
    this.page = params.get('page') ? Number(params.get('page')) : 1;
  }

  private updateURL() {
    const params = new URLSearchParams();
    if (this.search) params.set('search', this.search);
    if (this.category !== null) params.set('category', String(this.category));
    if (this.rating !== null) params.set('rating', String(this.rating));
    if (this.vegetarian) params.set('vegetarian', 'true');
    if (this.totalTime !== null) params.set('totalTime', String(this.totalTime));
    if (this.cookingTime !== null) params.set('cookingTime', String(this.cookingTime));
    if (this.preparationTime !== null) params.set('preparationTime', String(this.preparationTime));
    params.set('page', String(this.page));
    this.updateParams(params);
  }

  setSearch(search: string) {
    this.search = search;
    this.page = 1;
    this.updateURL();
  }

  setCategory(category: number | null) {
    this.category = category;
    this.page = 1;
    this.updateURL();
  }

  setRating(rating: number | null) {
    this.rating = rating;
    this.page = 1;
    this.updateURL();
  }

  setVegetarian(vegetarian: boolean) {
    this.vegetarian = vegetarian;
    this.page = 1;
    this.updateURL();
  }

  setTotalTime(totalTime: number | null) {
    this.totalTime = totalTime;
    this.page = 1;
    this.updateURL();
  }

  setCookingTime(cookingTime: number | null) {
    this.cookingTime = cookingTime;
    this.page = 1;
    this.updateURL();
  }

  setPreparationTime(preparationTime: number | null) {
    this.preparationTime = preparationTime;
    this.page = 1;
    this.updateURL();
  }

  setPage(page: number) {
    this.page = page;
    this.updateURL();
  }
}
