import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Sidebar ()
{
    const isActiveLink = ({ isActive }) => cn(
        "px-8 py-4 rounded-lg transition-all ease-in-out",
        {
            "text-primary hover:opacity-90 bg-primary text-button-text": isActive,
            "text-secondary hover:bg-foreground": !isActive
        });

    return (
        <aside className="w-60">
            <nav className="w-full flex flex-col gap-4">
                <NavLink to='profile' className={isActiveLink}>Profile</NavLink>
                <NavLink to='restaurant' className={isActiveLink}>Restaurant</NavLink>
                <NavLink to='categories' className={isActiveLink}>Categories</NavLink>
                <NavLink to='menu-items' className={isActiveLink}>Menu Items</NavLink>
            </nav>
        </aside>
    );
}
