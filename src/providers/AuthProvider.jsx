import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { AuthContext } from './context/AuthContext';

const supabase = createClient(import.meta.env.VITE_PUBLIC_SUPABASE_URL, import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY);

export default function AuthProvider ({ children })
{
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() =>
    {
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) =>
            {
                console.log('session onAuthStateChange: ', session);
                setSession(session);
                setUser(session?.user || null);
                setLoading(false);
            }
        );
        return () =>
        {
            listener?.subscription.unsubscribe();
        };
    }, []);

    // In case we want to manually trigger a signIn (instead of using Auth UI)
    const signIn = async () =>
    {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { skipBrowserRedirect: false },
        });
        console.log('data: ', data);
        console.log('error: ', error);
        return { data, error };
    };

    const signOut = async () =>
    {
        const { error } = await supabase.auth.signOut();
        console.log('error: ', error);
        if (!error)
        {
            setUser(null);
            setSession(null);
        }
        return { error };
    };

    return (
        <AuthContext.Provider value={{ user, session, isLoading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
