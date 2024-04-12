import { Outlet } from "react-router-dom";
import Layout from "./pages/layouts/RootLayout";
import { APIProvider } from "@vis.gl/react-google-maps";
import { SessionContext } from "./context/sessionContext";
import { useState, useEffect } from "react";
import { supabase } from "./client/supabase";
import { Toaster } from "./components/ui/toaster";

export default function Root ()
{
    const [session, setSession] = useState(null);

    useEffect(() =>
    {
        supabase.auth.getSession().then(({ data: { session } }) =>
        {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) =>
        {
            setSession(session);
        });
    }, []);

    return (
        <Layout>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <SessionContext.Provider value={session}>
                    <Outlet />
                </SessionContext.Provider>
            </APIProvider>
            <Toaster />
        </Layout>
    );
}
