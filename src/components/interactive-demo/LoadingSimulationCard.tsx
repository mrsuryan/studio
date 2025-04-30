
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader } from 'lucide-react';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

export function LoadingSimulationCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [mockData, setMockData] = useState<string | null>(null);

  const handleFetchData = () => {
    setIsLoading(true);
    setMockData(null);
    // Simulate API call
    setTimeout(() => {
      setMockData('Data fetched successfully! 🎉');
      setIsLoading(false);
    }, 1500); // Simulate 1.5 seconds loading time
  };

  return (
    <motion.div variants={itemVariants}>
       <Card className="shadow-lg border-primary/10 h-full">
         {/* Responsive Card Header */}
         <CardHeader className="p-4 sm:p-6 md:p-8">
           <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl text-primary">
             <Loader className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" /> Loading Simulation {/* Responsive Icon */}
           </CardTitle>
           <CardDescription className="text-sm sm:text-base md:text-lg">
             Simulate fetching data with loading state.
           </CardDescription>
         </CardHeader>
         {/* Responsive Card Content */}
         <CardContent className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8 p-4 sm:p-6 md:p-8">
           <Button
             onClick={handleFetchData}
             disabled={isLoading}
             className="w-full sm:w-auto text-sm sm:text-base md:text-lg py-2.5 sm:py-3 md:py-3.5 px-4 sm:px-6 md:px-8" // Responsive Button
           >
             {isLoading ? (
               <>
                 <motion.div
                   animate={{ rotate: 360 }}
                   transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                   className="mr-2"
                 >
                   <Loader className="h-4 w-4 sm:h-5 sm:w-5" /> {/* Responsive Icon */}
                 </motion.div>
                 Fetching Data...
               </>
             ) : (
               'Fetch Mock Data'
             )}
           </Button>
           <div className="mt-4 h-16 sm:h-20 md:h-24 w-full p-4 border border-dashed rounded-md flex items-center justify-center bg-muted/30">
             {isLoading ? (
               <div className="w-full space-y-2">
                  <Skeleton className="h-4 md:h-5 w-3/4" />
                  <Skeleton className="h-4 md:h-5 w-1/2" />
               </div>
             ) : mockData ? (
               <motion.p
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-center text-sm sm:text-base md:text-lg text-green-600 dark:text-green-400 font-medium"
               >
                 {mockData}
               </motion.p>
             ) : (
               <p className="text-center text-sm sm:text-base md:text-lg text-muted-foreground">
                 Click the button to fetch data.
               </p>
             )}
           </div>
         </CardContent>
       </Card>
    </motion.div>
  );
}
