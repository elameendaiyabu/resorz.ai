import { CheckCircle, Mail, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SignUpSuccess() {
    const supabase = await createClient();

    const { data } = await supabase.auth.getUser();
    if (data?.user) {
        redirect("/dashboard");
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="mx-auto max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
                <div className="text-center">
                    <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                    <h1 className="mt-4 text-2xl font-bold text-gray-900">
                        Sign Up Successful!
                    </h1>
                </div>

                <div className="space-y-4 text-center">
                    <p className="text-gray-600">
                        Thank you for signing up. Please check your email to verify your
                        account.
                    </p>

                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                        <Mail className="h-4 w-4" />
                        <span>
                            A verification link has been sent to your email address.
                        </span>
                    </div>
                </div>

                <div className="pt-4">
                    <Button asChild className="w-full">
                        <Link href="/auth/login">
                            <LogIn className="mr-2 h-4 w-4" />
                            Go to Login
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
