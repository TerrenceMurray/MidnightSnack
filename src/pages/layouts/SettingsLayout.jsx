import { Outlet } from 'react-router-dom';
import ProtectedLayout from '@/pages/layouts/ProtectedLayout';

export default function Settings ()
{

    return (
        <ProtectedLayout>
            <Outlet />
        </ProtectedLayout>
    );
}
