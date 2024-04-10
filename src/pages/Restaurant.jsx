import Title from "@/components/Title";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLoaderData } from "react-router-dom";
import MenuItem from "@/components/MenuItem";
import Cart from "@/components/shared/Cart";
import CartOrder from "@/components/shared/CartOrder";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function Restaurant ()
{
    const { restaurant, categories } = useLoaderData();
    const [filter, setFilter] = useState("all");

    const onFilterClick = (filter) =>
    {
        setFilter(filter);
    };

    const isActive = (id) => id === filter;

    Title("Midnight Snacks - Sushi House");

    return (
        <main className="layout gap-x-8">
            <section className="flex gap-12 flex-col h-full row-span-full">
                <section className="flex flex-col gap-1">
                    <div className="items-center">
                        <h1 className="title inline"><Link className="hover:opacity-60 transition-opacity mr-2" to="/restaurants"><i className="bi bi-arrow-left"></i></Link> {restaurant.name}</h1>
                        <h3 className="inline mx-4"><i className="bi bi-geo-alt-fill text-secondary"></i> {restaurant.city}</h3>
                    </div>
                    <h2 className="subtitle">Add menu items to your cart</h2>
                </section>

                <div className="flex flex-col gap-8 col-end-1">
                    <ul className="flex gap-4 flex-wrap">
                        <li>
                            <Button variant="ghost" className={cn(
                                "px-4 p-4 hover:opacity-75 transition-opacity duration-75",
                                {
                                    "bg-primary text-button-text hover:bg-primary": isActive("all"),
                                    "bg-foreground hover:bg-foreground hover:text-secondary": !isActive("all"),
                                }
                            )} onClick={() => onFilterClick("all")}>All</Button>
                        </li>
                        {
                            categories.map(category => (
                                <li key={category.id}>
                                    <Button variant="ghost" className={cn(
                                        "px-4 p-4 hover:opacity-75 transition-opacity duration-75",
                                        {
                                            "bg-primary text-button-text hover:bg-primary": isActive(category.id),
                                            "bg-foreground hover:bg-foreground hover:text-secondary": !isActive(category.id),
                                        }
                                    )} onClick={() => onFilterClick(category.id)}>{category.name}</Button>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <ScrollArea className="flex-1">
                    <section className="flex flex-wrap gap-11">
                        <MenuItem />
                        <MenuItem />
                        <MenuItem />
                        <MenuItem />
                        <MenuItem />
                    </section>
                </ScrollArea>
            </section>
            <section className="flex flex-col col-start-2 h-full row-span-full pb-12">
                <Cart>
                    <CartOrder quantity={2} />
                    <CartOrder quantity={2} />
                </Cart>
                <Link className="mt-auto bg-accent-surface text-center text-button-text py-4 rounded-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:opacity-60 transition-opacity duration-75" to="/cart">Continue</Link>
            </section>
        </main>
    );
}
