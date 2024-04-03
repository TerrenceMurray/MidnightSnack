import Title from "../components/Title";
import Layout from "./Layout";
import HeroImage from "@/assets/Hero Image.png";
import Arrow from "@/assets/arrow.svg";

export default function Home ()
{
    Title("Midnight Snacks");

    return (
        <Layout>
            <main className="px-32 flex w-full flex-1 items-center">
                <section className="w-[29rem]">
                    <h1 className="heading relative">
                        Order Your <br />
                        Favourite Foods <br />
                        & Fast Delivery
                        <img src={Arrow} className="absolute -right-[30%] -top-5 w-60" alt="" />
                        <span className="block absolute bg-accent-surface w-1/2 h-[1.3rem] -z-50 bottom-3 right-9"></span>
                    </h1>
                    <p className="subtitle mt-6 w-11/12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam  ipsum risus, ac porta sapien congue a.</p>
                </section>
                <img className="ml-auto w-[50%]" src={HeroImage} alt="Home" />
            </main>
        </Layout>
    );
}
