import { Input } from "@/components/ui/input";
import Title from "../components/Title";
import RestaurantCard from "@/components/RestaurantCard";
import { useLoaderData } from "react-router-dom";
import filter from "lodash.filter";
import debounce from "lodash.debounce";
import { useEffect, useState, useRef } from "react";
import { useQuery } from "@/hooks/useQuery";


export default function Restaurants ()
{
    Title("Midnight Snacks - Restaurants");

    const { data } = useLoaderData();
    const query = useQuery();
    const param = query.get("search");

    const inputRef = useRef(null);

    const [restaurants, setRestaurants] = useState(data);

    const handleSearch = (e) =>
    {
        (debounce(() =>
        {
            history.pushState(null, "", `?search=${e.target.value}`);
            setRestaurants(filter(data, (restaurant) => restaurant.name.toLowerCase().includes(e.target.value.toLowerCase()) || restaurant.city.toLowerCase().includes(e.target.value.toLowerCase())));
        }, 150))();
    };

    useEffect(() =>
    {
        if (param === null || param.length === 0) return;
        
        inputRef.current.value = param;

        setRestaurants(filter(data, (restaurant) =>
            restaurant.name.toLowerCase().includes(param.toLowerCase()) || restaurant.city.toLowerCase().includes(param.toLowerCase())
        ));
    }, [data, param]);

    return (
        <main className="flex flex-col gap-12">
            <section className="flex flex-col gap-1">
                <h1 className="title">Open Restaurants</h1>
                <h2 className="subtitle">Select a restaurant from below</h2>
            </section>
            <section className="pb-10 w-full">
                <div className="relative w-80">
                    <Input ref={inputRef} type="text" className="w-full py-4 px-8 h-auto bg-foreground placeholder:text-secondary" onKeyUp={handleSearch} placeholder="Search for a restaurant or city" />
                    <i className="bi bi-search absolute top-1/2 -translate-y-1/2 right-8 text-secondary text-sm"></i>
                </div>
                <section className="mt-8 flex flex-wrap gap-8">
                    {restaurants.length === 0 ?
                        <span className="text-sm text-secondary">No restaurants found.</span>
                        :
                        restaurants.map(restaurant =>
                            <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
                </section>
            </section>
        </main>
    );
}
