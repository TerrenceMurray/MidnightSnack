import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import CartButton from "./CartButton";

export default function Navbar ()
{
    return (
        <nav className="flex w-full items-center py-7 px-32 gap-8">
            <div className="flex gap-10 items-center">
                <Link to="/">
                    <img src={logo} aria-label="Go to home page" alt="Midnight Snack Logo" />
                </Link>
                <Input className="w-52 bg-foreground placeholder:text-secondary" type="text" placeholder="Search..." />
            </div>
            <ul className="flex ml-auto items-center gap-4">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/restaurants">Restaurants</Link></li>
            </ul>
            <div className="flex gap-6">
                <CartButton />
                <Link to="/settings/profile">
                    <Avatar className="rounded-lg">
                        <AvatarFallback className="text-secondary bg-foreground rounded-lg">
                            TM
                        </AvatarFallback>
                    </Avatar>
                </Link>
            </div>
        </nav>
    );
}
