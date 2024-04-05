import React from 'react';
import { Link } from 'react-router-dom';
import Image from "@/assets/pexels-fahri-baghirov-15592082.jpg";

export default function RestaurantCard ()
{
    return (
        <article className='border rounded-lg border-foreground w-[21.375rem]'>
            <Link to="/restaurants/1">
                <img className="rounded-t-lg w-full h-36 object-cover object-center" src={Image} alt="" />
                <div className='p-8 flex gap-4 flex-col'>
                    <div className='flex items-center gap-2'>
                        <h1 className='font-semibold'>Sushi House</h1>
                        <h2 className='text-secondary text-sm'><i className="bi bi-geo-alt-fill mr-1"></i>Tunapuna</h2>
                    </div>
                    <div className="flex items-center">
                        <div className='text-sm text-secondary'>
                            <i className="bi bi-clock mr-2"></i>
                            Opening Hours
                        </div>
                        <span className='ml-2 text-sm block text-button-text bg-accent-surface px-2 py-1 rounded-full'>
                            8 AM - 9 PM
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}
