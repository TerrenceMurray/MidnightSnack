import Title from "../components/Title";
import HeroImage from "@/assets/Hero Image.png";
import AddressInput from "@/components/AddressInput";
import { Button } from "@/components/ui/button";
import HomeTitle from "@/components/ui/title";
import { useRef } from "react";

export default function Home ()
{
    Title("Midnight Snacks");
    const searchInput = useRef(null);

    const onClickHandler = () =>
    {
        // Click handler
    };

    const onChangeHandler = () =>
    {
        // Input onChange handler
    };

    return (
        <main className="flex w-full flex-1 justify-between items-center">
            <section className="">
                <HomeTitle />
                <p className="subtitle mt-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam  ipsum risus, ac porta sapien congue a.</p>
                <div className="flex gap-4 items-center mt-10">
                    <AddressInput className="max-w-96" ref={searchInput} onChange={onChangeHandler} />
                    <Button onClick={onClickHandler} variant="cta" className="flex-1 py-4 h-auto flex gap-4"><i className="bi bi-search"></i> Search</Button>
                </div>
            </section>
            <img className="" src={HeroImage} alt="Home" />
        </main>
    );
}
