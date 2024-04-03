import { Input } from "@/components/ui/input";
import Title from "../components/Title";
import RestaurantCard from "@/components/RestaurantCard";

export default function Restaurants ()
{
    Title("Restaurants | Midnight Snacks");

    return (
        <main className="flex flex-col gap-12">
            <section className="flex flex-col gap-1">
                <h1 className="title">Open Restaurants</h1>
                <h2 className="subtitle">Select a restaurant from below</h2>
            </section>
            <section className="pb-10">
                <div className="relative w-80">
                    <Input type="text" className="w-full py-4 px-8 h-auto bg-foreground placeholder:text-secondary" placeholder="Search for a nearby restaurant" />
                    <i className="bi bi-search absolute top-1/2 -translate-y-1/2 right-8 text-secondary text-sm"></i>
                </div>
                <section className="mt-8 grid grid-cols-3 justify-between gap-8">
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                </section>
            </section>
        </main>
    );
}
