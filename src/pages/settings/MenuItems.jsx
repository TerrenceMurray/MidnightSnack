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

import { Button } from "@/components/ui/button";

export default function MenuItems ()
{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { isLoading: isFetching } = useContext(SettingsContext);
    const { toast } = useToast();

    const [categoryValue, setCategoryValue] = useState(null);

    const {
        getValues,
        register,
        handleSubmit,
        watch,
        isValid,
        formState: {
            errors,
            isDirty
        }
    } = useForm({
        cover: [],
        title: "",
        description: "",
        price: "",
    });

    useEffect(() =>
    {
        console.log(categoryValue);
    }, [categoryValue]);

    const handleFilter = () =>
    {

    };

    const onSubmit = async (data) =>
    {

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
                                placeholder="Filter table for menu items"
                                onKeyUp={handleFilter}
                            />
                            <i className="bi bi-search absolute top-1/2 -translate-y-1/2 right-4 text-xs text-secondary"></i>
                        </div>
                        <Dialog>
                            <DialogTrigger className="hover:opacity-75 transition-opacity duration-75 h-auto bg-primary text-button-text px-6 rounded-lg">Add menu item</DialogTrigger>
                            <DialogContent className="w-[40rem]">
                                <DialogHeader>
                                    <DialogTitle>Create a new menu item</DialogTitle>
                                    <DialogDescription>
                                        Fill in all of the blank fields below to create a new menu item.
                                    </DialogDescription>
                                </DialogHeader>
                                <form className="p-2 flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex items-end gap-8">
                                        <div type="cover" id="fileCover" className="bg-foreground placeholder:text-secondary rounded-lg aspect-square w-24">
                                            {/* {watch("cover")[0]
                                            ? <img
                                                src={
                                                    getValues("cover")[0]
                                                        ? URL.createObjectURL(getValues("cover")[0])
                                                        : null
                                                }
                                                alt="Cover" className="w-full h-full object-cover rounded-lg" />
                                            : null
                                        } */}
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

                                            {errors.price && <span className="text-sm text-red-600">{errors.price.message}</span>}
                                        </div>
                                        <div className="gap-2 flex flex-col w-full">
                                            <label className="text-sm" htmlFor="category" >Category</label>
                                            <Select
                                                {...register("category", {
                                                    required: {
                                                        value: true,
                                                        message: "This field is required."
                                                    }
                                                })}

                                                onValueChange={(value) => setCategoryValue(value)}
                                            >
                                                <SelectTrigger className="bg-foreground placeholder:text-secondary p-6" >
                                                    <SelectValue placeholder="Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem className="focus:bg-primary focus:text-button-text" value="c1">Category 1</SelectItem>
                                                    <SelectItem className="focus:bg-primary focus:text-button-text" value="c2">Category 2</SelectItem>
                                                    <SelectItem className="focus:bg-primary focus:text-button-text" value="c3">Category 3</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            {errors.category && <span className="text-sm text-red-600">{errors.category.message}</span>}
                                        </div>
                                    </div>
                                    <div className="mt-6 flex gap-6">
                                        <Button disabled={!isDirty || !isValid || isLoading} className="hover:opacity-75 transition-opacity duration-75" size="lg" type="submit" role="update account">
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
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">
                                    <div className="w-12 h-12 bg-foreground rounded-sm">
                                        <img src="" onError={(e) => { e.target.style.display = "none"; }} alt="menu item cover" className="w-full h-full object-cover object-center" />
                                    </div>
                                </TableCell>
                                <TableCell><p className="w-36 truncate">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, similique. Natus, delectus pariatur consequuntur accusantium nihil necessitatibus? Fugit odit ut aut cupiditate debitis, dolores et quibusdam iusto eum, quia maiores.</p></TableCell>
                                <TableCell><p className="max-w-32 inline-block truncate bg-accent-surface text-button-text rounded-lg py-1 px-2">Chicken</p></TableCell>
                                <TableCell><p className="w-64 line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium porro reprehenderit nihil nobis culpa fugit aliquam magnam alias eum ea!</p></TableCell>
                                <TableCell className="text-right">$12.99</TableCell>
                                <TableCell><Button variant="ghost" className="w-10 h-10 hover:bg-destructive hover:text-destructive-foreground"><i className="bi bi-x-lg"></i></Button></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </SettingsSkeleton>
            </section>
        </>
    );
}
