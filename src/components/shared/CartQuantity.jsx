import { cn } from '@/lib/utils';
import React from 'react';

export default function CartQuantity ({ className, onIncrement, onDecrement, quantity })
{
    return (
        <div aria-label='quantity input' className={cn('flex items-center gap-2', className)}>
            <button onClick={onDecrement} aria-label='decrease quantity' className='text-secondary rounded-[0.25rem] w-6 aspect-square bg-foreground transition-colors duration-75 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-white-950 hover:text-button-text'><i className="bi bi-dash"></i></button>
            <span>{quantity}</span>
            <button onClick={onIncrement} aria-label='increase quantity' className='text-secondary rounded-[0.25rem] w-6 aspect-square bg-foreground transition-colors duration-75 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-white-950 hover:text-button-text'><i className="bi bi-plus"></i></button>
        </div>
    );
}
