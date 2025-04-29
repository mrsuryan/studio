
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

const activityColors: Record<ActivityType, string> = {
    lesson_complete: 'text-green-500',
    quiz_submit: 'text-blue-500',
    course_start: 'text-primary',
    grade_receive: 'text-purple-500',
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
      staggerChildren: 0.1,
      delayChildren: 0.2,
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
    },
  },
};


export default function ActivitiesPage() {
  return (
    <motion.div
      className="space-y-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-4xl font-bold text-primary mb-8 flex items-center gap-3"
        variants={itemVariants} // Use item variant for the title
      >
        <BellRing className="h-9 w-9" /> Recent Activities Feed
      </motion.h1>

       <Card className="shadow-lg border-primary/10">
         <CardContent className="pt-6 space-y-6">
           {activities.map((activity, index) => {
             const Icon = activityIcons[activity.type];
             const iconColor = activityColors[activity.type];

             return (
               <motion.div
                key={activity.id}
                className="flex items-start space-x-4 pb-4 border-b last:border-b-0 border-border/50"
                variants={itemVariants}
               >
                  <motion.div
                     className={`mt-1 p-2 rounded-full bg-muted ${iconColor}/10`}
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 150 }}
                   >
                     <Icon className={`h-5 w-5 ${iconColor}`} />
                  </motion.div>
                  <div className="flex-1 space-y-1">
                    <p className="text-base font-medium leading-snug">
                      {activity.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
              </motion.div>
            )})}
          {activities.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-10">
                <Card className="inline-block p-8 border-dashed">
                    <BellRing className="h-16 w-16 mx-auto text-muted-foreground mb-4"/>
                    <p className="text-xl text-muted-foreground">No recent activities to display.</p>
                    <p className="text-base text-muted-foreground mt-2">Start learning to see your progress here!</p>
                </Card>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
