import axios from 'axios';
import qs from 'qs';

export const API_BASE_URL = 'https://front-school-strapi.ktsdev.ru/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  paramsSerializer: (params) =>
    qs.stringify(params, {
      encodeValuesOnly: true,
      arrayFormat: 'brackets',
    }),
});

export const apiRoutes = {
  recipes: {
    getAll: '/recipes',
    getById: (id: string) => `/recipes/${id}`,
  },
  categories: {
    getAll: '/meal-categories',
  },
  users: {
    auth: '/auth/local',
    register: '/auth/local/register',
  },
};
