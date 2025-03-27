import { RouteObject } from 'react-router';
import App from '../App';
import Foods from '../pages/Foods';
import TheFood from '../pages/TheFood';

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
        element: <TheFood />,
      },
    ],
  },
];
