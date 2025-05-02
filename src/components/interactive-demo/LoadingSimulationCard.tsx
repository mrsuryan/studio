"use client"; // Mark as Client Component because it uses useState

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader, Check } from 'lucide-react'; // Added Check icon

// Animation Variants
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
   hover: { // Added hover variant for the card
     scale: 1.03,
     boxShadow: "0 6px 20px rgba(0,0,0,0.07)", // Enhanced shadow on hover
     transition: { duration: 0.2, ease: "easeOut" }
   }
};

const statusAreaVariants = {
   initial: { opacity: 0, height: 0 },
   animate: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeOut' } },
   exit: { opacity: 0, height: 0, transition: { duration: 0.2, ease: 'easeIn' } }
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
    <motion.div variants={itemVariants} whileHover="hover"> {/* Apply hover variant */}
       <Card className="shadow-lg border-primary/10 h-full rounded-lg overflow-hidden"> {/* Added rounding and overflow */}
         {/* Responsive Card Header */}
         <CardHeader className="p-4 sm:p-6 md:p-8">
           <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl text-primary">
             {/* Animated Loader Icon */}
             <motion.div
                 initial={{ scale: 0.8 }}
                 animate={{ rotate: isLoading ? 360 : 0, scale: 1 }} // Rotate when loading
                 transition={isLoading ? { repeat: Infinity, duration: 1, ease: 'linear' } : { type: 'spring' }}
             >
                 <Loader className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
             </motion.div>
              Loading Simulation {/* Responsive Icon */}
           </CardTitle>
           <CardDescription className="text-sm sm:text-base md:text-lg">
             Simulate fetching data with loading state.
           </CardDescription>
         </CardHeader>
         {/* Responsive Card Content */}
         <CardContent className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8 p-4 sm:p-6 md:p-8">
           {/* Animated Button */}
           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
             <Button
               onClick={handleFetchData}
               disabled={isLoading}
               className="w-full sm:w-auto text-sm sm:text-base md:text-lg py-2.5 sm:py-3 md:py-3.5 px-4 sm:px-6 md:px-8 transition-colors duration-200" // Added transition, responsive styles
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
           </motion.div>
           {/* Animated Status Area */}
           <div className="mt-4 h-24 sm:h-28 md:h-32 w-full p-4 border border-dashed rounded-md flex items-center justify-center bg-muted/30 overflow-hidden">
             <AnimatePresence mode="wait"> {/* Use mode="wait" for smooth transitions between states */}
               {isLoading ? (
                 // Loading Skeletons
                 <motion.div
                    key="loading"
                    variants={statusAreaVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full space-y-2"
                 >
                    <Skeleton className="h-4 md:h-5 w-3/4" />
                    <Skeleton className="h-4 md:h-5 w-1/2" />
                 </motion.div>
               ) : mockData ? (
                 // Success Message
                 <motion.div
                    key="success"
                    variants={statusAreaVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex items-center justify-center gap-2 text-center text-sm sm:text-base md:text-lg text-green-600 dark:text-green-400 font-medium"
                  >
                     {/* Animated Check Icon */}
                     <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring" }}>
                       <Check className="h-5 w-5 sm:h-6 sm:w-6" />
                     </motion.div>
                     <span>{mockData}</span>
                 </motion.div>
               ) : (
                 // Initial Prompt
                 <motion.p
                    key="initial"
                    variants={statusAreaVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-center text-sm sm:text-base md:text-lg text-muted-foreground"
                 >
                   Click the button to fetch data.
                 </motion.p>
               )}
             </AnimatePresence>
           </div>
         </CardContent>
       </Card>
    </motion.div>
  );
}
