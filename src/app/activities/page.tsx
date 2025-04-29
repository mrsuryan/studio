
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { BellRing, CheckCircle, FileText, GraduationCap, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

// Mock activity data with types
type ActivityType = 'lesson_complete' | 'quiz_submit' | 'course_start' | 'grade_receive';

const activityIcons: Record<ActivityType, React.ElementType> = {
    lesson_complete: CheckCircle,
    quiz_submit: FileText,
    course_start: PlayCircle,
    grade_receive: GraduationCap,
};

// Adjusted colors for better contrast/consistency if needed
const activityColors: Record<ActivityType, string> = {
    lesson_complete: 'text-green-600 dark:text-green-400',
    quiz_submit: 'text-blue-600 dark:text-blue-400',
    course_start: 'text-primary',
    grade_receive: 'text-purple-600 dark:text-purple-400',
};

const activities = [
  { id: 1, type: 'lesson_complete' as ActivityType, description: "Completed 'Introduction to HTML' lesson.", timestamp: "2 hours ago" },
  { id: 2, type: 'quiz_submit' as ActivityType, description: "Submitted 'HTML Basics Quiz'. Score: 90%", timestamp: "1 day ago" },
  { id: 3, type: 'course_start' as ActivityType, description: "Started 'Advanced React Concepts' course.", timestamp: "3 days ago" },
  { id: 4, type: 'grade_receive' as ActivityType, description: "Received grade A for 'CSS Flexbox Challenge'.", timestamp: "5 days ago" },
  { id: 5, type: 'lesson_complete' as ActivityType, description: "Completed 'React Hooks Deep Dive' module.", timestamp: "6 days ago" },
];

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
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
       type: "spring",
       stiffness: 120,
       damping: 12,
    },
  },
};

export default function ActivitiesPage() {
  return (
    <motion.div
      className="space-y-8 md:space-y-10" // Adjusted spacing
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-primary mb-6 md:mb-8 flex items-center gap-2 sm:gap-3" // Responsive font size and gap
        variants={itemVariants} // Use item variant for the title
      >
        <BellRing className="h-7 w-7 sm:h-9 sm:w-9" /> Recent Activities Feed
      </motion.h1>

       <Card className="shadow-lg border-primary/10">
         <CardContent className="p-4 sm:p-6 pt-6 space-y-4 sm:space-y-6"> {/* Responsive padding and spacing */}
           {activities.map((activity, index) => {
             const Icon = activityIcons[activity.type];
             const iconColor = activityColors[activity.type];

             return (
               <motion.div
                key={activity.id}
                className="flex items-start space-x-3 sm:space-x-4 pb-4 border-b last:border-b-0 border-border/50" // Responsive spacing
                variants={itemVariants}
               >
                  {/* Icon container */}
                  <motion.div
                     className={`mt-0.5 sm:mt-1 flex-shrink-0 p-1.5 sm:p-2 rounded-full bg-muted ${iconColor}/10`} // Responsive padding/margin
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 150 }} // Adjusted delay
                   >
                     <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${iconColor}`} /> {/* Responsive icon size */}
                  </motion.div>
                  {/* Text content */}
                  <div className="flex-1 space-y-0.5 sm:space-y-1">
                    <p className="text-sm sm:text-base font-medium leading-snug">
                      {activity.description}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
              </motion.div>
            )})}
          {activities.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-8 sm:py-10"> {/* Responsive padding */}
                <Card className="inline-block p-6 sm:p-8 border-dashed">
                    <BellRing className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-muted-foreground mb-4"/>
                    <p className="text-lg sm:text-xl text-muted-foreground">No recent activities to display.</p>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">Start learning to see your progress here!</p>
                </Card>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
