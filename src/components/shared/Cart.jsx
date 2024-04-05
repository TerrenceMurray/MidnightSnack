import { cn } from '@/lib/utils';
import React from 'react';
import { ScrollArea } from '@/ui/scroll-area';

export default function Cart ({ children, className })
{
    return (
        <section className={cn('w-64 flex-1 h-full overflow-hidden flex flex-col', className)}>
            <h1 className='text-2xl font-bold flex-shrink-0'>Your Items</h1>
            <ScrollArea>
                <ul className='mt-8 flex flex-col flex-1 h-full overflow-y-auto gap-6 pb-8'>
                    {children}
                </ul>
            </ScrollArea>
            <section className='flex flex-col py-6 gap-6 font-semibold border-t border-t-foreground mt-auto'>
                <div className='flex justify-between'>
                    <p>Shipping</p>
                    <p>$50.00</p>
                </div>
                <div className='flex justify-between'>
                    <p>Total</p>
                    <p>$422.00</p>
                </div>
            </section>
        </section>
    );
}
