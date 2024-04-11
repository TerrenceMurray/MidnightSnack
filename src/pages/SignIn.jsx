import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/services/useSupabase.service";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Link } from "react-router-dom";

export default function SignIn ()
{
    return (
        <main className='w-full flex justify-center'>
            <aside className='flex-col mt-7 w-96 flex'>
                <h1 className="text-2xl text-center font-bold">Sign into your account</h1>
                <div className='items-center justify-center'>
                    <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                        providers={[]}
                        localization={{
                            variables: {
                                sign_in: {
                                    email_label: 'Email Address',
                                    password_label: 'Password',
                                },
                            },
                        }}
                        showLinks={false}
                        view="sign_in"
                        redirectTo="/signin"
                    />
                </div>
                <Link to="/signup" className="text-center text-primary">Don&apost have an account? Sign up here</Link>
            </aside>
        </main>
    );
}
