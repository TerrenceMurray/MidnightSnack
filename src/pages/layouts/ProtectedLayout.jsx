import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function ProtectedLayout ({ children })
{
    const { user } = useAuth();

    // if (!user)
    //     return <Navigate to="/signin" replace />;

    return (
        <>{children}</>
    );
}
