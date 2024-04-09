import { Input } from "@/components/ui/input";
import Title from "../components/Title";
import RestaurantCard from "@/components/RestaurantCard";
import { useLoaderData } from "react-router-dom";
import filter from "lodash.filter";
import debounce from "lodash.debounce";
import { useState } from "react";

export default function Restaurants ()
{
    Title("Midnight Snacks - Restaurants");

    const data = useLoaderData();

    const [restaurants, setRestaurants] = useState(data);

    const handleSearch = (e) =>
    {
        (debounce(() =>
        {
            setRestaurants(filter(data, (restaurant) => restaurant.name.toLowerCase().includes(e.target.value.toLowerCase())));
        }, 200))();
    };

    return (
        <main className="flex flex-col gap-12">
            <section className="flex flex-col gap-1">
                <h1 className="title">Open Restaurants</h1>
                <h2 className="subtitle">Select a restaurant from below</h2>
            </section>
            <section className="pb-10 w-full">
                <div className="relative w-80">
                    <Input type="text" className="w-full py-4 px-8 h-auto bg-foreground placeholder:text-secondary" onKeyUp={handleSearch} placeholder="Search for a restaurant" />
                    <i className="bi bi-search absolute top-1/2 -translate-y-1/2 right-8 text-secondary text-sm"></i>
                </div>
                <section className="mt-8 flex flex-wrap gap-9">
                    {
                        restaurants.map(restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)
                    }
                </section>
            </section>
        </main>
    );
}
