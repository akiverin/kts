import { RouteObject } from 'react-router';
import { Navigate } from 'react-router';
import App from '../App';
import Foods from '../pages/Foods';
import Food from '../pages/Food';
import CategoriesList from '../pages/CategoriesList';
import FavoritesList from '../pages/FavoritesList';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import Profile from '../pages/Profile';
import ProductsList from '../pages/ProductsList';
import { routes } from './routes';

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        path: routes.main.mask,
        element: <Foods />,
      },
      {
        path: routes.foods.mask,
        element: <Foods />,
      },
      {
        path: routes.food.mask,
        element: <Food />,
      },
      {
        path: routes.categories.mask,
        element: <CategoriesList />,
      },
      {
        path: routes.products.mask,
        element: <ProductsList />,
      },
      {
        path: routes.favorites.mask,
        element: <FavoritesList />,
      },
      {
        path: routes.login.mask,
        element: <LoginPage />,
      },
      {
        path: routes.register.mask,
        element: <RegistrationPage />,
      },
      {
        path: routes.profile.mask,
        element: <Profile />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routes.main.mask} replace />,
  },
];
