import React, { useState } from 'react';
import CartQuantity from './CartQuantity';
import Cart from './Cart';

export default function CartOrder ({ key, quantity: amount })
{
    const [quantity, setQuantity] = useState(amount);
    return (
        <li key={key} className='flex flex-col gap-4'>
            <div className='flex justify-between w-full'>
                <p>Nigiri Sushi</p>
                <CartQuantity quantity={quantity} />
            </div>
            <p className='ml-auto'>$10.00</p>
        </li>
    );
}
