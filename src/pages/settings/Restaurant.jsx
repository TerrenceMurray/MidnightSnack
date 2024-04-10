import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

export default function Restaurant ()
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
            cover: "picture.png",
            name: "Name e.g. Sushi House",
            address: "Address e.g. St. Augustine, Tunapuna",
            phone: "Phone Number e.g. +1-868-000-0000 ",
            email: "Email Address e.g. sushihub@gmail.com"
        }
    });

    const onSubmit = (d) =>
    {
        if (!isDirty) return;
        console.log(JSON.stringify(d));
    };

    return (
        <>
            <section className="flex flex-col gap-1 mb-8 py-8">
                <section className="flex flex-col gap-1">
                    <h1 className="title">Restaurant</h1>
                    <h2 className="subtitle">Update your restaurant settings</h2>
                </section>
            </section>
            <section>
                <form className= "flex flex-col gap-6 w-[40rem]" onSubmit={handleSubmit(onSubmit)}>
                <div class="flex gap-8 items-end" >
                    <input type= "cover" id="fileCover" className={cn("bg-foreground placeholder:text-secondary rounded-[16px] w-20 aspect-square ")}/>
                    <div className="flex flex-col w-3/4 ">
                        <label className= "txt-sm py-2" htmlFor="cover" >Cover</label>
                        <Input type="text" 
                        id="title"
                        className={cn("bg-foreground placeholder:text-secondary p-6 ")}
                        placeholder= "Choose a file"
                        />
                        {errors.cover && <span className="text-sm text-red-600">{errors.cover.message}</span>}
                        
                        </div>
                    </div>

                    <div>
                    <label className= "txt-sm" htmlFor="name" >Name</label>
                        <Input type="text" 
                        id="name"
                        className={cn("bg-foreground placeholder:text-secondary p-6 ")}
                        placeholder= "Name e.g. Sushi House"
                        {...register("name", {
                            required: {
                                value: true,
                                message: "Name of restaurant is required."
                            },
                            minLength: {
                                value: 2,
                                message: "Name of restaurant must be at least 2 characters long."
                            }
                        })}
                        />
                       
                        {errors.name && <span className="text-sm text-red-600">{errors.name.message}</span>}
                    </div>

                    <div>
                    <label className= "txt-sm" htmlFor="address" >Address</label>
                        <Input type="text" 
                        id="address"
                        className={cn("bg-foreground placeholder:text-secondary p-6 ")}
                        placeholder= "Address e.g. St. Augustine, Tunapuna"
                        {...register("address", {
                            required: {
                                value: true,
                                message: "Address of restaurant is required."
                            },
                            minLength: {
                                value: 2,
                                message: "Address of restaurant must be at least 2 characters long."
                            }
                        })}
                        />

                        {errors.address && <span className="text-sm text-red-600">{errors.address.message}</span>}
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
                        })} size="lg" type="submit" role="update account">Create restaurant</Button>
                        <Button className="hover:text-button-text hover:bg-red-600 transition-all duration-75" size="lg" variant="destructive" type="button" role="sign out of account">Delete</Button>
                    </div>


                </form>
            </section>
        </>
    );
}
