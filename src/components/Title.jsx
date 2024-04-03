import { useEffect } from 'react';

export default function Title (title)
{
    useEffect(() =>
    {
        document.title = title || "Midnight Snack";
    });
}
