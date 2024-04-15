import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Children } from 'react';

export default function Cart ({ children, className, total = 0 })
{
    return (
        <section className={cn('w-64 flex-1 h-full overflow-hidden flex flex-col', className)}>
            <h1 className='text-2xl font-bold flex-shrink-0'>Your Items</h1>
            <ScrollArea>
                <ul className='mt-8 flex flex-col flex-1 h-full max-h-96 gap-6 p-1 pb-8'>
                    {Children.count(children) === 0 ? <p className="text-secondary text-center">Your cart is empty</p> : children}
                </ul>
            </ScrollArea>
            <section className='flex flex-col pt-6 gap-6 font-semibold border-t border-t-foreground mt-auto'>
                <div className='flex justify-between'>
                    <p>Delivery</p>
                    <p>$50.00</p>
                </div>
                <div className='flex justify-between'>
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                </div>
            </section>
        </section>
    );
}
