
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
  hover: { // Added hover variant for the card
     scale: 1.03,
     boxShadow: "0 6px 20px rgba(0,0,0,0.07)",
     transition: { duration: 0.2, ease: "easeOut" }
  }
};

export function CounterCard() {
  const [count, setCount] = useState(0);

  return (
    <motion.div variants={itemVariants} whileHover="hover"> {/* Apply hover variant */}
       <Card className="shadow-lg border-accent/10 h-full rounded-lg overflow-hidden"> {/* Added rounding and overflow */}
         {/* Responsive Card Header */}
         <CardHeader className="p-4 sm:p-6 md:p-8">
           <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl text-accent">
             {/* Animated Zap Icon */}
             <motion.div
                 initial={{ rotate: -10 }}
                 animate={{ rotate: [0, 15, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.5 }}
             >
                 <Zap className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
             </motion.div>
             Simple Counter {/* Responsive Icon */}
           </CardTitle>
           <CardDescription className="text-sm sm:text-base md:text-lg">
             Manage state with useState.
           </CardDescription>
         </CardHeader>
         {/* Responsive Card Content */}
         <CardContent className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8 p-4 sm:p-6 md:p-8">
           <motion.div
             key={count} // Re-trigger animation on count change
             initial={{ y: count > 0 ? -10 : 10, opacity: 0, scale: 0.8 }} // Enter from top or bottom based on change direction
             animate={{ y: 0, opacity: 1, scale: 1 }}
             exit={{ y: count > 0 ? 10 : -10, opacity: 0, scale: 0.8 }} // Exit opposite direction
             transition={{ type: 'spring', stiffness: 250, damping: 15 }} // Bouncier spring
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-primary" // Responsive text size
           >
             {count}
           </motion.div>
           <div className="flex space-x-3 sm:space-x-4">
             {/* Animated Button */}
             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
               <Button
                 variant="outline"
                 size="icon"
                 onClick={() => setCount(count - 1)}
                 aria-label="Decrement count"
                 className="hover:bg-destructive/10 hover:text-destructive h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full" // Make button round
               >
                 <Minus className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" /> {/* Responsive Icon */}
               </Button>
             </motion.div>
             {/* Animated Button */}
             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
               <Button
                 variant="outline"
                 size="icon"
                 onClick={() => setCount(count + 1)}
                 aria-label="Increment count"
                 className="hover:bg-primary/10 hover:text-primary h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full" // Make button round
               >
                 <Plus className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" /> {/* Responsive Icon */}
               </Button>
             </motion.div>
           </div>
         </CardContent>
       </Card>
    </motion.div>
  );
}
