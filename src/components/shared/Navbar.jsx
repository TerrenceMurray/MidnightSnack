import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import CartButton from "./CartButton";
import { cn } from "@/lib/utils";

export default function Navbar ()
{
    const isActiveLink = ({ isActive }) => cn(
        "hover:text-accent transition-colors duration-00 ease-in-out",
        {
            "text-primary": isActive,
            "opacity-50": !isActive
        });

    return (
        <nav className="flex w-full items-center py-7 gap-8">
            <div className="flex gap-10 items-center">
                <NavLink to="/">
                    <img src={logo} aria-label="Go to home page" alt="Midnight Snack Logo" />
                </NavLink>
                <Input className="w-52 bg-foreground placeholder:text-secondary" type="text" placeholder="Search..." />
            </div>
            <ul className="flex ml-auto items-center gap-8">
                <li><NavLink className={isActiveLink} to="/">Home</NavLink></li>
                <li><NavLink className={isActiveLink} to="/restaurants">Restaurants</NavLink></li>
            </ul>
            <div className="flex gap-6">
                <CartButton />
                <NavLink to="/settings/profile">
                    <Avatar className="rounded-lg">
                        <AvatarFallback className="text-secondary bg-foreground rounded-lg">
                            TM
                        </AvatarFallback>
                    </Avatar>
                </NavLink>
            </div>
        </nav>
    );
}
