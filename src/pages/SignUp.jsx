import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Title from "@/components/Title";
import { supabase } from "@/client/supabase";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { SessionContext } from "@/context/sessionContext";

export default function SignUp ()
{
    Title("Midnight Snack - Sign Up");

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const session = useContext(SessionContext);
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

    if (session !== null)
        return <Navigate to="/" />;


    const onSubmit = async (formData) =>
    {
        try
        {
            setIsLoading(true);
            const { error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        fname: formData.fname,
                        lname: formData.lname,
                        phone: formData.phone,
                    },
                },
            });

            if (error)
                throw error;

            setIsLoading(false);

        } catch (error)
        {
            setIsLoading(false);
            setError(error.message || error.error_description);
        }
    };

    return (
        <main className="w-full flex justify-center pb-12">
            <aside className="flex-col mt-7 w-5/12 flex">
                <section className="pb-8">
                    <h1 className="title text-center">Create a new business account</h1>
                    <h2 className="subtitle text-center">Please fill all of the fields below.</h2>
                </section>
                <div className="items-center justify-center">
                    <form className="flex flex-col w-full gap-4" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        {error && <span className="text-destructive-foreground py-4 px-8 bg-destructive text-sm rounded-lg">An error has occurred: {error}</span>}
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="fname" className="text-sm">First Name</label>
                                <Input
                                    id="fname"
                                    placeholder="First Name e.g. Mark"
                                    type="text"
                                    {...register("fname", {
                                        required: {
                                            value: true,
                                            message: "This field is required.",
                                        },
                                        minLength: {
                                            value: 2,
                                            message: "Must be at least 2 characters long.",
                                        },
                                    })}
                                    className="bg-foreground placeholder:text-secondary p-6"
                                />
                                {errors.fname && <span className="text-red-500 text-sm">{errors.fname.message}</span>}
                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <label htmlFor="lname" className="text-sm">Last Name</label>
                                <Input
                                    id="lname"
                                    placeholder="Last Name e.g. Monroe"
                                    type="text"
                                    {...register("lname", {
                                        required: {
                                            value: true,
                                            message: "This field is required.",
                                        },
                                        minLength: {
                                            value: 2,
                                            message: "Must be at least 2 characters long.",
                                        },
                                    })}
                                    className="bg-foreground placeholder:text-secondary p-6"
                                />
                                {errors.lname && <span className="text-red-500 text-sm">{errors.lname.message}</span>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm">Email Address</label>
                            <Input
                                id="email"
                                placeholder="Email Address e.g. tj12@gmail.com"
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
                        <div className="flex flex-col gap-2">
                            <label htmlFor="phone" className="text-sm">Phone Number</label>
                            <Input
                                id="phone"
                                placeholder="Phone Number e.g +1 868 000 0000"
                                type="tel"
                                {...register("phone", {
                                    required: {
                                        value: true,
                                        message: "This field is required.",
                                    },
                                    pattern: {
                                        value: /^(?:\+?\d{1,3}[-. ]?)?\(?(?:\d{3})\)?[-. ]?\d{3}[-. ]?\d{4}$/,
                                        message: "Phone number is not valid.",
                                    },
                                })}
                                className="bg-foreground placeholder:text-secondary p-6"
                            />
                            {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                        </div>
                        <div className="flex gap-4">
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
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="cpassword" className="text-sm">Confirm Password</label>
                                <Input
                                    id="cpassword"
                                    placeholder="Confirm Password"
                                    type="password"
                                    {...register("cpassword", {
                                        required: {
                                            value: true,
                                            message: "This field is required.",
                                        },
                                        validate: (value) => value === getValues("password") || "Passwords do not match.",
                                    })}
                                    className="bg-foreground placeholder:text-secondary p-6"
                                />
                                {errors.cpassword && <span className="text-red-500 text-sm">{errors.cpassword.message}</span>}
                            </div>
                        </div>
                        <Button disabled={!isDirty || isLoading} variant="cta" size="lg" className="mt-6 py-6" type="submit">
                            {isLoading ? "Loading..." : "Create account"}
                        </Button>
                    </form>
                </div>
                <Link to="/signin" className="text-center text-primary underline text-sm mt-4 hover:text-secondary">
                    Already have an account? Sign in here
                </Link>
            </aside>
        </main>
    );
}
