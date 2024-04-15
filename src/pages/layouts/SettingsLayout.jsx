import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/shared/Sidebar';
import ProtectedLayout from './ProtectedLayout';
import SettingsContextProvider from '@/context/settingsContext';


export default function Settings ()
{
    return (
        <SettingsContextProvider>
            <ProtectedLayout>
                <div className='flex gap-12 w-full'>
                    <Sidebar />
                    <main className='flex-1 w-full pb-12'>
                        <Outlet />
                    </main>
                </div>
            </ProtectedLayout>
        </SettingsContextProvider>
    );
}
