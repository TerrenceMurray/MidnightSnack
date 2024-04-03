import Title from "../components/Title";
import Layout from "./Layout";
import HeroImage from "@/assets/Hero Image.png";

export default function Home ()
{
    Title("Midnight Snacks");

    return (
        <Layout>
            <main className="px-32 flex w-full flex-1 items-center">
                <img className="ml-auto" src={HeroImage} alt="Home" />

            </main>
        </Layout>
    );
}
