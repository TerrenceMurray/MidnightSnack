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
    } = useForm({
        // TODO: Fetch user data from the API
        defaultValues: {
            title: "Title eg: Chicken",
            search: "Search",
           
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
                    <h1 className="title">Categories</h1>
                    <h2 className="subtitle">Add/Remove categories for the items</h2>
                </section>
            </section>
            <section>
                <form className="flex flex-col gap-6 w-[40rem]" onSubmit={handleSubmit(onSubmit)}>
                    <div class="flex gap-8 items-end" >
                    <div className="flex flex-col w-3/4 ">
                        <label className= "txt-sm py-2" htmlFor="title" >Add a new Category</label>
                        <Input type="text" 
                        id="title"
                        className={cn("bg-foreground placeholder:text-secondary p-6 ")}
                        placeholder= "Title eg: Chicken"
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
                        {errors.title && <span className="text-sm text-red-600">{errors.title.message}</span>}

                        </div>
                        <Button className={cn("hover:opacity-75 transition-opacity duration-75 py-4 ", )} 
                                size="lg" type="submit" role="add category">Add Category
                         </Button>
                    </div>
                    
                    <div className="relative">
                    <label className= "txt-sm" htmlFor="search" ></label>
                        <Input type="text" 
                        id="search"
                        className={cn("bg-foreground placeholder:text-secondary p-6 ")}
                        placeholder= "Search"
                        {...register("search", {
                            required: {
                                value: true,
                                message: "Search of category is required."
                            },
                            minLength: {
                                value: 2,
                                message: "Search of category must be at least 2 characters long."
                            }
                        })}
                        />
                        <i className="bi bi-search absolute top-1/2 -translate-y-1/2 right-4 text-xs text-secondary
                        "></i>
                        {errors.search && <span className="text-sm text-red-600">{errors.search.message}</span>}
                    </div>
                        
                    <div className="mt-0 flex gap-4">
                        <Button className="bg-accent-surface gap-2 rounded px-4 py-2"> Chicken <i className="bi bi-x-lg"></i> </Button>
                        <Button className="bg-accent-surface gap-2 rounded px-4 py-2"> Sushi <i className="bi bi-x-lg"></i> </Button>
                       
                    </div>
                </form>
            </section>
        </>
        
    );
}
