
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Plus, Minus } from 'lucide-react';

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

export function CounterCard() {
  const [count, setCount] = useState(0);

  return (
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
  );
}
