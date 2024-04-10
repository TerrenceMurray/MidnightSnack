import Image from '@/assets/pexels-pixabay-357756.jpg';

export default function MenuItem ({ onClick, item })
{
    return (
        <aside className='flex flex-col w-[15.125rem] cursor-pointer hover:opacity-60 duration-75 transition-opacity' onClick={onClick}>
            <img className='h-52 object-cover rounded-lg' src={Image} alt={item.title} />
            <section className='py-8 px-6'>
                <h1 className='text-md font-semibold'>{item.title}</h1>
                <p className='text-sm text-secondary mt-2 line-clamp-2'>{item.description}</p>
                <p className='text-md font-semibold mt-6'>TTD $ {item.price}</p>
            </section>
        </aside>
    );
}
