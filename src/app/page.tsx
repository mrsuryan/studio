
'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BookOpen, Info } from "lucide-react"; // Added Info icon
import { motion } from "framer-motion";
import dynamic from 'next/dynamic'; // Import dynamic
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

// --- Dynamically Imported Component ---

const FeaturedCoursesSection = dynamic(
  () => import('@/components/home/FeaturedCoursesSection').then(mod => mod.FeaturedCoursesSection),
  {
    loading: () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[400px] w-full rounded-lg" /> // Placeholder for course cards
        ))}
      </div>
    ),
    ssr: false, // Might not be necessary to SSR this if interaction is key
  }
);

// --- Main Page Component ---

export default function Home() {
  return (
    <div className="space-y-10 md:space-y-16"> {/* Adjusted spacing */}
      <motion.section
        className="text-center py-10 px-4 sm:py-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 shadow-inner" // Added padding and shadow
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
         {/* Responsive Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary mb-3 sm:mb-4">Welcome to EduHub Portal</h1>
        {/* Responsive Description */}
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
          Your journey to knowledge starts here. Explore our courses and enhance your skills with interactive learning.
        </p>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Responsive Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 md:mb-8 text-primary flex items-center gap-2">
             <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"/> Featured Courses
             {/* Added Info icon for instruction indication */}
             <Info className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-muted-foreground hover:text-foreground transition-colors cursor-help" title="Explore some of our most popular courses." />
        </h2>

        {/* Dynamically Loaded Featured Courses */}
        <FeaturedCoursesSection />

         <motion.div
            className="text-center mt-10 md:mt-12 lg:mt-16" // Adjusted margin top
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5, duration: 0.5 }}
         >
             {/* Responsive Button */}
            <Button size="lg" asChild className="transition-transform duration-200 ease-in-out hover:scale-105 text-base sm:text-lg md:text-xl py-3 sm:py-3.5 md:py-4 px-6 sm:px-8 md:px-10">
                <Link href="/courses">
                    View All Courses <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
            </Button>
        </motion.div>
      </motion.section>
    </div>
  );
}
