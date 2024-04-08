import Navbar from "../../components/shared/Navbar";

export default function Layout ({ children })
{
    return (
        <>
            <header>
                <Navbar />
            </header>
            {children}
        </>
    );
}
