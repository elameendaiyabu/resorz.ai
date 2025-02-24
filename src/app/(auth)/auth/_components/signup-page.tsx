"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signup } from "../actions";
import Link from "next/link";
import { SubmitSignupButton } from "./submit-button";
import { useFormState } from "react-dom";

export default function SignUpForm() {
    const [errorMessage, dispatch] = useFormState(signup, undefined);
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-3xl">Register</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form action={dispatch} className="grid gap-5">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="me@example.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" name="password" required />
                    </div>
                    <div>
                        <SubmitSignupButton />
                        <CardDescription className="">
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        </CardDescription>
                    </div>
                </form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="underline underline-offset-4">
                        Log In
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
