import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { set, useForm } from "react-hook-form";
import { SettingsContext } from "@/context/settingsContext";
import { useContext } from "react";
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
import _Restaurant from "@/classes/Restaurant";
import { supabase } from "@/client/supabase";
import
{
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

async function getCities ()
{
    return await axios.get('/cities.json');
}

export default function Restaurant ()
{
    const [cities, setCities] = useState([]);
    const [open, setOpen] = useState(false);
    const [cityValue, setCityValue] = useState("");

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { isLoading: isFetching, restaurant, setRestaurant } = useContext(SettingsContext);

    const [isNew, setIsNew] = useState(true);

    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        reset,
        formState: {
            errors,
            isDirty,
            isValid
        }
    } = useForm({
        // TODO: Fetch user data from the API
        defaultValues: {
            name: "",
            city: "",
            openingTime: "",
            closingTime: "",
            cover: []
        }
    });


    const handleDelete = async () =>
    {
        try
        {
            setIsLoading(true);
            const response = await supabase.auth.getUser();

            // Delete from bucket
            const filename = `public/${restaurant.name}/cover.${restaurant.cover[0].type.split("/")[1]}`;

            const { error: imageError } = await supabase
                .storage
                .from('restaurants')
                .remove([filename]);

            if (imageError)
                throw imageError;

            // Delete from database
            const { error } = await supabase
                .from('restaurant')
                .delete()
                .eq('userID', response.data.user.id);

            if (error)
                throw error;

            // Remove from context
            setIsNew(true);
            setRestaurant(null);
            reset({
                name: "",
                city: "",
                openingTime: "",
                closingTime: "",
                cover: []
            });
            setCityValue("");

            toast({
                title: "Restaurant deleted successfully.",
                type: "success"
            });
            setIsLoading(false);
        } catch (error)
        {
            setError(error.message || error.error_description);
        }
    };


    useEffect(() =>
    {
        getCities().then((response) =>
        {
            setCities(response.data);
        });
    }, []);

    useEffect(() =>
    {
        if (!isFetching && restaurant !== null)
        {
            setIsNew(false);
        }
    }, [isFetching, restaurant, reset]);

    const onSubmit = async (data) =>
    {
        if (!isDirty) return;

        try
        {
            setIsLoading(true);
            setError(null);
            const response = await supabase.auth.getUser();
            // upload image to bucket
            const filename = `public/${data.name}/cover.${data.cover[0].type.split("/")[1]}`;

            const { uploadError } = await supabase
                .storage
                .from("restaurants")
                .upload(filename, data.cover[0]);

            if (uploadError)
                throw uploadError;

            // add restaurant to database
            const { error: dataError } = await supabase
                .from("restaurant")
                .insert([
                    {
                        name: data.name,
                        city: data.city,
                        opens_at: data.openingTime,
                        closes_at: data.closingTime,
                        cover: filename,
                        userID: response.data.user.id
                    }
                ]);

            if (dataError)
                throw dataError;


            setIsLoading(false);

            setRestaurant({
                cover: data.cover,
                name: data.name,
                city: data.city,
                openingTime: data.openingTime,
                closingTime: data.closingTime,
            });

            setIsNew(false);

            toast({
                title: "Restaurant added successfully.",
                type: "success"
            });
        } catch (error)
        {
            setIsLoading(false);
            setError(error.message || error.error_description);
        }

    };

    return (
        <>
            <section className="flex flex-col gap-1 mb-8">
                <section className="flex flex-col gap-1">
                    <h1 className="title">Restaurant</h1>
                    <h2 className="subtitle">Add/Update your restaurant settings</h2>
                </section>
            </section>
            {isFetching ? <p>Loading...</p> :
                isNew
                    ?
                    (
                        <section>
                            {error && <span className="block text-destructive-foreground py-4 px-8 bg-destructive text-sm rounded-lg mb-8">An error has occurred: {error}</span>}
                            <form className="flex flex-col gap-6 " onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex gap-8 items-end" >
                                    <div type="cover" id="fileCover" className="bg-foreground placeholder:text-secondary rounded-lg w-48 aspect-square ">
                                        {watch("cover")[0]
                                            ? <img
                                                src={
                                                    getValues("cover")[0]
                                                        ? URL.createObjectURL(getValues("cover")[0])
                                                        : null
                                                }
                                                alt="Cover" className="w-full h-full object-cover rounded-lg" />
                                            : null
                                        }
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <label className="text-sm py-2" htmlFor="cover" >Cover</label>
                                        <Input
                                            type="file"
                                            id="file"
                                            accept=".jpg,.png"
                                            className="bg-foreground placeholder:text-secondary h-auto py-3 px-4 w-full"
                                            {...register("cover", {
                                                required: {
                                                    value: true,
                                                    message: "This field is required."
                                                },
                                                validate: (value) => value[0].size <= 2000000 || "File size must be at most 2MB."
                                            }
                                            )}
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
                                                message: "This field is required."
                                            },
                                            minLength: {
                                                value: 2,
                                                message: "Must be at least 2 characters long."
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
                                                    {cityValue
                                                        ? cities[cityValue].city
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
                                                                            if (currentValue === cityValue) 
                                                                            {
                                                                                setValue("city", "", { shouldValidate: true });
                                                                                setCityValue("");
                                                                            } else
                                                                            {
                                                                                setValue("city", currentValue, { shouldValidate: true });
                                                                                setCityValue(currentValue, { shouldValidate: true });
                                                                            }
                                                                            setOpen(false);
                                                                        }}
                                                                        className="text-primary aria-selected:bg-primary aria-selected:text-button-text hover:text-secondary"
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                {
                                                                                    "opacity-100": cityValue === cities[key].city,
                                                                                    "opacity-0": cityValue !== cities[key].city,
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
                                                    required: {
                                                        value: true,
                                                        message: "This field is required."
                                                    },
                                                    validate: (value) => _Restaurant.isValidHours(value, getValues("closingTime")) || "Invalid time range."
                                                }
                                            )} />
                                        {errors.openingTime && <span className="text-sm text-red-600">{errors.openingTime.message}</span>}
                                    </div>
                                    <div className="gap-2 flex flex-col w-full">
                                        <label className="text-sm" htmlFor="closingTime">Closing Time</label>
                                        <Input className="bg-foreground placeholder:text-secondary p-6"
                                            type="time"
                                            id="closingTime"
                                            {...register("closingTime",
                                                {
                                                    required: {
                                                        value: true,
                                                        message: "This field is required."
                                                    },
                                                    validate: (value) => _Restaurant.isValidHours(getValues("openingTime"), value) || "Invalid time range."
                                                }
                                            )} />
                                        {errors.closingTime && <span className="text-sm text-red-600">{errors.closingTime.message}</span>}
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-6">
                                    <Button disabled={!isDirty || !isValid || isLoading} className="hover:opacity-75 transition-opacity duration-75" size="lg" type="submit" role="update account">
                                        {isLoading ? "Loading..." : "Create restaurant"}
                                    </Button>
                                </div>
                            </form>
                        </section>
                    )
                    :
                    <>
                        <section className="flex flex-col gap-6 w-[40rem]">
                            <div className="flex gap-8 items-end" >
                                <div type="cover" id="fileCover" className="bg-foreground placeholder:text-secondary rounded-lg w-32 aspect-square ">
                                    <img
                                        src={
                                            URL.createObjectURL(restaurant.cover[0])
                                        }
                                        alt="Cover" className="w-full h-full object-cover rounded-lg" />
                                </div>
                            </div>
                            <div className="gap-2 flex flex-col w-full">
                                <label className="text-sm" htmlFor="name" >Name</label>
                                <Input type="text"
                                    id="name"
                                    className="bg-foreground placeholder:text-secondary p-6"
                                    value={restaurant.name}
                                    disabled={true}
                                />
                            </div>

                            <div className="gap-2 flex flex-col w-full">
                                <label className="text-sm" htmlFor="city" >City</label>
                                <Input className="bg-foreground placeholder:text-secondary p-6" disabled={true} value={restaurant.city} type="text" />
                            </div>

                            <div className="flex justify-between w-full gap-8">
                                <div className="gap-2 flex flex-col w-full">
                                    <label className="text-sm" htmlFor="openingTime">Opening Time</label>
                                    <Input className="bg-foreground placeholder:text-secondary p-6"
                                        type="time"
                                        id="openingTime"
                                        value={restaurant.openingTime}
                                        disabled={true} />
                                </div>
                                <div className="gap-2 flex flex-col w-full">
                                    <label className="text-sm" htmlFor="closingTime">Closing Time</label>
                                    <Input className="bg-foreground placeholder:text-secondary p-6"
                                        type="time"
                                        id="closingTime"
                                        value={restaurant.closingTime}
                                        disabled={true}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex gap-6">
                                <AlertDialog>
                                    <AlertDialogTrigger className="transition-all duration-100 text-destructive-foreground bg-destructive px-6 py-3 rounded-lg hover:text-button-text hover:bg-destructive-foreground" disabled={isLoading} >{isLoading ? "Loading..." : "Delete"}</AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your restaurant
                                                and remove all of its data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="hover:bg-primary hover:text-button-text">
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction onClick={handleDelete} className="hover:bg-destructive-foreground">Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                {/*  */}
                            </div>
                        </section>
                    </>
            }
        </>
    );
}
