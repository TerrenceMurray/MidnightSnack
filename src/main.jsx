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
import Cart from './pages/Cart';
import Settings from './pages/settings/Settings';
import Profile from './pages/settings/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                index: true,
                element: <Home />
            },
            {
                path: 'restaurants',
                element: <Restaurants />
            },
            {
                path: 'restaurants/:id',
                element: <Restaurant />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'signin',
                element: <SignIn />
            },
            {
                path: 'signup',
                element: <SignUp />
            },
            {
                path: 'settings',
                element: <Settings />,
                children: [
                    {
                        index: true,
                        element: <Profile />
                    },
                    {
                        path: 'profile',
                        element: <Profile />
                    },
                ]
            }
        ]
    },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
