import Title from "../components/Title";
import HeroImage from "@/assets/Hero Image.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HomeTitle from "@/components/ui/title";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home ()
{
    Title("Midnight Snacks");
    const [error, setError] = useState(null);
    const [location, setLocation] = useState("");
    const navigate = useNavigate();

    const onClickHandler = () =>
    {
        // Click handler
        if (error || location === "")
        {
            setError("Field cannot be empty.");
            return;
        }

        navigate(`/restaurants?search=${location}`);
    };

    const onChangeHandler = (e) =>
    {
        // Input onChange handler
        if (e.key === "Enter")
        {
            onClickHandler();
            return;
        }

        let value = e.target.value;
        if (value.length === 0)
            setError("Field cannot be empty.");
        else
        {
            setError(null);
            setLocation(value);
        }
    };

    return (
        <main className="flex w-full flex-1 justify-between items-center">
            <section className="">
                <HomeTitle />
                <p className="subtitle mt-6">From craving to table, our app makes food ordering easy, quick, and delicious!</p>
                <div className="flex gap-4 items-center mt-10">
                    <div>
                        <div className="relative">
                            <Input onChange={onChangeHandler} onKeyDown={onChangeHandler} className="w-96 rounded-lg text-base placeholder:text-secondary bg-foreground h-auto py-4 pl-14" placeholder="Enter a city location e.g. Tunapuna" />
                            <i className="bi bi-geo-alt-fill absolute top-1/2 -translate-y-1/2 left-8 text-base text-secondary"></i>
                        </div>
                    </div>
                    <Button onClick={onClickHandler} variant="cta" className="flex-1 py-4 h-auto flex gap-4"><i className="bi bi-search"></i> Search</Button>
                </div>
                {error && <span className="text-destructive-foreground mt-2 text-sm">{error}</span>}
            </section>
            <img className="" src={HeroImage} alt="Home" />
        </main>
    );
}
