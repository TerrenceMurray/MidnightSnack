import { Navigate } from 'react-router-dom';
import { SessionContext } from '@/context/sessionContext';
import { useContext } from 'react';

export default function ProtectedLayout ({ children })
{
    const { session, isLoading } = useContext(SessionContext);

    if (!isLoading && session === null)
        return <Navigate to="/signin" replace />;
    else if (!isLoading && session !== null)
        return <>{children}</>;
}
