import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from 'react';
import { Check, ChevronsUpDown } from "lucide-react";
import
{
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import
{
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

async function getCities ()
{
    return await axios.get('/public/cities.json');
}

export default function Restaurant ()
{
    const [cities, setCities] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

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
            name: "",
            city: "",
            openingTime: "",
            closingTime: ""
        }
    });

    useEffect(() =>
    {
        getCities().then((response) =>
        {
            setCities(response.data);
        });
    }, []);

    const onSubmit = (d) =>
    {
        if (!isDirty) return;
        console.log(JSON.stringify(d));
    };

    return (
        <>
            <section className="flex flex-col gap-1 mb-8">
                <section className="flex flex-col gap-1">
                    <h1 className="title">Restaurant</h1>
                    <h2 className="subtitle">Update your restaurant settings</h2>
                </section>
            </section>
            <section>
                <form className="flex flex-col gap-6 w-[40rem]" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-8 items-end" >
                        <div type="cover" id="fileCover" className="bg-foreground placeholder:text-secondary rounded-lg w-20 aspect-square "></div>
                        <div className="flex flex-col w-full">
                            <label className="text-sm py-2" htmlFor="cover" >Cover</label>
                            <Input
                                type="file"
                                id="file"
                                accept="image/jpg,image/png"
                                className="bg-foreground placeholder:text-secondary h-auto py-3 px-4 w-full"
                                placeholder="Choose a file"
                            />
                            {errors.cover && <span className="text-sm text-red-600">{errors.cover.message}</span>}

                        </div>
                    </div>
                    <div className="gap-2 flex flex-col w-full">
                        <label className="text-sm" htmlFor="name" >Name</label>
                        <Input type="text"
                            id="name"
                            className="bg-foreground placeholder:text-secondary p-6"
                            placeholder="Name e.g. Sushi House"
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

                    <div className="gap-2 flex flex-col w-full">
                        <label className="text-sm" htmlFor="city" >City</label>
                        <input type="hidden" {...register("city", {
                            required: {
                                value: true,
                                message: "This field is required."
                            }
                        })} />
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <div>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        type="button"
                                        className="w-full bg-foreground hover:bg-foreground hover:opacity-75 transition-opacity relative h-auto py-4 pl-14 justify-between "
                                    >
                                        <i className="bi bi-geo-alt-fill absolute top-1/2 -translate-y-1/2 left-8 text-base text-secondary"></i>
                                        {value
                                            ? cities[value].city
                                            : <span className='text-secondary font-normal'>Select a city e.g. Port of Spain</span>}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="">
                                <Command>
                                    <CommandInput placeholder="Search for a city..." />
                                    <CommandEmpty>No location found.</CommandEmpty>
                                    <CommandList>
                                        <CommandGroup>
                                            {
                                                Object.entries(cities).map(([key, data]) =>
                                                {
                                                    return (
                                                        <CommandItem key={key}
                                                            value={data.city}
                                                            onSelect={(currentValue) =>
                                                            {
                                                                setValue(currentValue === value ? "" : currentValue);
                                                                setOpen(false);
                                                            }}
                                                            className="text-primary aria-selected:bg-primary aria-selected:text-button-text hover:text-secondary"
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    {
                                                                        "opacity-100": value === cities[key].city,
                                                                        "opacity-0": value !== cities[key].city,
                                                                    }
                                                                )}
                                                            />
                                                            {data.city}
                                                        </CommandItem>
                                                    );

                                                })
                                            }
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        {errors.city && <span className="text-sm text-red-600">{errors.city.message}</span>}
                    </div>

                    <div className="flex justify-between w-full gap-8">
                        <div className="gap-2 flex flex-col w-full">
                            <label className="text-sm" htmlFor="openingTime">Opening Time</label>
                            <Input className="bg-foreground placeholder:text-secondary p-6"
                                type="time"
                                id="openingTime"
                                {...register("openingTime",
                                    {
                                        required: true
                                    }
                                )} />
                            {errors.openingTime && <span className="text-sm text-red-600">This field is required.</span>}
                        </div>
                        <div className="gap-2 flex flex-col w-full">
                            <label className="text-sm" htmlFor="closingTime">Closing Time</label>
                            <Input className="bg-foreground placeholder:text-secondary p-6"
                                type="time"
                                id="closingTime"
                                {...register("closingTime",
                                    {
                                        required: true
                                    }
                                )} />
                            {errors.closingTime && <span className="text-sm text-red-600">This field is required.</span>}
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
