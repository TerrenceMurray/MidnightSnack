import AddressInput from "@/components/AddressInput";
import CartComponent from "@/components/shared/Cart";
import CartOrder from "@/components/shared/CartOrder";
import { Button } from "@/components/ui/button";
import { Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useState } from "react";
import ProtectedLayout from "./layouts/ProtectedLayout";

export default function Cart ()
{
    const [position, setPosition] = useState({ lat: 10.6549, lng: -61.5019 });
    // const map = useMap();

    // useEffect(() =>
    // {
    //     if (!map) return;

    // }, [map]);

    return (
        <ProtectedLayout>
            <main className="flex gap-10 justify-center w-full h-full pb-12">
                <section>
                    <section className="flex flex-col gap-1">
                        <h1 className="title">Checkout</h1>
                        <h2 className="subtitle">Confirm your information to proceed with checkout</h2>
                    </section>
                    <section className="flex flex-col mt-12 gap-8">
                        <AddressInput className="w-full" />
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
                        <Button variant="cta" className="w-full py-8">Place Order</Button>
                    </section>
                </section>
                <section className="w-80">
                    <CartComponent className="w-full">
                        <CartOrder quantity={2} />
                        <CartOrder quantity={2} />
                    </CartComponent>
                </section>
            </main>
        </ProtectedLayout>
    );
}
