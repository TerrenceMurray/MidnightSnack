import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { supabase } from "@/client/supabase";
import { useNavigate } from "react-router-dom";

export default function Profile ()
{
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm({
        // TODO: Fetch user data from the API
        defaultValues: async () =>
        {
            const { data: { user } } = await supabase.auth.getUser();
            return {
                fname: user.user_metadata.fname,
                lname: user.user_metadata.lname,
                phone: user.user_metadata.phone,
                email: user.email
            };
        }
    });

    const handleSignOut = async () =>
    {
        try
        {
            const { error } = await supabase.auth.signOut();
            navigate("/");
            if (error) throw error;
        } catch (error)
        {
            console.error(error.message);
        }
    };

    const onSubmit = (data) =>
    {
        if (!isDirty) return;
        console.log(JSON.stringify(data));
    };

    return (
        <>
            <section className="flex flex-col gap-1 mb-8">
                <section className="flex flex-col gap-1">
                    <h1 className="title">Profile</h1>
                    <h2 className="subtitle">Update your account settings</h2>
                </section>
            </section>
            <section className="w-full">
                <form className="flex flex-col gap-6 w-[40rem]" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between w-full gap-8">
                        <div className="gap-2 flex flex-col w-full">
                            <label className="text-sm" htmlFor="fname">First Name</label>
                            <Input
                                type="text"
                                id="fname"
                                className="bg-foreground placeholder:text-secondary p-6"
                                placeholder="First Name e.g. Mark"
                                {...register("fname", {
                                    required: {
                                        value: true,
                                        message: "This field is required."
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "Must be at least 2 characters long."
                                    }
                                })}
                            />
                            {errors.fname && <span className="text-sm text-red-600">{errors.fname.message}</span>}
                        </div>
                        <div className="gap-2 flex flex-col w-full">
                            <label className="text-sm" htmlFor="lname">Last Name</label>
                            <Input
                                type="text"
                                id="lname"
                                className="bg-foreground placeholder:text-secondary p-6"
                                placeholder="Last Name e.g. Smart"
                                {...register("lname", {
                                    required: {
                                        value: true,
                                        message: "This field is required."
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "Must be at least 2 characters long."
                                    }
                                })}
                            />
                            {errors.lname && <span className="text-sm text-red-600">{errors.lname.message}</span>}
                        </div>
                    </div>
                    <div className="flex justify-between w-full gap-8">
                        <div className="gap-2 flex flex-col w-full">
                            <label className="text-sm" htmlFor="phone">Phone Number</label>
                            <Input className="bg-foreground placeholder:text-secondary p-6"
                                id="phone"
                                placeholder="Phone Number e.g +1 868 000 0000"
                                type="tel"
                                {...register("phone",
                                    {
                                        required: {
                                            value: true,
                                            message: "This field is required.",
                                        },
                                        pattern: {
                                            value: /^(?:\+?\d{1,3}[-. ]?)?\(?(?:\d{3})\)?[-. ]?\d{3}[-. ]?\d{4}$/,
                                            message: "Phone number is not valid.",
                                        }
                                    }
                                )} />
                            {errors.phone && <span className="text-sm text-red-600">This field is required.</span>}
                        </div>
                        <div className="gap-2 flex flex-col w-full">
                            <label className="text-sm" htmlFor="email">Email Address</label>
                            <Input className="bg-foreground placeholder:text-secondary p-6"
                                id="email"
                                type="email"
                                placeholder="Email Address e.g. tj12@gmail.com"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "This field is required.",
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Email address is not valid.",
                                    },
                                })} />
                            {errors.email && <span className="text-sm text-red-600">This field is required.</span>}
                        </div>
                    </div>
                    <div className="mt-6 flex gap-6">
                        <Button disabled={!isDirty} className="hover:opacity-75 transition-opacity duration-75" size="lg" type="submit" role="update account">Update account</Button>
                        <Button className="hover:text-button-text hover:bg-red-600 transition-all duration-75" size="lg" variant="destructive" onClick={handleSignOut} type="button" role="sign out of account">Sign Out</Button>
                    </div>
                </form>
            </section>
        </>
    );
}
