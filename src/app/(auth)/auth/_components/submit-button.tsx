"use client";

import { Button } from "@/components/ui/button";
import { SyntheticEvent } from "react";
import { useFormStatus } from "react-dom";

export function SubmitLoginButton() {
    const { pending } = useFormStatus();

    const handleClick = (event: SyntheticEvent) => {
        if (pending) {
            event.preventDefault();
        }
    };

    return (
        <Button
            aria-disabled={pending}
            onClick={handleClick}
            className="w-full"
            type="submit"
            disabled={pending}
        >
            {pending ? "Signing in" : "Sign in"}
        </Button>
    );
}

export function SubmitSignupButton() {
    const { pending } = useFormStatus();

    const handleClick = (event: SyntheticEvent) => {
        if (pending) {
            event.preventDefault();
        }
    };

    return (
        <Button
            aria-disabled={pending}
            className="w-full"
            onClick={handleClick}
            type="submit"
            disabled={pending}
        >
            {pending ? "Creating Account" : " Create an account"}
        </Button>
    );
}
