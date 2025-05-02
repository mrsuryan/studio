"use client"; // Mark as Client Component for Framer Motion and Link

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Ensure Button is imported
import { ListChecks, CheckCircle, Clock, CircleHelp, FileText } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link"; // Import Next.js Link

// Mock assignment data
const assignments = [
  { id: 1, title: "HTML Basics Quiz", course: "Introduction to Web Development", dueDate: "2024-08-15", status: "Submitted" },
  { id: 2, title: "React State Management Project", course: "Advanced React Concepts", dueDate: "2024-08-20", status: "Pending" },
  { id: 3, title: "Algorithm Analysis Worksheet", course: "Data Structures and Algorithms", dueDate: "2024-08-25", status: "Pending" },
  { id: 4, title: "CSS Flexbox Challenge", course: "Introduction to Web Development", dueDate: "2024-08-10", status: "Graded" },
  { id: 5, title: "Python Data Cleaning Task", course: "Python for Data Science", dueDate: "2024-09-01", status: "Pending" },
];

// Type definition for status properties
type StatusProps = {
  variant: "default" | "secondary" | "outline" | "destructive" | null | undefined;
  icon: React.ElementType;
  borderColorClass: string; // Added border color class
  textColorClass: string; // Added text color class for consistency
};

// Function to get status properties
const getStatusProps = (status: string): StatusProps => {
  switch (status.toLowerCase()) {
    case 'submitted': return { variant: 'secondary', icon: CheckCircle, borderColorClass: 'border-blue-500', textColorClass: 'text-blue-600 dark:text-blue-400' }; // Blue for submitted
    case 'pending': return { variant: 'default', icon: Clock, borderColorClass: 'border-accent', textColorClass: 'text-accent' }; // Use accent for pending
    case 'graded': return { variant: 'outline', icon: FileText, borderColorClass: 'border-green-500', textColorClass: 'text-green-600 dark:text-green-400' }; // Use green for graded
    default: return { variant: 'secondary', icon: CircleHelp, borderColorClass: 'border-muted-foreground', textColorClass: 'text-muted-foreground' }; // Fallback
  }
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Faster stagger
      delayChildren: 0.1, // Earlier delay
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
      damping: 12,
    },
  },
  hover: {
    scale: 1.02, // Slightly scale up card on hover
    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.07)", // Subtle shadow increase
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

export default function AssignmentsPage() {
  return (
    <motion.div
      className="space-y-8 md:space-y-10 lg:space-y-12" // Adjusted spacing
       initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
         className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6 md:mb-8 lg:mb-10 flex items-center gap-2 sm:gap-3" // Responsive font size and gap
        variants={itemVariants} // Apply item variant for initial animation
      >
         <ListChecks className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10" /> Assignments Overview {/* Responsive Icon */}
      </motion.h1>

      <motion.div className="space-y-4 sm:space-y-5 md:space-y-6" variants={containerVariants}> {/* Apply container variant for stagger */}
        {assignments.map((assignment) => {
          const { variant, icon: Icon, borderColorClass, textColorClass } = getStatusProps(assignment.status);
          return (
            <motion.div
                key={assignment.id}
                variants={itemVariants}
                whileHover="hover" // Apply hover animation
            >
              {/* Added responsive classes and border style */}
              <Card className={`transition-all duration-300 ease-in-out border-l-4 ${borderColorClass} hover:border-primary/50 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 overflow-hidden`}> {/* Added focus ring and overflow hidden */}
                 {/* Responsive Card Header */}
                 <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 p-4 sm:p-6 pb-2 sm:pb-3 md:p-8 md:pb-4">
                   <div className="flex-1">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold">{assignment.title}</CardTitle>
                       <CardDescription className="text-sm sm:text-base md:text-lg mt-1">
                         Course: {assignment.course}
                      </CardDescription>
                   </div>
                    {/* Animated Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.1 }} // Pop effect on hover
                    >
                       <Badge variant={variant} className={`text-xs sm:text-sm md:text-base px-2.5 py-1 sm:px-3 capitalize flex items-center gap-1 sm:gap-1.5 self-start sm:self-center mt-2 sm:mt-0 ${textColorClass} border ${borderColorClass} bg-background`}> {/* Ensure consistent text color and border */}
                          <Icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 ${textColorClass}`}/> {/* Use text color class */}
                          {assignment.status}
                       </Badge>
                    </motion.div>
                 </CardHeader>
                 {/* Responsive Card Content */}
                 <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 pt-2 sm:p-6 sm:pt-2 md:p-8 md:pt-3 gap-3 sm:gap-4">
                   <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
                      Due: <span className="font-medium text-foreground">{assignment.dueDate}</span>
                   </p>
                    {/* Added hover animation to the button's container */}
                    <motion.div whileHover={{ scale: 1.05 }} className="self-end sm:self-center">
                         {/* Add link or button to view/submit assignment */}
                          <Button variant="outline" size="sm" asChild className="group transition-all hover:bg-primary hover:text-primary-foreground text-xs sm:text-sm md:text-base md:py-2 md:px-4"> {/* Responsive button */}
                             <Link href={`/assignments/${assignment.id}`}>
                               View Details
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5 sm:size-4 md:size-5 ml-1.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"> {/* Responsive Icon */}
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                             </Link>
                          </Button>
                    </motion.div>
                 </CardContent>
              </Card>
             </motion.div>
          );
        })}
      </motion.div>
       {assignments.length === 0 && (
          <motion.div variants={itemVariants} className="text-center py-10 md:py-16">
             {/* Responsive Empty State Card with animation */}
             <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 }}
             >
                 <Card className="inline-block p-6 sm:p-8 md:p-10 lg:p-12 border-dashed">
                      <CircleHelp className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 mx-auto text-muted-foreground mb-4 md:mb-6"/> {/* Responsive Icon */}
                     <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground">You have no assignments currently.</p>
                     <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mt-2 md:mt-3">Keep up the great work!</p>
                 </Card>
             </motion.div>
          </motion.div>
        )}
    </motion.div>
  );
}

