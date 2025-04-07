import { RouteObject } from 'react-router';
import App from '../App';
import Foods from '../pages/Foods';
import Food from '../pages/Food';

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
    ],
  },
];
