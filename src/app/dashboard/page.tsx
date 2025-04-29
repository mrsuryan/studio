
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
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export default function DashboardPage() {
  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-4xl font-bold text-primary mb-8 flex items-center gap-3"
        variants={cardVariants}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
        Dashboard Overview
      </motion.h1>
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
      >
        <motion.div variants={cardVariants}>
          <Link href="/courses" className="block h-full">
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-gradient-to-br from-card to-primary/5 border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">My Courses</CardTitle>
                <BookOpenCheck className="h-6 w-6 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">+5</div>
                <p className="text-base text-muted-foreground mt-1">
                  View and manage your enrolled courses.
                </p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={cardVariants}>
           <Link href="/assignments" className="block h-full">
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-gradient-to-br from-card to-accent/5 border-accent/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">Upcoming Deadlines</CardTitle>
                <CalendarClock className="h-6 w-6 text-accent" />
              </CardHeader>
              <CardContent>
                 <div className="text-2xl font-bold text-accent">3 Assignments</div>
                <p className="text-base text-muted-foreground mt-1">
                  Stay on track with assignment due dates.
                </p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Link href="/activities" className="block h-full">
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-gradient-to-br from-card to-secondary/10 border-secondary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">Recent Activity</CardTitle>
                <History className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-muted-foreground">Last Login: Yesterday</div>
                <p className="text-base text-muted-foreground mt-1">
                  See your latest interactions and progress.
                </p>
              </CardContent>
            </Card>
           </Link>
        </motion.div>
      </motion.div>

      {/* Placeholder for additional dashboard components */}
       <motion.div variants={cardVariants}>
         <Card>
            <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
            </CardHeader>
             <CardContent>
                 <p className="text-muted-foreground">Charts and summaries of your learning journey will appear here.</p>
                 {/* Example placeholder */}
                 <div className="mt-4 h-40 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                     Progress Chart Area
                 </div>
            </CardContent>
         </Card>
      </motion.div>

    </motion.div>
  );
}
