"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link"; // Use Link for internal navigation

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-center p-4">
      <AlertTriangle className="w-16 h-16 sm:w-20 sm:h-20 text-destructive mb-6" />
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-destructive mb-3">
        Something went wrong!
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground max-w-md mb-6">
         {error.message || "An unexpected error occurred. Please try again or contact support if the problem persists."}
      </p>
       <div className="flex flex-col sm:flex-row gap-4">
         <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            size="lg"
             className="text-base sm:text-lg"
          >
            Try Again
         </Button>
          <Button variant="outline" size="lg" asChild className="text-base sm:text-lg">
            <Link href="/">Go Back Home</Link>
          </Button>
       </div>
    </div>
  );
}
