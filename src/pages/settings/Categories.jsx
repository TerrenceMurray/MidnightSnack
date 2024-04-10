import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

export default function Categories ()
{

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm();

    const onSubmit = (data) =>
    {
        if (!isDirty) return;
        console.log(JSON.stringify(data));
    };

    return (
        <>
            <section className="flex flex-col gap-1 mb-8">
                <section className="flex flex-col gap-1">
                    <h1 className="title">Categories</h1>
                    <h2 className="subtitle">Add/Remove categories for the items</h2>
                </section>
            </section>
            <section>
                <form className="flex flex-col gap-6 w-[40rem]" onSubmit={handleSubmit(onSubmit)}>

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
                                        message: "Title of category is required."
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "Title of category must be at least 2 characters long."
                                    }
                                })}
                            />
                            <Button className={"hover:opacity-75 transition-opacity duration-75 py-6"}
                                size="lg" type="submit" role="add category">Add Category
                            </Button>
                        </div>

                        {errors.title && <span className="text-sm text-red-600">{errors.title.message}</span>}
                    </div>

                    <div className="relative">
                        <label className="txt-sm" htmlFor="search" ></label>
                        <Input type="text"
                            id="search"
                            className="bg-foreground placeholder:text-secondary p-6 "
                            placeholder="Search for a category"
                        />
                        <i className="bi bi-search absolute top-1/2 -translate-y-1/2 right-4 text-xs text-secondary"></i>
                    </div>

                    <div className="mt-0 flex gap-4 flex-wrap">
                        <Button className="bg-accent-surface gap-2 rounded px-4 py-2"> Chicken <i className="bi bi-x-lg"></i> </Button>
                        <Button className="bg-accent-surface gap-2 rounded px-4 py-2"> Sushi <i className="bi bi-x-lg"></i> </Button>
                    </div>
                </form>
            </section>
        </>

    );
}
