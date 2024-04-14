import { createContext, useState, useEffect } from "react";
import { supabase } from "@/client/supabase";

export const SettingsContext = createContext(null);

export default function SettingsContextProvider ({ children })
{
    const [restaurant, setRestaurant] = useState(null);
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() =>
    {
        (async () =>
        {
            try
            {
                setIsLoading(true);
                // Fetch user data
                const { data: { user }, userError } = await supabase.auth.getUser();

                if (userError)
                    throw userError;

                // set user
                setUser({
                    fname: user.user_metadata.fname,
                    lname: user.user_metadata.lname,
                    phone: user.user_metadata.phone,
                    email: user.email
                });

                // Fetch restaurant data
                const { data: restaurantData, error: restaurantError } = await supabase.from("restaurant").select().eq("userID", user.id);

                if (restaurantError)
                    throw restaurantError;

                if (restaurantData.length > 0) 
                {
                    // Fetch restaurant cover image
                    const { data: imageData, error: imageError } = await supabase
                        .storage
                        .from("restaurants")
                        .download(restaurantData[0].cover);


                    if (imageError)
                        throw error;

                    setRestaurant({
                        cover: [new File([imageData], "cover.jpg", { type: "image/jpeg" })],
                        name: restaurantData[0].name,
                        city: restaurantData[0].city,
                        openingTime: restaurantData[0].opens_at,
                        closingTime: restaurantData[0].closes_at,
                        imagePath: restaurantData[0].cover,
                    } || null);
                }

                // Fetch categories
                const { data: categoriesData, categoriesError } = await supabase.from("categories").select().eq("userID", user.id);

                if (categoriesError)
                    throw categoriesError;

                setCategories(categoriesData || []);

                setIsLoading(false);
            } catch (error)
            {
                setError(error.message || error.error_description);
            }
        })();

    }, [error]);

    return (
        <SettingsContext.Provider value={{ restaurant, user, isLoading, error, setUser, setRestaurant, categories, setCategories }}>
            {children}
        </SettingsContext.Provider>
    );
}