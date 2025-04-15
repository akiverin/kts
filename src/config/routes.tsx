import { RouteObject } from 'react-router';
import App from '../App';
import Foods from '../pages/Foods';
import Food from '../pages/Food';
import CategoriesList from '../pages/CategoriesList';
import FavoritesList from '../pages/FavoritesList';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import Profile from '../pages/Profile';

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
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegistrationPage />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
];
