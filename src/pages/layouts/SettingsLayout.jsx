import { Outlet } from 'react-router-dom';
// import ProtectedLayout from '@/pages/layouts/ProtectedLayout';
import Sidebar from '@/components/shared/Sidebar';

export default function Settings ()
{

    return (
            <div className='flex gap-12 w-full'>
                <Sidebar />
                <main className='flex-1 w-full pb-12'>
                    <Outlet />
                </main>
            </div>
    );
}
