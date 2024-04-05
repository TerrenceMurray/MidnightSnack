import { Button } from "./ui/button";
import useCart from "@/hooks/useCart";
import { Link } from "react-router-dom";
import { useShallow } from 'zustand/react/shallow';

export default function CartButton (props)
{
    const { items } = useCart(
        useShallow((state) => ({ items: state.items }))
    );

    return (
        <Link to="/cart">
            <Button className="text-primary bg-transparent text-xl relative hover:opacity-60 transition-opacity duration-75">
                <i className="bi bi-cart3"></i>
                <span className="absolute top-0 right-0 bg-accent text-accent-foreground aspect-square w-5 text-xs text-button-text rounded-sm flex items-center justify-center">
                    {items.length > 99 ? "99+" : items.length}
                </span>
            </Button>
        </Link>
    );
}
