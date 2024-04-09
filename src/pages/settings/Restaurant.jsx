export default function Restaurant ()
{
    const onSubmit = (d) =>
    {
        console.log(JSON.stringify(d));
    };

    return (
        <>
            <section className="flex flex-col gap-1 mb-8">
                <section className="flex flex-col gap-1">
                    <h1 className="title">Restaurant</h1>
                    <h2 className="subtitle">Update your restaurant settings</h2>
                </section>
            </section>
            <section>
                <form className="grid grid-cols-2" onSubmit={onSubmit}>
                    
                </form>
            </section>
        </>
    );
}
