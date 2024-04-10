// import { useState } from 'react';
import CartQuantity from './CartQuantity';
import { Button } from '@/components/ui/button';

export default function CartOrder ({ key, order, onRemove, onIncrement, onDecrement })
{

    return (
        <li key={key} className='flex flex-col gap-4'>
            <div className='flex justify-between w-full'>
                <div className='flex gap-2'>
                    <Button onClick={() => onRemove(order.item.id)} variant="ghost" className="hover:bg-red-50 hover:text-red-600 h-6 w-6 rounded-sm p-0 text-secondary" size="sm"><i className="bi bi-x-lg items-center"></i></Button> <span className='truncate w-28 inline-block'>{order.item.title}</span>
                </div>
                <CartQuantity onIncrement={() => { onIncrement(order.item); }} onDecrement={() => { onDecrement(order.item.id['item']) }} quantity={order.quantity} />
            </div>
            <p className='ml-auto'>${order.item.price}</p>
        </li>
    );
}
