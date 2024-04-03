import Title from "../components/Title";
import Layout from "./Layout";
import HeroImage from "@/assets/Hero Image.png";

export default function Home ()
{
    Title("Midnight Snacks");

    return (
        <Layout>
            <img src={HeroImage} alt="Home" />
        </Layout>
    );
}
