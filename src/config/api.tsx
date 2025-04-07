import axios from 'axios';
import qs from 'qs';

export const API_URL = 'https://front-school-strapi.ktsdev.ru/api/recipes';

export const api = axios.create({
  baseURL: API_URL,
  paramsSerializer: (params) => qs.stringify(params, { encodeValuesOnly: true }),
});

export const apiRoutes = {
  recipes: {
    getAll: '/',
    getById: (id: string) => `/${id}`,
  },
};
