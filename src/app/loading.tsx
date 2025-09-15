import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] space-y-6">
      <div className="animate-spin text-primary">
        <Loader className="h-12 w-12 sm:h-16 sm:w-16" />
      </div>
      <div className="text-center space-y-2">
         <Skeleton className="h-6 w-48 mx-auto" />
         <Skeleton className="h-4 w-64 mx-auto" />
      </div>
       {/* Optional: Add more skeleton elements to mimic the page structure */}
      {/* <div className="w-full max-w-md space-y-4 mt-8">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div> */}
    </div>
  );
}
