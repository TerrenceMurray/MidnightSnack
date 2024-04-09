import { Outlet } from 'react-router-dom';
import ProtectedLayout from '@/pages/layouts/ProtectedLayout';
import Sidebar from '@/components/shared/Sidebar';

export default function Settings ()
{

    return (
        <ProtectedLayout>
            <div className='flex gap-12'>
                <Sidebar />
                <main>
                    <Outlet />
                </main>
            </div>
        </ProtectedLayout>
    );
}
