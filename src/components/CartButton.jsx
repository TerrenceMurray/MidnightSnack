import { Button } from "./ui/button";
import useCart from "@/hooks/useCart";
import { Link } from "react-router-dom";

export default function CartButton ()
{
    const { orders } = useCart();

    return (
        <Link to="/cart">
            <Button className="text-primary bg-transparent text-xl relative hover:opacity-60 transition-opacity duration-75">
                <i className="bi bi-cart3"></i>
                <span className="absolute top-0 right-0 bg-accent text-accent-foreground aspect-square w-5 text-xs text-button-text rounded-sm flex items-center justify-center">
                    {orders.length > 99 ? "99+" : orders.length}
                </span>
            </Button>
        </Link>
    );
}
