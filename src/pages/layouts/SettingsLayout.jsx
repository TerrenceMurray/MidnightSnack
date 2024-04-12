import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/shared/Sidebar';
import ProtectedLayout from './ProtectedLayout';

export default function Settings ()
{
    return (
        <ProtectedLayout>
            <div className='flex gap-12 w-full'>
                <Sidebar />
                <main className='flex-1 w-full pb-12'>
                    <Outlet />
                </main>
            </div>
        </ProtectedLayout>
    );
}
