import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Restaurant from './pages/Restaurant';
import Restaurants from './pages/Restaurants';
import Error from './pages/Error';
import Root from './Root';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/restaurants',
                element: <Restaurants />,
            },
            {
                path: '/restaurants/:id',
                element: <Restaurant />,
            }
        ]
    },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
