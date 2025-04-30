
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenCheck, CalendarClock, History } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12, // Adjusted damping for smoother spring
    },
  },
  hover: {
    scale: 1.03, // Slightly increased hover scale
    boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.08)", // Enhanced shadow on hover
    transition: { type: "spring", stiffness: 300, damping: 15 } // Spring transition for hover
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Faster stagger
      delayChildren: 0.1, // Start slightly earlier
    },
  },
};

export default function DashboardPage() {
  return (
    <motion.div
      className="space-y-8 md:space-y-10 lg:space-y-12" // Adjusted spacing for larger screens
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
         className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6 md:mb-8 lg:mb-10 flex items-center gap-2 sm:gap-3" // Responsive font size and gap
        variants={cardVariants} // Use card variant for initial animation
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg> {/* Responsive Icon Size */}
        Dashboard Overview
      </motion.h1>
      {/* Responsive Grid */}
      <motion.div
        className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" // Adjusted gaps
        variants={containerVariants}
      >
        <motion.div variants={cardVariants} whileHover="hover">
          <Link href="/courses" className="block h-full">
            {/* Enhanced Card Styling */}
             <Card className="h-full transition-shadow duration-300 cursor-pointer bg-gradient-to-br from-card via-primary/5 to-transparent border-l-4 border-primary/50 hover:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"> {/* Added focus ring */}
               {/* Responsive Card Header */}
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4 sm:px-6">
                 <CardTitle className="text-lg sm:text-xl md:text-2xl font-medium">My Courses</CardTitle>
                  <motion.div whileHover={{ rotate: 10, scale: 1.1 }}> {/* Icon animation */}
                      <BookOpenCheck className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary" /> {/* Responsive Icon */}
                 </motion.div>
               </CardHeader>
               {/* Responsive Card Content */}
               <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                 <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">+5</div>
                 <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-1">
                   View and manage your enrolled courses.
                 </p>
               </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={cardVariants} whileHover="hover">
           <Link href="/assignments" className="block h-full">
             <Card className="h-full transition-shadow duration-300 cursor-pointer bg-gradient-to-br from-card via-accent/5 to-transparent border-l-4 border-accent/50 hover:border-accent focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2"> {/* Added focus ring */}
               {/* Responsive Card Header */}
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4 sm:px-6">
                 <CardTitle className="text-lg sm:text-xl md:text-2xl font-medium">Upcoming Deadlines</CardTitle>
                 <motion.div whileHover={{ scale: 1.15 }}> {/* Icon animation */}
                      <CalendarClock className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-accent" /> {/* Responsive Icon */}
                  </motion.div>
               </CardHeader>
               {/* Responsive Card Content */}
               <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-accent">3 Assignments</div>
                 <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-1">
                   Stay on track with assignment due dates.
                 </p>
               </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={cardVariants} whileHover="hover">
          <Link href="/activities" className="block h-full">
              <Card className="h-full transition-shadow duration-300 cursor-pointer bg-gradient-to-br from-card via-secondary/10 to-transparent border-l-4 border-secondary/50 hover:border-muted-foreground focus-within:ring-2 focus-within:ring-muted-foreground focus-within:ring-offset-2"> {/* Added focus ring */}
               {/* Responsive Card Header */}
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4 sm:px-6">
                 <CardTitle className="text-lg sm:text-xl md:text-2xl font-medium">Recent Activity</CardTitle>
                 <motion.div whileHover={{ rotate: -15 }}> {/* Icon animation */}
                     <History className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-muted-foreground" /> {/* Responsive Icon */}
                 </motion.div>
               </CardHeader>
               {/* Responsive Card Content */}
               <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                 <div className="text-xl sm:text-2xl md:text-3xl font-bold text-muted-foreground">Last Login: Yesterday</div>
                 <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-1">
                   See your latest interactions and progress.
                 </p>
               </CardContent>
            </Card>
           </Link>
        </motion.div>
      </motion.div>

      {/* Placeholder - ensure it's also responsive */}
       <motion.div variants={cardVariants}> {/* Use card variant for animation */}
          <Card className="border-primary/10 overflow-hidden"> {/* Added overflow hidden */}
             {/* Responsive Card Header */}
             <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6 md:pt-8">
                 <CardTitle className="text-xl sm:text-2xl md:text-3xl">Learning Progress</CardTitle>
             </CardHeader>
             {/* Responsive Card Content */}
              <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 md:pb-8">
                  <p className="text-muted-foreground text-sm sm:text-base md:text-lg">Charts and summaries of your learning journey will appear here.</p>
                  {/* Example placeholder with subtle background pattern */}
                  <motion.div
                      className="mt-4 h-32 sm:h-40 md:h-48 lg:h-56 bg-muted rounded-md flex items-center justify-center text-muted-foreground border border-dashed text-base md:text-lg relative overflow-hidden"
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                   >
                       {/* Add a subtle animated background pattern */}
                      <motion.div
                           className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 opacity-50"
                           initial={{ x: "-100%" }}
                           animate={{ x: "100%" }}
                           transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="relative z-10">Progress Chart Area</span>
                  </motion.div>
             </CardContent>
          </Card>
      </motion.div>

    </motion.div>
  );
}
