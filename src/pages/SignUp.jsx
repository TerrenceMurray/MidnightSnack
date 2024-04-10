import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/services/useSupabase.service";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Link } from "react-router-dom";

export default function SignUp ()
{
    return (
        <main className='w-full flex justify-center'>
            <aside className='flex-col mt-7 w-96 flex'>
                <h1 className="text-2xl text-center font-bold">Create a new account</h1>
                <div className='items-center justify-center'>
                    <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                        providers={[]}
                        localization={{
                            variables: {
                                sign_up: {
                                    email_label: 'Email Address',
                                    password_label: 'Password',
                                },
                            },
                        }}
                        showLinks={false}
                        view="sign_up"
                        redirectTo="/"
                    />
                </div>
                <Link to="/signin" className="text-center text-primary">Already have an account? Sign in here</Link>
            </aside>
        </main>
    );
}
