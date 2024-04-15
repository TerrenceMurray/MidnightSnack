import SettingsSkeleton from "@/components/SettingsSkeleton";
import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "@/context/settingsContext";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import
{
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import
{
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import
{
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/client/supabase";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Title from "@/components/Title";

export default function MenuItems ()
{
    Title("Midnight Snack - Menu Items");

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { isLoading: isFetching, categories, restaurant, menuItems, setMenuItems } = useContext(SettingsContext);
    const { toast } = useToast();

    const [isRemoving, setIsRemoving] = useState(null);
    const [categoryValue, setCategoryValue] = useState(null);
    const [filter, setFilter] = useState("");

    const {
        getValues,
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        trigger,
        formState: {
            errors,
            isValid,
            isDirty
        }
    } = useForm({
        title: "",
        description: "",
        price: "",
        cover: [],
        category: ""
    });

    useEffect(() =>
    {
        setValue("category", categoryValue);
        trigger("category");
    }, [setValue, categoryValue, trigger]);


    register("category", {
        required: {
            value: true,
            message: "This field is required."
        }
    });


    const handleFilter = (e) =>
    {
        const value = e.target.value;
        setFilter(value);
    };

    const handleDelete = async (id) =>
    {
        try
        {
            setIsRemoving(id);
            setError(null);

            // delete image from bucket
            const imagePath = menuItems.find(item => item.id === id).cover;
            const { error: imageError } = await supabase.storage.from("items").remove([imagePath]);

            if (imageError)
                throw imageError;

            const { error } = await supabase.from("items").delete().eq("id", id);

            if (error)
                throw error;

            // update context
            setMenuItems(menuItems.filter(item => item.id !== id));

            toast({
                title: "Menu Item Removed",
                message: "The menu item has been removed successfully.",
                type: "success"
            });
            setIsLoading(false);
            setIsRemoving(null);
        } catch (error)
        {
            setError(error.message || error.error_description);
            setIsLoading(false);
        }
    };

    const onSubmit = async (data) =>
    {
        try
        {
            if (!isValid) return;

            setIsLoading(true);
            setError(null);

            const uploadData = { ...data, category: categories.find(category => category.category === data.category).id };

            // upload image to bucket
            const filename = `public/${restaurant.name}/${Date.now()}.${data.cover[0].type.split("/")[1]}`;

            const { error: imageError } = await supabase.storage.from("items").upload(filename, uploadData.cover[0]);
            const { data: imageData } = await supabase.storage.from("items").getPublicUrl(filename);

            if (imageError || imageData.publicUrl === null)
                throw imageError;

            // insert data into database
            const response = await supabase.auth.getUser();
            const { data: { user } } = response;

            const { error, data: itemData } = await supabase.from("items").insert({
                title: uploadData.title,
                description: uploadData.description,
                price: uploadData.price,
                categoryID: uploadData.category,
                cover: filename,
                userID: user.id
            }).select();

            if (error)
                throw error;

            // update context
            const item = {
                ...itemData[0],
                imagePath: imageData.publicUrl
            };
            setMenuItems([...menuItems, item]);

            toast({
                title: "Menu Item Added",
                message: "The menu item has been added successfully.",
                type: "success"
            });
            reset(
                {
                    title: "",
                    description: "",
                    price: "",
                    cover: [],
                    category: ""
                }
            );
            setIsLoading(false);

        } catch (error)
        {
            setError(error.message || error.error_description);
            setIsLoading(false);
        }
    };

    return (
        <>
            <section className="flex flex-col gap-1 mb-8">
                <section className="flex flex-col gap-1">
                    <h1 className="title">Menu Items</h1>
                    <h2 className="subtitle">Add/Remove menu items to restaurant</h2>
                </section>
            </section>
            {error && <span className="block text-destructive-foreground py-4 px-8 bg-destructive text-sm rounded-lg">An error has occurred: {error}</span>}
            <section className="w-full flex flex-col gap-8">
                <SettingsSkeleton isLoading={isFetching}>
                    <div className="flex gap-8 w-full">
                        <div className="relative flex-1">
                            <label className="txt-sm" htmlFor="search" ></label>
                            <Input type="text"
                                id="search"
                                autoComplete="off"
                                className="bg-foreground placeholder:text-secondary p-6"
                                placeholder="Filter table for menu items by title e.g. Nigiri Sushi"
                                onKeyUp={handleFilter}
                            />
                            <i className="bi bi-search absolute top-1/2 -translate-y-1/2 right-4 text-xs text-secondary"></i>
                        </div>
                        <Dialog onOpenChange={() => { reset({ cover: null }); }}>
                            <DialogTrigger className="hover:opacity-75 transition-opacity duration-75 h-auto bg-primary text-button-text px-6 rounded-lg text-sm">Add menu item</DialogTrigger>
                            <DialogContent className="w-[40rem]">
                                <DialogHeader>
                                    <DialogTitle>Create a new menu item</DialogTitle>
                                    <DialogDescription>
                                        Fill in all of the blank fields below to create a new menu item.
                                    </DialogDescription>
                                </DialogHeader>
                                {error && <span className="block text-destructive-foreground py-4 px-8 bg-destructive text-sm rounded-lg">An error has occurred: {error}</span>}
                                <form className="p-2 flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex items-end gap-8">
                                        <div type="cover" id="fileCover" className="bg-foreground placeholder:text-secondary rounded-lg aspect-square w-24">
                                            {watch("cover")
                                                ? getValues("cover").length > 0
                                                && <img
                                                    src={
                                                        getValues("cover")[0]
                                                            ? URL.createObjectURL(getValues("cover")[0])
                                                            : null
                                                    }
                                                    onError={(e) => { e.target.style.display = "none"; }}
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
                                        <label className="text-sm" htmlFor="title" >Title</label>
                                        <Input type="text"
                                            id="title"
                                            className="bg-foreground placeholder:text-secondary p-6"
                                            placeholder="Title e.g. Nigiri Sushi"
                                            {...register("title", {
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

                                        {errors.title && <span className="text-sm text-red-600">{errors.title.message}</span>}
                                    </div>
                                    <div className="gap-2 flex flex-col w-full">
                                        <label className="text-sm" htmlFor="description" >Description</label>
                                        <Input type="text"
                                            id="description"
                                            className="bg-foreground placeholder:text-secondary p-6"
                                            placeholder="Description e.g. A piece of sushi with a slice of fish on top"
                                            {...register("description", {
                                                required: {
                                                    value: true,
                                                    message: "This field is required."
                                                },
                                                minLength: {
                                                    value: 2,
                                                    message: "Must be at least 2 characters long."
                                                },
                                                maxLength: {
                                                    value: 50,
                                                    message: "Must be at most 50 characters long."
                                                }
                                            })}
                                        />

                                        {errors.description && <span className="text-sm text-red-600">{errors.description.message}</span>}
                                    </div>

                                    <div className="flex gap-8 w-full justify-between">
                                        <div className="gap-2 flex flex-col w-full">
                                            <label className="text-sm" htmlFor="price" >Price</label>
                                            <Input type="number"
                                                id="price"
                                                className="bg-foreground placeholder:text-secondary p-6"

                                                step="0.01"
                                                min="0.01"
                                                placeholder="Price"
                                                {...register("price", {
                                                    required: {
                                                        value: true,
                                                        message: "This field is required."
                                                    },
                                                    min: {
                                                        value: 0.01,
                                                        message: "Price must be at least $0.01."
                                                    },
                                                    pattern: {
                                                        value: /^\d+(\.\d{2})?$/,
                                                        message: "Price must be a valid number."
                                                    }
                                                })}
                                            />

                                            {errors.price && <span className="text-sm text-red-600">{errors.price.message}</span>}
                                        </div>
                                        <div className="gap-2 flex flex-col w-full">
                                            <label className="text-sm" htmlFor="category" >Category</label>
                                            <Select
                                                onValueChange={(value) => { setCategoryValue(value); }}
                                            >
                                                <SelectTrigger className="bg-foreground placeholder:text-secondary p-6" >
                                                    <SelectValue placeholder="Select a category" className={
                                                        cn({
                                                            "text-secondary": categoryValue === null || categoryValue === ""
                                                        })
                                                    } />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem className="focus:bg-primary focus:text-button-text" value={null}>None</SelectItem>
                                                    {categories.map((category) => (<SelectItem key={category.id} className="focus:bg-primary focus:text-button-text" value={category.category}>{category.category}</SelectItem>))}
                                                </SelectContent>
                                            </Select>

                                            {errors.category && <span className="text-sm text-red-600">{errors.category.message}</span>}
                                        </div>
                                    </div>
                                    <div className="mt-6 flex gap-6">
                                        <Button disabled={isLoading || !isDirty} className="hover:opacity-75 transition-opacity duration-75" size="lg" type="submit" role="update account">
                                            {isLoading ? "Loading..." : "Create Menu Item"}
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">Cover</TableHead>
                                <TableHead className="w-36">Title</TableHead>
                                <TableHead className="w-32">Category</TableHead>
                                <TableHead className='w-64'>Description</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="w-20"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                (!isFetching && menuItems.length > 0) ?
                                    (
                                        filter === "" ?
                                            menuItems.map((item, index) =>
                                            {

                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell className="font-medium">
                                                            <div className="w-12 h-12 bg-foreground rounded-sm">
                                                                <img src={item.imagePath} onError={(e) => { e.target.style.display = "none"; }} alt="menu item cover" className="w-full h-full object-cover object-center rounded-sm" />
                                                            </div>
                                                        </TableCell>
                                                        <TableCell><p className="w-36 truncate">{item.title}</p></TableCell>
                                                        <TableCell><p className="max-w-32 inline-block truncate bg-accent-surface text-button-text rounded-lg py-1 px-2">{categories.find((category) => category.id === item.categoryID).category} </p></TableCell>
                                                        <TableCell><p className="w-64 line-clamp-2">{item.description}</p></TableCell>
                                                        <TableCell className="text-right">${parseFloat(item.price).toFixed(2)}</TableCell>
                                                        <TableCell>
                                                            <Button disabled={isRemoving == item.id} variant="ghost" className="w-10 h-10 hover:bg-destructive hover:text-destructive-foreground" onClick={() => handleDelete(item.id)}>
                                                                {isRemoving == item.id ? <span className="text-destructive-foreground">Deleting...</span> : <i className="bi bi-x-lg"></i>}
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                            :
                                            (() =>
                                            {
                                                const filteredItems = menuItems.filter(item => item.title.toLowerCase().includes(filter.toLowerCase()));
                                                
                                                if (filteredItems.length === 0) return <TableRow><TableCell colSpan="6" className="text-center">No menu items found.</TableCell></TableRow>;

                                                return filteredItems.map((item, index) =>
                                                {

                                                    return (
                                                        <TableRow key={index}>
                                                            <TableCell className="font-medium">
                                                                <div className="w-12 h-12 bg-foreground rounded-sm">
                                                                    <img src={item.imagePath} onError={(e) => { e.target.style.display = "none"; }} alt="menu item cover" className="w-full h-full object-cover object-center rounded-sm" />
                                                                </div>
                                                            </TableCell>
                                                            <TableCell><p className="w-36 truncate">{item.title}</p></TableCell>
                                                            <TableCell><p className="max-w-32 inline-block truncate bg-accent-surface text-button-text rounded-lg py-1 px-2">{categories.find((category) => category.id === item.categoryID).category} </p></TableCell>
                                                            <TableCell><p className="w-64 line-clamp-2">{item.description}</p></TableCell>
                                                            <TableCell className="text-right">${parseFloat(item.price).toFixed(2)}</TableCell>
                                                            <TableCell>
                                                                <Button disabled={isRemoving == item.id} variant="ghost" className="w-10 h-10 hover:bg-destructive hover:text-destructive-foreground" onClick={() => handleDelete(item.id)}>
                                                                    {isRemoving == item.id ? <span className="text-destructive-foreground">Deleting...</span> : <i className="bi bi-x-lg"></i>}
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                });
                                            })()
                                    )
                                    :
                                    <TableRow>
                                        <TableCell colSpan="6" className="text-center">No menu items found.</TableCell>
                                    </TableRow>
                            }
                        </TableBody>
                    </Table>
                </SettingsSkeleton>
            </section>
        </>
    );
}
