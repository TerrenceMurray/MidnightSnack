import { Outlet } from "react-router-dom";
import Layout from "./pages/layouts/Layout";
import { APIProvider } from "@vis.gl/react-google-maps";

export default function Root ()
{
    return (
        <Layout>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <Outlet />
            </APIProvider>
        </Layout>
    );
}
