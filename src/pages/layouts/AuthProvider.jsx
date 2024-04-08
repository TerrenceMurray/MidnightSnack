import Navbar from "../../components/shared/Navbar";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabase = createClient(import.meta.env.VITE_PUBLIC_SUPABASE_URL, import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY);

export default function Layout ({ children })
{
    const [session, setSession] = useState(null);

    useEffect(() =>
    {

    }, []);

    return (
        <>
            {children}
        </>
    );
}
