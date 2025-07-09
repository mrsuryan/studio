
"use client"; // Mark as Client Component for Framer Motion and dynamic imports

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BookOpen, Info, CheckCircle, Users, Zap } from "lucide-react"; // Added Users, Zap, CheckCircle
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Import Tooltip components

// --- Dynamic Imports ---

// Dynamically import the FeaturedCoursesSection with SSR disabled
const FeaturedCoursesSection = dynamic(
  () => import('@/components/home/FeaturedCoursesSection').then(mod => mod.FeaturedCoursesSection),
  {
    ssr: false, // Disable Server-Side Rendering for this component
    loading: () => <Skeleton className="h-[400px] w-full rounded-lg" /> // Loading Skeleton
  }
);

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1, // Add slight delay for container elements
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
      damping: 12, // Added damping for smoother spring
    },
  },
};

const featureCardVariants = {
   hidden: { opacity: 0, scale: 0.9 },
   visible: {
     opacity: 1,
     scale: 1,
     transition: {
       duration: 0.4,
       ease: "easeOut",
     },
   },
   hover: {
     scale: 1.05,
     boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.08)",
     transition: { duration: 0.2, ease: "easeInOut" }
   }
 };


// Mock Features Data
const features = [
  { icon: BookOpen, title: "Diverse Course Catalog", description: "Explore a wide range of courses across various domains." },
  { icon: Users, title: "Track Your Progress", description: "Monitor your learning journey with detailed progress tracking." },
  { icon: CheckCircle, title: "Engaging Assignments", description: "Test your knowledge with interactive assignments and quizzes." },
  { icon: Zap, title: "Interactive Learning", description: "Experience hands-on learning with interactive demos and exercises." },
];


// --- Main Page Component ---

export default function Home() {
  // Mock student count - replace with actual data if available
  const studentCount = 12345; // Example count

  return (
    <motion.div className="space-y-16 md:space-y-20 lg:space-y-24">

      {/* Hero Section */}
      <motion.section
        className="text-center py-16 sm:py-20 md:py-24 px-4 rounded-xl bg-card/60 shadow-lg overflow-hidden relative" // Increased padding, added relative and overflow hidden
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background subtle animated gradient or pattern (Optional) */}
        {/* <div className="absolute inset-0 -z-10 opacity-10 dark:opacity-5"> */}
          {/* Example: Animated gradient */}
          {/* <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-primary via-accent to-secondary"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          ></motion.div> */}
        {/* </div> */}

        {/* Content aligned above the background effect */}
        <div className="relative z-10">
             <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-primary mb-4 sm:mb-5" // Increased font size, added tracking
              variants={itemVariants}
            >
              Welcome to EduHub Portal
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12" // Increased font size and margins
              variants={itemVariants}
              transition={{ delay: 0.1 }}
            >
              Your ultimate gateway to knowledge. Explore, learn, and grow with our interactive platform.
            </motion.p>

             {/* Call to Action and Student Count */}
             <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
                variants={itemVariants}
                transition={{ delay: 0.2 }}
             >
                 {/* Get Started Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                   <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg md:text-xl py-3 sm:py-3.5 md:py-4 px-6 sm:px-8 md:px-10 rounded-full group">
                      <Link href="/courses">
                        Get Started Now <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                   </Button>
                 </motion.div>

                 {/* Student Count */}
                 <motion.div
                     className="flex items-center gap-2 text-sm sm:text-base md:text-lg text-muted-foreground bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 shadow-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                 >
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                     <span>Join <span className="font-semibold text-foreground">{studentCount.toLocaleString()}</span>+ learners</span>
                  </motion.div>
             </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
       <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10" // Keep relative if other absolute elements are needed
      >
         <motion.h2
             className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 md:mb-12 text-center text-primary" // Centered heading
            variants={itemVariants}
          >
             Why Choose EduHub?
        </motion.h2>
        <motion.div
             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" // 4 columns for features
             variants={containerVariants} // Stagger feature cards
        >
           {features.map((feature, index) => (
            <motion.div
                 key={index}
                 variants={featureCardVariants}
                 whileHover="hover" // Apply hover variant
            >
               <Card className="text-center h-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/60 rounded-lg overflow-hidden bg-card">
                 <CardHeader className="p-6">
                    <motion.div
                       className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit" // Circle background for icon
                       initial={{ scale: 0 }}
                       animate={{ scale: 1 }}
                       transition={{ delay: 0.1 + index * 0.05, type: 'spring', stiffness: 150 }}
                     >
                       <feature.icon className="h-8 w-8 text-primary" /> {/* Larger Icon */}
                     </motion.div>
                     <CardTitle className="text-lg sm:text-xl md:text-2xl">{feature.title}</CardTitle>
                 </CardHeader>
                 <CardContent className="p-6 pt-0">
                    <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
                 </CardContent>
               </Card>
             </motion.div>
           ))}
        </motion.div>
       </motion.section>


      {/* Featured Courses Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10" // Keep relative if other absolute elements are needed
      >
        <motion.h2
           className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 md:mb-8 text-primary flex items-center gap-2" // Responsive Heading
          variants={itemVariants}
        >
             <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"/> Featured Courses
             {/* Wrap Info icon with Tooltip */}
             <TooltipProvider delayDuration={100}>
                 <Tooltip>
                     <TooltipTrigger asChild>
                          <Info className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
                     </TooltipTrigger>
                     <TooltipContent>
                         <p>Explore some of our most popular courses.</p>
                     </TooltipContent>
                 </Tooltip>
             </TooltipProvider>
        </motion.h2>

        {/* Dynamically Loaded Featured Courses */}
        <FeaturedCoursesSection />


         <motion.div
            className="text-center mt-10 md:mt-12 lg:mt-16" // Adjusted margin top
            variants={itemVariants}
            transition={{ delay: 0.2 }} // Add delay to this button
         >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <Button size="lg" asChild className="transition-transform duration-200 ease-in-out text-base sm:text-lg md:text-xl py-3 sm:py-3.5 md:py-4 px-6 sm:px-8 md:px-10 rounded-full group border border-primary text-primary hover:bg-primary hover:text-primary-foreground" variant="outline">
                 <Link href="/courses">
                   View All Courses <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform duration-200" />
                 </Link>
               </Button>
            </motion.div>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
