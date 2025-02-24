import { Home } from "lucide-react";
import SignUpForm from "../_components/signup-page";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
    const supabase = await createClient();

    const { data } = await supabase.auth.getUser();
    if (data?.user) {
        redirect("/dashboard");
    }

    return (
        <div>
            <Link href="/dashboard">
                <Home className="w-7 h-7 ml-4 mt-2" />
            </Link>
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <SignUpForm />
                </div>
            </div>
        </div>
    );
}
