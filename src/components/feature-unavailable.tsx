"use client";

import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function FeatureUnavailable() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Alert className="max-w-md mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Feature Not Available</AlertTitle>
        <AlertDescription>
          We&apos;re sorry, but this feature is not currently available.
        </AlertDescription>
      </Alert>
      <Button onClick={() => router.push("/dashboard")}>
        Return to Dashboard
      </Button>
    </div>
  );
}
