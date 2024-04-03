import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { forwardRef, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { getLatLng } from "@/services/google.map.service";

const AddressInput = forwardRef(({ onChange, className }, ref) =>
{
    const [value, setValue] = useState("");
    const inputRef = useRef(null);

    // useEffect(() =>
    // {
    //     (async function ()
    //     {
    //         const results = await getLatLng(value);
    //         console.log(results);
    //     })();
    // }, [value]);

    const onChangeHandler = () =>
    {
        debounce(() =>
        {
            setValue(inputRef.current.value);
        }, 1300)();
    };

    return (
        <div className="relative">
            <Input ref={inputRef} onKeyDown={onChangeHandler} className={cn("w-96 rounded-lg text-base placeholder:text-secondary bg-foreground h-auto py-4 pl-14", className)} placeholder="Enter a restaurant location" />
            <i className="bi bi-geo-alt-fill absolute top-1/2 -translate-y-1/2 left-8 text-base text-secondary"></i>
            <div>
                {/* Results */}

            </div>
        </div>
    );
});

export default AddressInput;
