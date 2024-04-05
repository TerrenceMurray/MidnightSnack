import React, { useState } from 'react';
import CartQuantity from './CartQuantity';
import { Button } from '@/components/ui/button';

export default function CartOrder ({ key, quantity: amount })
{
    const [quantity, setQuantity] = useState(amount);
    return (
        <li key={key} className='flex flex-col gap-4'>
            <div className='flex justify-between w-full'>
                
                <div className='flex gap-2'><Button variant="ghost" className="hover:bg-red-50 hover:text-red-600 h-6 w-6 rounded-sm p-0 text-secondary" size="sm"><i className="bi bi-x-lg items-center"></i></Button> <span className='truncate w-36 inline-block'>Nigiri Sushi</span></div>
                <CartQuantity quantity={quantity} />
            </div>
            <p className='ml-auto'>$10.00</p>
        </li>
    );
}
