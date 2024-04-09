import { useContext } from 'react';
import { AuthContext } from '../providers/context/AuthContext';


export const useAuth = () =>
{
    return useContext(AuthContext);
};
