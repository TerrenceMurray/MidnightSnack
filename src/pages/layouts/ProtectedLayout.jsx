import { Navigate } from 'react-router-dom';
import { SessionContext } from '@/context/sessionContext';
import { useContext } from 'react';

export default function ProtectedLayout ({ children })
{
    const session = useContext(SessionContext);

    if (session === null)
        return <Navigate to="/signin" />;

    return <>{children}</>;

}
