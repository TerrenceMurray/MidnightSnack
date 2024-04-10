// import AddressInput from "@/components/AddressInput";
import CartComponent from "@/components/shared/Cart";
import CartOrder from "@/components/shared/CartOrder";
import { Button } from "@/components/ui/button";
import { Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useState } from "react";
import ProtectedLayout from "./layouts/ProtectedLayout";
import useCart from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import Title from "@/components/Title";
import { Check, ChevronsUpDown } from "lucide-react";
import
{
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command";
import
{
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const items = [
    {
        value: "Port of Spain",
        label: "Port of Spain",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
];

export default function Cart ()
{
    const [position, setPosition] = useState({ lat: 10.6549, lng: -61.5019 });
    const { orders, addItem: addToCart, removeItem: removeFromCart, reduceOrderQuantity, getTotal } = useCart();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    Title(`Midnight Snacks - Cart`);

    return (
        <ProtectedLayout>
            <main className="flex gap-10 justify-center w-full h-full pb-12 max-h-screen">
                <section>
                    <section className="flex flex-col gap-1">
                        <h1 className="title">Checkout</h1>
                        <h2 className="subtitle">Confirm your information to proceed with checkout</h2>
                    </section>
                    <section className="flex flex-col mt-12 gap-8">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full bg-foreground hover:bg-foreground hover:opacity-75 transition-opacity relative h-auto py-4 pl-14 justify-between "
                                >
                                    <i className="bi bi-geo-alt-fill absolute top-1/2 -translate-y-1/2 left-8 text-base text-secondary"></i>
                                    {value
                                        ? items.find((item) => item.value === value)?.label
                                        : "Select a city e.g. Port of Spain"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="">
                                <Command>
                                    <CommandInput placeholder="Search for a city..." />
                                    <CommandEmpty>No location found.</CommandEmpty>
                                    <CommandList>
                                        <CommandGroup>
                                            {
                                                items.map((item) =>

                                                    <CommandItem key={item.value}
                                                        value={item.value}
                                                        onSelect={(currentValue) =>
                                                        {
                                                            setValue(currentValue === value ? "" : currentValue);
                                                            setOpen(false);
                                                        }}
                                                        className="text-primary aria-selected:bg-foreground hover:text-secondary"
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                value === item.value ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {item.label}
                                                    </CommandItem>
                                                )
                                            }
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <Map
                            className="w-full min-h-72 h-full rounded-lg outline-none"
                            defaultCenter={position}
                            draggableCursor={'default'}
                            defaultZoom={16}
                            maxZoom={18}
                            minZoom={15}
                            disableDefaultUI={true}
                            mapId={'9bc9ff1eaedd66e'}
                            onClick={ev => setPosition(ev.detail.latLng)}
                        >
                            <AdvancedMarker position={position} draggable={true} >
                                <Pin />
                            </AdvancedMarker>
                        </Map>
                        <Button variant="cta" className={cn("hover:opacity-75 transition-opacity duration-75 w-full py-8", {
                            "cursor-not-allowed opacity-50 hover:opacity-50": orders.length === 0
                        })} size="lg" type="submit" role="update account">Place Order</Button>
                    </section>
                </section>
                <section className="w-80">
                    <CartComponent total={getTotal(orders)} className="w-full">
                        {orders.map((order, index) => <CartOrder onIncrement={addToCart} onDecrement={reduceOrderQuantity} onRemove={removeFromCart} key={index} order={order} />)}
                    </CartComponent>
                </section>
            </main>
        </ProtectedLayout>
    );
}
