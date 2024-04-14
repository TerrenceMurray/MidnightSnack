export default function SettingsSkeleton ({ children, isLoading })
{
    if (!isLoading)
        return children;

    return (
        <>
            <section>
                <span className="block text-secondary h-80 bg-foreground text-sm rounded-lg animate-pulse"></span>
            </section>
        </>
    );
}
