
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
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Slightly faster stagger
      delayChildren: 0.1, // Start slightly earlier
    },
  },
};

export default function DashboardPage() {
  return (
    <motion.div
      className="space-y-8 md:space-y-10" // Adjusted spacing
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-primary mb-6 md:mb-8 flex items-center gap-2 sm:gap-3" // Responsive font size and gap
        variants={cardVariants}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 sm:h-8 sm:w-8"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
        Dashboard Overview
      </motion.h1>
      {/* Responsive Grid */}
      <motion.div
        className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
      >
        <motion.div variants={cardVariants}>
          <Link href="/courses" className="block h-full">
            {/* Enhanced Card Styling */}
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-gradient-to-br from-card via-primary/5 to-transparent border-l-4 border-primary/50 hover:border-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4 sm:px-6"> {/* Adjusted padding */}
                <CardTitle className="text-lg sm:text-xl font-medium">My Courses</CardTitle>
                <BookOpenCheck className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </CardHeader>
              <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6"> {/* Adjusted padding */}
                <div className="text-xl sm:text-2xl font-bold text-primary">+5</div>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">
                  View and manage your enrolled courses.
                </p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={cardVariants}>
           <Link href="/assignments" className="block h-full">
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-gradient-to-br from-card via-accent/5 to-transparent border-l-4 border-accent/50 hover:border-accent">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl font-medium">Upcoming Deadlines</CardTitle>
                <CalendarClock className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
              </CardHeader>
              <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                 <div className="text-xl sm:text-2xl font-bold text-accent">3 Assignments</div>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">
                  Stay on track with assignment due dates.
                </p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Link href="/activities" className="block h-full">
             <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-gradient-to-br from-card via-secondary/10 to-transparent border-l-4 border-secondary/50 hover:border-muted-foreground">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl font-medium">Recent Activity</CardTitle>
                <History className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                <div className="text-xl sm:text-2xl font-bold text-muted-foreground">Last Login: Yesterday</div>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">
                  See your latest interactions and progress.
                </p>
              </CardContent>
            </Card>
           </Link>
        </motion.div>
      </motion.div>

      {/* Placeholder - ensure it's also responsive */}
       <motion.div variants={cardVariants}>
         <Card className="border-primary/10">
            <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
                <CardTitle className="text-xl sm:text-2xl">Learning Progress</CardTitle>
            </CardHeader>
             <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                 <p className="text-muted-foreground text-sm sm:text-base">Charts and summaries of your learning journey will appear here.</p>
                 {/* Example placeholder */}
                 <div className="mt-4 h-32 sm:h-40 bg-muted rounded-md flex items-center justify-center text-muted-foreground border border-dashed">
                     Progress Chart Area
                 </div>
            </CardContent>
         </Card>
      </motion.div>

    </motion.div>
  );
}
