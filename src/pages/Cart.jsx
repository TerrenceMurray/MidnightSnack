// import AddressInput from "@/components/AddressInput";
import CartComponent from "@/components/shared/Cart";
import CartOrder from "@/components/shared/CartOrder";
import { Button } from "@/components/ui/button";
import { Map, AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
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
} from "@/components/ui/command";
import
{
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";


async function getCities ()
{
    return await axios.get('/public/cities.json');
}

export default function Cart ()
{
    const [position, setPosition] = useState({ lat: 10.6549, lng: -61.5019 });
    const { orders, addItem: addToCart, removeItem: removeFromCart, reduceOrderQuantity, getTotal } = useCart();
    const [cities, setCities] = useState([]);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const map = useMap();

    Title(`Midnight Snacks - Cart`);

    const onPlaceOrder = () =>
    {
        if (value === "" || orders.length === 0) return;
        console.log(JSON.stringify({
            city: value,
            orders,
            location: position
        }));
    };

    useEffect(() =>
    {
        const fetchCity = async (cities, pos) =>
        {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`);
            const city = await Object.keys(cities).find(city =>
                response.data.results.find(result =>
                    result.formatted_address.includes(city)
                ));

            setValue(city);
        };

        getCities().then((response) =>
        {
            setCities(response.data);

            if ("geolocation" in navigator)
            {
                navigator.geolocation.getCurrentPosition(position =>
                {
                    const lngLat = { lng: position.coords.longitude, lat: position.coords.latitude };
                    setPosition(lngLat);
                    fetchCity(response.data, lngLat);
                    map?.setCenter(lngLat);
                });
            }
        });


    }, [map]);

    return (
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
                                    ? cities[value].city
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
                                            Object.entries(cities).map(([key, data]) =>
                                            {
                                                return (
                                                    <CommandItem key={key}
                                                        value={data.city}
                                                        onSelect={(currentValue) =>
                                                        {
                                                            setValue(currentValue === value ? "" : currentValue);
                                                            setOpen(false);
                                                            map.setCenter({ lat: parseFloat(cities[currentValue].lat), lng: parseFloat(cities[currentValue].lng) });
                                                            setPosition({ lat: parseFloat(cities[currentValue].lat), lng: parseFloat(cities[currentValue].lng) });
                                                        }}
                                                        className="text-primary aria-selected:bg-primary aria-selected:text-button-text hover:text-secondary"
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                {
                                                                    "opacity-100": value === cities[key].city,
                                                                    "opacity-0": value !== cities[key].city,
                                                                }
                                                            )}
                                                        />
                                                        {data.city}
                                                    </CommandItem>
                                                );

                                            })
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
                    <Button variant="cta" onClick={onPlaceOrder} className={cn("hover:opacity-75 transition-opacity duration-75 w-full py-8", {
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
    );
}
