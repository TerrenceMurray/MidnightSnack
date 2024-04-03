import Title from "../components/Title";
import HeroImage from "@/assets/Hero Image.png";
import TitleSVG from "@/assets/title.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home ()
{
    Title("Midnight Snacks");

    return (
        <main className="flex w-full flex-1 justify-between items-center   ">
            <section className="">
                <img className="" src={TitleSVG} aria-label="" alt="Hero section title" />
                <p className="subtitle mt-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam  ipsum risus, ac porta sapien congue a.</p>
                <div className="flex gap-4 items-center mt-8">
                    <Input className="w-96" type="text" placeholder="Search for restaurants..." />
                    <Button> <i className="bi bi-search"></i> Search</Button>
                </div>
            </section>
            <img className="" src={HeroImage} alt="Home" />
        </main>
    );
}
