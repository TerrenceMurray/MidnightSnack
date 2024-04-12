import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Title from "@/components/Title";
import { supabase } from "@/client/supabase";
import { useState } from "react";

export default function SignIn ()
{
    Title("Midnight Snack - Sign In");
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isDirty },
    } = useForm({
        defaultValues: {
            fname: "",
            lname: "",
            email: "",
            phone: "",
            password: "",
            cpassword: "",
        },
    });

    const onSubmit = async (formData) =>
    {
        try
        {
            // const { data, error } = await supabase.auth.signUp({
            //     email: formData.email,
            //     password: formData.password,
            //     phone: formData.phone,
            //     options: {
            //         data: {
            //             fname: formData.fname,
            //             lname: formData.lname,
            //         },
            //     },
            // });

            if (error)
            {
                setError(error.message);
                return;
            }
        } catch (error)
        {
            console.error(error);
        }
    };

    return (
        <main className="w-full flex justify-center pb-12">
            <aside className="flex-col mt-7 w-5/12 flex">
                <section className="pb-8">
                    <h1 className="title text-center">Sign into your account</h1>
                    <h2 className="subtitle text-center">Please fill all of the fields below.</h2>
                </section>
                <div className="items-center justify-center">
                    <form className="flex flex-col w-full gap-4" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        {error && <span className="text-destructive-foreground py-4 px-8 bg-destructive text-sm rounded-lg">An error has occurred: {error}</span>}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm">Email Address</label>
                            <Input
                                id="email"
                                placeholder="Email Address"
                                type="email"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "This field is required.",
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Email address is not valid.",
                                    },
                                })}
                                className="bg-foreground placeholder:text-secondary p-6"
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="password" className="text-sm">Password</label>
                            <Input
                                id="password"
                                placeholder="Password"
                                type="password"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "This field is required.",
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Must be at least 6 characters long.",
                                    },
                                })}
                                className="bg-foreground placeholder:text-secondary p-6"
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>
                        <Button disabled={!isDirty} variant="cta" size="lg" className="mt-6 py-6" type="submit">Sign In</Button>
                    </form>
                </div>
                <Link to="/signup" className="text-center text-primary underline text-sm mt-4 hover:text-secondary">
                    Don't have an account? Sign up here
                </Link>
            </aside>
        </main>
    );
}
