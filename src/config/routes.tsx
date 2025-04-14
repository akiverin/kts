import { RouteObject } from 'react-router';
import App from '../App';
import Foods from '../pages/Foods';
import Food from '../pages/Food';
import CategoriesList from '../pages/CategoriesList';
import FavoritesList from '../pages/FavoritesList';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Foods />,
      },
      {
        path: '/foods',
        element: <Foods />,
      },
      {
        path: '/foods/:documentId',
        element: <Food />,
      },
      {
        path: '/categories',
        element: <CategoriesList />,
      },
      {
        path: '/favorites',
        element: <FavoritesList />,
      },
    ],
  },
];
