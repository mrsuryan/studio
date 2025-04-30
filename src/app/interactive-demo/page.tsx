
'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Rocket, Zap, Plus, Minus, Loader } from 'lucide-react'; // Added Loader
import dynamic from 'next/dynamic'; // Import dynamic

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

// --- Dynamically Imported Components ---

const CounterCard = dynamic(() => import('@/components/interactive-demo/CounterCard').then(mod => mod.CounterCard), {
  loading: () => <Skeleton className="h-[300px] w-full rounded-lg shadow-lg border-accent/10" />, // Taller skeleton
  ssr: false // This component relies heavily on client state
});

const LoadingSimulationCard = dynamic(() => import('@/components/interactive-demo/LoadingSimulationCard').then(mod => mod.LoadingSimulationCard), {
  loading: () => <Skeleton className="h-[300px] w-full rounded-lg shadow-lg border-primary/10" />, // Taller skeleton
  ssr: false // This component relies heavily on client state
});

// --- Main Page Component ---

export default function InteractiveDemoPage() {

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
        This page demonstrates client-side interactivity, state management, and simulated loading states using React hooks and Framer Motion for smooth animations. Components are dynamically loaded for optimized performance.
      </motion.p>

      {/* Responsive Grid for Cards */}
       <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10" // Responsive gap
        variants={containerVariants}
      >
        {/* Dynamically load Counter Card */}
        <Suspense fallback={<Skeleton className="h-[300px] w-full rounded-lg shadow-lg border-accent/10" />}>
          <CounterCard />
        </Suspense>

        {/* Dynamically load Loading Simulation Card */}
        <Suspense fallback={<Skeleton className="h-[300px] w-full rounded-lg shadow-lg border-primary/10" />}>
          <LoadingSimulationCard />
        </Suspense>
       </motion.div>
    </motion.div>
  );
}
