import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

export default function Profile ()
{

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm({
        // TODO: Fetch user data from the API
        defaultValues: {
            fname: "Terrence",
            lname: "Murray",
            phone: "+1-868-721-6166",
            email: "mterrence891@gmail.com"
        }
    });

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
                <form className="flex flex-col gap-6 w-[40rem]" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between w-full gap-8">
                        <div className="gap-2 flex flex-col w-full">
                            <label className="text-sm" htmlFor="fname">First Name</label>
                            <Input
                                type="text"
                                id="fname"
                                className={cn("bg-foreground placeholder:text-secondary p-6")}
                                placeholder="First Name e.g. Mark"
                                {...register("fname", {
                                    required: {
                                        value: true,
                                        message: "First name is required."
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "First name must be at least 2 characters long."
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
                                className={cn("bg-foreground placeholder:text-secondary p-6")}
                                placeholder="Last Name e.g. Smart"
                                {...register("lname", {
                                    required: {
                                        value: true,
                                        message: "Last name is required."
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "Last name must be at least 2 characters long."
                                    }
                                })}
                            />
                            {errors.lname && <span className="text-sm text-red-600">{errors.lname.message}</span>}
                        </div>
                    </div>
                    <div className="flex justify-between w-full gap-8">
                        <div className="gap-2 flex flex-col w-full">
                            <label className="text-sm" htmlFor="phone">Phone Number</label>
                            <Input className={cn("bg-foreground placeholder:text-secondary p-6")} type="tel" placeholder="Phone Number e.g +1 868 000 0000" id="phone" {...register("phone", { required: true })} />
                            {errors.phone && <span className="text-sm text-red-600">This field is required.</span>}
                        </div>
                        <div className="gap-2 flex flex-col w-full">
                            <label className="text-sm" htmlFor="email">Email Address</label>
                            <Input className={cn("bg-foreground placeholder:text-secondary p-6")} type="email" placeholder="Email Address e.g. tj12@gmail.com" id="email" {...register("email", { required: true })} />
                            {errors.email && <span className="text-sm text-red-600">This field is required.</span>}
                        </div>
                    </div>
                    <div className="mt-6 flex gap-6">
                        <Button className={cn("hover:opacity-75 transition-opacity duration-75", {
                            "cursor-not-allowed opacity-50 hover:opacity-50": !isDirty
                        })} size="lg" type="submit" role="update account">Update account</Button>
                        <Button className="hover:text-button-text hover:bg-red-600 transition-all duration-75" size="lg" variant="destructive" type="button" role="sign out of account">Sign Out</Button>
                    </div>
                </form>
            </section>
        </>
    );
}
