import { AuthClient, createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

const supabase = createClient(import.meta.env.VITE_PUBLIC_SUPABASE_URL, import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY);

export default function AuthLayout ({ children })
{
    const [session, setSession] = useState(null);

    useEffect(() =>
    {
        supabase.auth.getSession().then(({ data: { session } }) =>
        {
            setSession(session);
        });

        const { data: {
            subscription
        } } = supabase.auth.onAuthStateChange((_event, session) =>
        {
            setSession(session);
        });

        return () => subscription.unsubscribe();

    }, []);

    return (
        <>
            {session ? <h1>Logged in</h1> : <h1>Not Logged in</h1>}
            {children}
        </>
    );
}
