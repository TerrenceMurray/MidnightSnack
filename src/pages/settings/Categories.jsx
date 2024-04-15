import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { supabase } from "@/client/supabase";
import { useContext } from "react";
import { SettingsContext } from "@/context/settingsContext";
import SettingsSkeleton from "@/components/SettingsSkeleton";
import { useToast } from "@/components/ui/use-toast";
import Title from "@/components/Title";

export default function Categories ()
{
    Title("Midnight Snack - Categories");

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [isRemoving, setIsRemoving] = useState(null);

    const { toast } = useToast();
    const { isLoading: isFetching, categories, setCategories } = useContext(SettingsContext);
    const [filter, setFilter] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
            isDirty
        }
    } = useForm({
        title: ""
    });

    const handleDelete = async (id) =>
    {
        try
        {
            setIsRemoving(id);
            const { error } = await supabase.from("categories").delete().eq("id", id);

            if (error)
                throw error;

            // update context
            setCategories(categories.filter(category => category.id !== id));

            toast({
                title: "Category Removed",
                message: "The category has been removed successfully.",
                type: "success"
            });
            setIsRemoving(null);
        } catch (error)
        {
            toast({
                title: "An error occurred",
                message: "Failed to remove the category.",
                type: "error"
            });
            setError(error.message || error.error_description);
            setIsLoading(false);
        }
    };

    const onSubmit = async (data) =>
    {
        if (!isDirty) return;
        try
        {
            setIsLoading(true);
            const response = await supabase.auth.getUser();
            const { data: { user } } = response;

            const { error, data: categoryData } = await supabase.from("categories").insert({
                category: data.title,
                userID: user.id
            }).select();

            if (error)
                throw error;

            // update context
            setCategories([...categories, categoryData[0]]);
            setValue("title", "");

            toast({
                title: "Category Added",
                message: "The category has been added successfully.",
                type: "success"
            });

            setIsLoading(false);
        } catch (error)
        {
            setError(error.message || error.error_description);
            setIsLoading(false);
        }
    };

    const handleFilter = (e) =>
    {
        const value = e.target.value;
        setFilter(value);
    };

    return (
        <>
            <section className="flex flex-col gap-1 mb-8">
                <section className="flex flex-col gap-1">
                    <h1 className="title">Categories</h1>
                    <h2 className="subtitle">Add/Remove categories for the items</h2>
                </section>
            </section>
            {error && <span className="block text-destructive-foreground py-4 px-8 bg-destructive text-sm rounded-lg">An error has occurred: {error}</span>}
            <SettingsSkeleton isLoading={isFetching}>
                <section>
                    <form className="flex flex-col gap-6" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm py-2" htmlFor="title" >Add a new Category</label>
                            <div className="flex gap-8">
                                <Input type="text"
                                    id="title"
                                    className="bg-foreground placeholder:text-secondary p-6"
                                    placeholder="Category Title e.g. Chicken"
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
                                <Button disabled={isLoading} className="hover:opacity-75 transition-opacity duration-75 py-6" size="lg" type="submit" role="add category">
                                    {isLoading ? "Loading..." : "Add Category"}
                                </Button>
                            </div>

                            {errors.title && <span className="text-sm text-red-600">{errors.title.message}</span>}
                        </div>

                    </form>
                    <section className="mt-8">
                        <div className="relative">
                            <label className="txt-sm" htmlFor="search" ></label>
                            <Input type="text"
                                id="search"
                                className="bg-foreground placeholder:text-secondary p-6 "
                                placeholder="Search for a category"
                                onKeyUp={handleFilter}
                            />
                            <i className="bi bi-search absolute top-1/2 -translate-y-1/2 right-4 text-xs text-secondary"></i>
                        </div>

                        <div className="mt-6 flex gap-4 flex-wrap">
                            {
                                filter === "" ?
                                    (() =>
                                    {
                                        if (categories.length === 0) return <span className="text-sm text-secondary">No categories found.</span>;
                                        return categories.map(category => (
                                            <Button type="button" key={category.id} className="bg-accent-surface gap-2 rounded px-4 py-2 hover:opacity-75 transition-opacity duration-100" disabled={category.id === isRemoving} onClick={() => handleDelete(category.id)}> {category.id === isRemoving ? "Deleting..." : category.category} <i className="bi bi-x-lg"></i> </Button>
                                        ));
                                    })()
                                    :
                                    (() =>
                                    {
                                        const results = categories.filter(category => category.category.toLowerCase().includes(filter.toLowerCase()));
                                        if (results.length === 0) return <span className="text-sm text-secondary">No categories found.</span>;
                                        return results.map(category => (
                                            <Button type="button" key={category.id} className="bg-accent-surface gap-2 rounded px-4 py-2 hover:opacity-75 transition-opacity duration-100" disabled={category.id === isRemoving} onClick={() => handleDelete(category.id)}> {category.id === isRemoving ? "Deleting..." : category.category} <i className="bi bi-x-lg"></i> </Button>
                                        ));
                                    })()
                            }
                        </div>
                    </section>
                </section>
            </SettingsSkeleton>
        </>

    );
}
