"use client"; // Client component for interactivity if needed

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-15rem)]" // Adjusted height
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 150 }}
      >
        <AlertTriangle className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-destructive mb-4 sm:mb-6" />
      </motion.div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-destructive mb-2 sm:mb-3">404 - Page Not Found</h1>
      <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button asChild size="lg" className="text-base sm:text-lg md:text-xl py-3 sm:py-3.5 px-6 sm:px-8 rounded-full">
          <Link href="/">Go Back Home</Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
