import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function ProtectedLayout ({ children })
{
    const { user } = useAuth();
    console.log("User: ", user);

    if (!user)
        return <Navigate to="/signin" replace />;

    return (
        <>{children}</>
    );
}
