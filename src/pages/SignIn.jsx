import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/services/useSupabase.service";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function SignIn ()
{
    return (
        <div className='md:flex md:justify-center'>
            <div className='flex-col prose mt-7'>
                <h1>Log in to your app!</h1>
                <div className='items-center justify-center mx-12'>
                    <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                        providers={['google']}
                    />
                </div>
            </div>
        </div>
    );
}
