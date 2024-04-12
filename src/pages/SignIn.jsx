import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/services/useSupabase.service";
import { Link } from "react-router-dom";

export default function SignIn ()
{
    return (
        <main className='w-full flex justify-center'>
            <aside className='flex-col mt-7 w-96 flex'>
                <h1 className="text-2xl text-center font-bold">Sign into your account</h1>
                <div className='items-center justify-center'>
                    <form>
                        <Input placeholder="Email" type="email" />
                        <Input placeholder="Password" type="password" />
                        <Button type="submit">Sign In</Button>
                    </form>
                </div>
                <Link to="/signup" className="text-center text-primary">Don't have an account? Sign up here</Link>
            </aside>
        </main>
    );
}
