import { Link } from 'react-router-dom';
import Image from "@/assets/pexels-fahri-baghirov-15592082.jpg";
import Restaurant from '@/classes/Restaurant';
import { cn } from '@/lib/utils';

export default function RestaurantCard ({ restaurant })
{
    return (
        <article className='border rounded-lg border-foreground w-[21.375rem] hover:opacity-75 transition-opacity duration-75'>
            <Link to={`/restaurants/${restaurant.id}`}>
                {/* TODO: Add image url */}
                <img className="rounded-t-lg w-full h-36 object-cover object-center" src={Image} alt="restaurant image" />
                <div className='p-8 flex gap-4 flex-col'>
                    <div className='flex items-center gap-2'>
                        <h1 className='font-semibold'>{restaurant.name}</h1>
                        <h2 className='text-secondary text-sm'><i className="bi bi-geo-alt-fill mr-1"></i>{restaurant.city}</h2>
                    </div>
                    <div className="flex items-center">
                        <div className='text-sm text-secondary'>
                            <i className="bi bi-clock mr-2"></i>
                            Opening Hours
                        </div>
                        <span className={cn('ml-2 text-sm block text-button-text bg-accent-surface px-2 py-1 rounded-full', {
                            "bg-red-500": Restaurant.isOpen(restaurant.opens_at, restaurant.closes_at),
                        })}>
                            {Restaurant.openingHours(restaurant.opens_at, restaurant.closes_at)}
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}
