import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import CartButton from "../CartButton";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/client/supabase";
import UserInformation from "@/classes/UserInformation";


export default function Navbar ()
{
    const [user, setUser] = useState(null);

    useEffect(() =>
    {
        supabase.auth.getUser().then(({ data: { user } }) =>
        {
            setUser(user);
        });

        supabase.auth.onAuthStateChange((_event, session) =>
        {
            setUser(session?.user ?? null);
        });
    }, []);

    const isActiveLink = ({ isActive }) => cn(
        "hover:text-accent hover:opacity-100 transition-all ease-in-out",
        {
            "text-primary": isActive,
            "opacity-50": !isActive
        });

    return (
        <nav className="flex w-full items-center h-24 gap-8">
            <div className="flex gap-10 items-center">
                <NavLink to="/">
                    <img src={logo} aria-label="Go to home page" alt="Midnight Snack Logo" />
                </NavLink>
                <div className="relative">
                    <Input className="w-52 bg-foreground placeholder:text-secondary pr-10" type="text" placeholder="Search for restaurants" />
                    <i className="bi bi-search absolute top-1/2 -translate-y-1/2 right-4 text-xs text-secondary
                    "></i>
                </div>
            </div>
            <ul className="flex ml-auto items-center gap-8">
                <li><NavLink aria-label="Go to home page" className={isActiveLink} to="/">Home</NavLink></li>
                <li><NavLink aria-label="Go to restaurants page" className={isActiveLink} to="/restaurants">Restaurants</NavLink></li>
            </ul>
            <div className="flex gap-6 items-center">
                <CartButton />
                {/* TODO Add user id to settings profile */}

                {user === null ?
                    <Link className="hover:text-secondary" to="/signin">Sign In</Link>
                    :
                    <NavLink to="/settings/profile">
                        <Avatar className="rounded-lg">
                            <AvatarFallback className="text-secondary bg-foreground rounded-lg">
                                {UserInformation.getInitials(user.user_metadata.fname, user.user_metadata.lname)}
                            </AvatarFallback>
                        </Avatar>
                    </NavLink>
                }
            </div>
        </nav>
    );
}
