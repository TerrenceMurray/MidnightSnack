import React from 'react';
import Image from '@/assets/pexels-pixabay-357756.jpg';

export default function MenuItem ()
{
    return (
        <aside className='flex flex-col w-[15.125rem]'>
            <img className='h-52 object-cover rounded-lg' src={Image} alt="Smoked Salmon" />
            <section className='py-8 px-6'>
                <h1 className='text-md font-semibold'>Smoked Salmon</h1>
                <p className='text-sm text-secondary mt-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                <p className='text-md font-semibold mt-6'>TTD $ 150.67</p>
            </section>
        </aside>
    );
}
