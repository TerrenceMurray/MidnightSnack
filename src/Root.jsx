import { Outlet } from "react-router-dom";
import Layout from "./pages/Layout";

export default function Root ()
{
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
}
