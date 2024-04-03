import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import * as React from "react";

const AddressInput = React.forwardRef(({ onChange, className }, ref) =>
{
    return (
        <div className="relative">
            <Input ref={ref} onChange={onChange} className={cn("w-96 rounded-lg text-base placeholder:text-secondary bg-foreground h-auto py-4 pl-14", className)} placeholder="Enter your delivery address" />
            <i className="bi bi-geo-alt-fill absolute top-1/2 -translate-y-1/2 left-8 text-base text-secondary"></i>
        </div>
    );
});

export default AddressInput;
