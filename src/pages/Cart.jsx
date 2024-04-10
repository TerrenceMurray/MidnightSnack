import AddressInput from "@/components/AddressInput";
import CartComponent from "@/components/shared/Cart";
import CartOrder from "@/components/shared/CartOrder";
import { Button } from "@/components/ui/button";
import { Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useState } from "react";
import ProtectedLayout from "./layouts/ProtectedLayout";
import useCart from "@/hooks/useCart";
import { cn } from "@/lib/utils";

export default function Cart ()
{
    const [position, setPosition] = useState({ lat: 10.6549, lng: -61.5019 });
    const { orders, addItem: addToCart, removeItem: removeFromCart, reduceOrderQuantity, getTotal } = useCart();

    return (
        <ProtectedLayout>
            <main className="flex gap-10 justify-center w-full h-full pb-12 max-h-screen">
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
