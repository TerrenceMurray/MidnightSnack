import { Button } from "./ui/button";
import useCart from "@/hooks/useCart";
import { useShallow } from 'zustand/react/shallow'

export default function CartButton (props)
{
    const { items } = useCart(
        useShallow((state) => ({ items: state.items }))
    );

    return (
        <Button className="text-primary bg-transparent text-xl">
            <i className="bi bi-cart"></i>
            <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground w-5 h-5 rounded-full flex items-center justify-center">
                {items.length}
            </span>
        </Button>
    );
}
