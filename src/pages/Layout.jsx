import { Link } from "react-router-dom";

export default function Layout ({ children })
{
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/restaurants">Restaurants</Link></li>
                    </ul>
                </nav>
            </header>
            <main>{children}</main>
        </>
    );
}
