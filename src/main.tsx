import { routesConfig } from './config/routesConfig';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router';
import './index.scss';

const router = createHashRouter(routesConfig);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);

root.render(<RouterProvider router={router} />);
