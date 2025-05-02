"use client"; // Mark as Client Component for Framer Motion

import { Card, CardContent } from "@/components/ui/card";
import { BellRing, CheckCircle, FileText, GraduationCap, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

// Mock activity data with types
type ActivityType = 'lesson_complete' | 'quiz_submit' | 'course_start' | 'grade_receive';

// Mapping activity types to icons
const activityIcons: Record<ActivityType, React.ElementType> = {
    lesson_complete: CheckCircle,
    quiz_submit: FileText,
    course_start: PlayCircle,
    grade_receive: GraduationCap,
};

// Mapping activity types to colors (using Tailwind classes for theme compatibility)
// Adjusted colors for better contrast/consistency if needed
const activityColors: Record<ActivityType, string> = {
    lesson_complete: 'text-green-600 dark:text-green-400',
    quiz_submit: 'text-blue-600 dark:text-blue-400',
    course_start: 'text-primary', // Using primary theme color
    grade_receive: 'text-purple-600 dark:text-purple-400',
};

// Mock activity data
const activities = [
  { id: 1, type: 'lesson_complete' as ActivityType, description: "Completed 'Introduction to HTML' lesson.", timestamp: "2 hours ago" },
  { id: 2, type: 'quiz_submit' as ActivityType, description: "Submitted 'HTML Basics Quiz'. Score: 90%", timestamp: "1 day ago" },
  { id: 3, type: 'course_start' as ActivityType, description: "Started 'Advanced React Concepts' course.", timestamp: "3 days ago" },
  { id: 4, type: 'grade_receive' as ActivityType, description: "Received grade A for 'CSS Flexbox Challenge'.", timestamp: "5 days ago" },
  { id: 5, type: 'lesson_complete' as ActivityType, description: "Completed 'React Hooks Deep Dive' module.", timestamp: "6 days ago" },
  // Add more mock activities if needed
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07, // Slightly faster stagger
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
   hover: { // Add hover variant
     backgroundColor: "hsl(var(--muted))", // Use muted background on hover
     // scale: 1.01, // Optional subtle scale
     transition: { duration: 0.2, ease: "easeOut" }
   }
};

export default function ActivitiesPage() {
  return (
    <motion.div
      className="space-y-8 md:space-y-10 lg:space-y-12" // Adjusted spacing
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
         className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6 md:mb-8 lg:mb-10 flex items-center gap-2 sm:gap-3" // Responsive font size and gap
        variants={itemVariants} // Use item variant for the title
      >
         {/* Add subtle animation to the icon */}
         <motion.div whileHover={{ rotate: [0, 15, -10, 0], transition: { duration: 0.5 } }}>
            <BellRing className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10" />
         </motion.div>
         Recent Activities Feed {/* Responsive Icon */}
      </motion.h1>

        <Card className="shadow-lg border-primary/10 overflow-hidden"> {/* Added overflow hidden */}
          {/* Responsive Card Content Padding */}
          <CardContent className="p-4 sm:p-6 md:p-8 pt-6 divide-y divide-border/30"> {/* Use divide for separators */}
            {activities.map((activity, index) => {
              const Icon = activityIcons[activity.type];
              const iconColor = activityColors[activity.type];

              return (
                <motion.div
                 key={activity.id}
                 className="flex items-start space-x-3 sm:space-x-4 md:space-x-5 py-4 sm:py-5 md:py-6 first:pt-0 cursor-default transition-colors duration-200 rounded-md -mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8" // Add padding and negative margin for hover effect, cursor
                 variants={itemVariants}
                 whileHover="hover" // Apply hover animation
                 initial="hidden" // Apply initial state for stagger
                 animate="visible" // Apply animate state for stagger
                 // transition={{ delay: index * 0.05 }} // Apply individual delay if needed, container already staggers
                >
                   {/* Icon container with animation */}
                   <motion.div
                      className={`mt-0.5 sm:mt-1 flex-shrink-0 p-1.5 sm:p-2 md:p-2.5 rounded-full bg-muted ${iconColor}/10`} // Responsive padding/margin
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.07 + 0.2, type: "spring", stiffness: 150 }} // Adjusted delay, slightly faster
                    >
                      <Icon className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${iconColor}`} /> {/* Responsive icon size */}
                   </motion.div>
                   {/* Text content */}
                   <div className="flex-1 space-y-0.5 sm:space-y-1 md:space-y-1.5">
                     {/* Responsive Text Size */}
                     <p className="text-sm sm:text-base md:text-lg font-medium leading-snug">
                       {activity.description}
                     </p>
                     <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                       {activity.timestamp}
                     </p>
                   </div>
               </motion.div>
             )})}
           {/* Empty State */}
           {activities.length === 0 && (
             <motion.div
                 variants={itemVariants} // Use item variant for animation
                 className="text-center py-8 sm:py-10 md:py-16"
                 initial="hidden" // Apply initial/animate for consistency if needed
                 animate="visible"
              > {/* Responsive padding */}
                 {/* Responsive Empty State Card */}
                 <Card className="inline-block p-6 sm:p-8 md:p-10 lg:p-12 border-dashed">
                      {/* Animated Icon */}
                      <motion.div
                          initial={{ rotate: -15, y: 10 }}
                          animate={{ rotate: [0, 10, -5, 0], y: 0 }}
                          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
                      >
                         <BellRing className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 mx-auto text-muted-foreground mb-4 md:mb-6"/> {/* Responsive Icon */}
                      </motion.div>
                     <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground">No recent activities to display.</p>
                     <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mt-2 md:mt-3">Start learning to see your progress here!</p>
                 </Card>
             </motion.div>
           )}
         </CardContent>
       </Card>
    </motion.div>
  );
}
