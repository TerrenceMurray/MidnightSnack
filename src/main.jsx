import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
// import AuthProvider from './providers/AuthProvider';
// import { router } from './routes';
import { RouterProvider } from 'react-router-dom';

import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/Home';
import Restaurant from '@/pages/Restaurant';
import RestaurantSettings from '@/pages/settings/Restaurant';
import Restaurants from '@/pages/Restaurants';
import Error from '@/pages/Error';
import Root from '@/Root';
import Cart from '@/pages/Cart';
import Settings from '@/pages/layouts/SettingsLayout';
import Profile from '@/pages/settings/Profile';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Categories from '@/pages/settings/Categories';
import MenuItems from '@/pages/settings/MenuItems';

import RestaurantsLoader from '@/loaders/restaurants.loader.js';
import RestaurantLoader from '@/loaders/restaurant.loader.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                index: true,
                element: <Home />,
            },
            {
                path: 'restaurants',
                element: <Restaurants />,
                loader: RestaurantsLoader,
            },
            {
                path: 'restaurants/:id',
                element: <Restaurant />,
                loader: RestaurantLoader,
            },
            {
                path: 'cart',
                element: <Cart />,
            },
            {
                path: 'signin',
                element: <SignIn />,
            },
            {
                path: 'signup',
                element: <SignUp />,
            },
            {
                path: '/settings',
                element: <Settings />,
                
                children: [
                    {
                        path: 'profile',
                        element: <Profile />,
                    },
                    {
                        path: 'restaurant',
                        element: <RestaurantSettings />,
                    },
                    {
                        path: 'categories',
                        element: <Categories />,
                    },
                    {
                        path: 'menu-items',
                        element: <MenuItems />,
                    },
                ],
            },
        ],
    },
]);



ReactDOM.createRoot(document.getElementById('root')).render(

    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
