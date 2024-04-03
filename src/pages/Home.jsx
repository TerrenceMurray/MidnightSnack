import Title from "../components/Title";
import Layout from "./Layout";
import HeroImage from "@/assets/Hero Image.png";
import Arrow from "@/assets/arrow.svg";
import TitleSVG from "@/assets/title.svg";

export default function Home ()
{
    Title("Midnight Snacks");

    return (
        <Layout>
            <main className="px-32 flex w-full flex-1 items-center">
                <section className="inline">
                    <h1>
                        <img className="flex-1 h-auto w-auto max-w-full" src={TitleSVG} aria-label="" alt="Hero section title" />
                    </h1>
                    <p className="subtitle mt-6 w-[75%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam  ipsum risus, ac porta sapien congue a.</p>
                </section>
                <img className="flex-1 h-full w-auto max-w-full" src={HeroImage} alt="Home" />
            </main>
        </Layout>
    );
}
