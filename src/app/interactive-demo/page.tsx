
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Rocket, Zap, Plus, Minus, Loader } from 'lucide-react'; // Added Loader

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

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

export default function InteractiveDemoPage() {
  const [count, setCount] = useState(0);
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
    <motion.div
      className="space-y-8 md:space-y-10 lg:space-y-12" // Responsive spacing
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
         className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6 md:mb-8 lg:mb-10 flex items-center gap-2 sm:gap-3" // Responsive heading
        variants={itemVariants}
      >
        <Rocket className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10" /> Interactive Demo & Loading {/* Responsive Icon */}
      </motion.h1>

      <motion.p
         className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl lg:max-w-4xl" // Responsive text size and max-width
        variants={itemVariants}
      >
        This page demonstrates client-side interactivity, state management, and simulated loading states using React hooks and Framer Motion for smooth animations.
      </motion.p>

      {/* Responsive Grid for Cards */}
       <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10" // Responsive gap
        variants={containerVariants}
      >
        {/* Counter Card */}
        <motion.div variants={itemVariants}>
           <Card className="shadow-lg border-accent/10 h-full">
             {/* Responsive Card Header */}
             <CardHeader className="p-4 sm:p-6 md:p-8">
               <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl text-accent">
                 <Zap className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" /> Simple Counter {/* Responsive Icon */}
               </CardTitle>
               <CardDescription className="text-sm sm:text-base md:text-lg">
                 Manage state with useState.
               </CardDescription>
             </CardHeader>
             {/* Responsive Card Content */}
             <CardContent className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8 p-4 sm:p-6 md:p-8">
               <motion.div
                 key={count} // Re-trigger animation on count change
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  className="text-5xl sm:text-6xl md:text-7xl font-bold text-primary" // Responsive text size
               >
                 {count}
               </motion.div>
               <div className="flex space-x-3 sm:space-x-4">
                 <Button
                   variant="outline"
                   size="icon"
                   onClick={() => setCount(count - 1)}
                   aria-label="Decrement count"
                   className="hover:bg-destructive/10 hover:text-destructive h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" // Responsive button size
                 >
                   <Minus className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" /> {/* Responsive Icon */}
                 </Button>
                 <Button
                   variant="outline"
                   size="icon"
                   onClick={() => setCount(count + 1)}
                   aria-label="Increment count"
                   className="hover:bg-primary/10 hover:text-primary h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" // Responsive button size
                 >
                   <Plus className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" /> {/* Responsive Icon */}
                 </Button>
               </div>
             </CardContent>
           </Card>
        </motion.div>

        {/* Loading Simulation Card */}
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
       </motion.div>
    </motion.div>
  );
}
