import React from 'react';

export default function CartQuantity ({ onIncrement, onDecrement, quantity })
{
    return (
        <div aria-label='quantity input' className='flex items-center'>
            <button className='text-primary'><i className="bi bi-dash"></i></button>
            <span>{quantity}</span>
            <button className='text-primary'><i className="bi bi-plus"></i></button>
        </div>
    );
}
