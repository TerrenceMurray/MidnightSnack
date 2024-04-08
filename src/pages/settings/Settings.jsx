import { Outlet } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';

export default function Settings ()
{
    return (
        <AuthLayout>
            <Outlet />
        </AuthLayout>
    );
}
