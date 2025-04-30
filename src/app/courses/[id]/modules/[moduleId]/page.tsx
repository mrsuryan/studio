
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Video, CheckCircle, Circle, FileText } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from 'react';
import { allCourses } from '@/data/courses'; // Import shared course data

interface ModulePageProps {
  params: {
    id: string; // Course ID
    moduleId: string; // Module ID
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

// Placeholder for fetching module details (replace with actual logic)
const findModuleData = (courseId: number, moduleId: string) => {
  const course = allCourses.find(c => c.id === courseId);
  if (!course) return null;
  const module = course.modules.find(m => m.id === moduleId);
  if (!module) return null;
  // Return course title along with module details
  return { courseTitle: course.title, ...module };
};

export default function ModulePage({ params }: ModulePageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [moduleData, setModuleData] = useState<ReturnType<typeof findModuleData>>(null);
  const courseId = parseInt(params.id, 10);

  useEffect(() => {
    // Simulate fetching data
    setIsLoading(true);
    const data = findModuleData(courseId, params.moduleId);
    setModuleData(data);
    setTimeout(() => setIsLoading(false), 300); // Simulate loading time
  }, [params.id, params.moduleId, courseId]);

  if (isLoading) {
    return (
      <motion.div
        className="space-y-8 md:space-y-10 lg:space-y-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Skeleton className="h-9 w-36 mb-6 md:mb-8" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-6 md:mb-8" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Skeleton className="aspect-video w-full rounded-lg mb-6" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-20 w-full" />
        </motion.div>
      </motion.div>
    );
  }

  if (!moduleData) {
    return (
      <motion.div
          className="text-center py-16 sm:py-20 md:py-24"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
       >
         <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-destructive mb-4 md:mb-5">Module Not Found</h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">We couldn't find the module you were looking for in this course.</p>
         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
             <Button variant="outline" asChild className="mt-4 transition-transform hover:scale-105 text-sm sm:text-base md:text-lg md:py-2.5 md:px-5">
               <Link href={`/courses/${params.id}`}>
                 <ArrowLeft className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Back to Course Details
               </Link>
             </Button>
         </motion.div>
      </motion.div>
    );
  }

  const { courseTitle, title: moduleTitle, completed } = moduleData;

  return (
    <motion.div
      className="space-y-8 md:space-y-10 lg:space-y-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Back Button */}
      <motion.div variants={itemVariants}>
        <Button variant="outline" size="sm" asChild className="mb-4 sm:mb-6 md:mb-8 group transition-all hover:bg-accent hover:text-accent-foreground text-xs sm:text-sm md:text-base md:py-2 md:px-4">
          <Link href={`/courses/${params.id}`}>
            <ArrowLeft className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to {courseTitle || 'Course'}
          </Link>
        </Button>
      </motion.div>

      {/* Module Title and Status */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary flex items-center gap-2 sm:gap-3">
          <Video className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10" />
          {moduleTitle}
        </h1>
        <div className={`flex items-center gap-1.5 text-sm sm:text-base font-medium px-3 py-1 rounded-full ${completed ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' : 'bg-blue-100 text-primary dark:bg-primary/20 dark:text-primary/90'}`}>
          {completed ? <CheckCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
          <span>{completed ? 'Completed' : 'In Progress'}</span>
        </div>
      </motion.div>

      {/* Video Player Placeholder */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden shadow-lg border-primary/10 rounded-lg">
          <CardHeader className="p-0 relative bg-muted">
            <motion.div
              className="aspect-video w-full flex items-center justify-center text-muted-foreground bg-gradient-to-br from-muted to-background"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              {/* Placeholder Icon/Text */}
              <div className="text-center space-y-2">
                 <Video className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 mx-auto opacity-50" />
                 <p className="text-lg sm:text-xl md:text-2xl">Video Content Area</p>
                 <p className="text-xs sm:text-sm text-muted-foreground/70">(Video Player Coming Soon)</p>
              </div>
              {/* You would embed your video player component here */}
              {/* Example: <YourVideoPlayerComponent src="..." /> */}
            </motion.div>
          </CardHeader>
          {/* Optional: Add video controls or description in CardContent */}
          {/* <CardContent className="p-4">
            <p>Video description or controls...</p>
          </CardContent> */}
        </Card>
      </motion.div>

      {/* Module Content/Resources Section */}
      <motion.div variants={itemVariants}>
        <Card className="shadow-md border-accent/10 rounded-lg">
          <CardHeader className="p-4 sm:p-6 md:p-8">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl flex items-center gap-2">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-accent" />
              Resources & Notes
            </CardTitle>
            <CardDescription className="text-sm sm:text-base md:text-lg">
              Additional materials and key takeaways for this module.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 md:p-8 pt-0 space-y-4">
            {/* Placeholder for resources */}
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
              Downloadable resources, links, and text content for the '{moduleTitle}' module will be displayed here. Check back soon for updates!
            </p>
            {/* Example Resource Link */}
             <motion.div whileHover={{ scale: 1.03 }} className="inline-block">
                 <Button variant="outline" size="sm" className="text-xs sm:text-sm md:text-base">
                   <FileText className="mr-2 h-4 w-4" /> Download Lecture Notes (PDF)
                 </Button>
             </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation Buttons (Next/Previous Module) */}
      <motion.div variants={itemVariants} className="flex justify-between mt-8 md:mt-12">
        {/* Placeholder for Previous Module Button */}
        <Button variant="outline" disabled>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous Module
        </Button>
        {/* Placeholder for Next Module Button */}
         <Button variant="default" disabled>
           Next Module <ArrowRight className="ml-2 h-4 w-4" />
         </Button>
      </motion.div>

    </motion.div>
  );
}
