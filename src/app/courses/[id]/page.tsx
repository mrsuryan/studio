"use client"; // Mark as Client Component for hooks and interactivity

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, usePathname, useParams } from "next/navigation"; // Import App Router hooks
import Image from 'next/image';
import { ArrowLeft, PlayCircle, CheckCircle, BookText, ArrowRight, Award } from "lucide-react"; // Added Award icon
import { motion } from "framer-motion";
import { allCourses } from '@/data/courses'; // Import shared course data
import React from 'react'; // Import React

interface CoursePageProps {
  // params types handled by useParams hook
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Adjusted stagger
      delayChildren: 0.15, // Slightly earlier delay
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
      damping: 13, // Slightly more damping
    },
  },
};

const moduleItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
        type: "spring", // Use spring for module items too
        stiffness: 110,
        damping: 14,
    }
  },
  hover: { // Add hover effect for modules
     backgroundColor: "hsl(var(--muted))",
     scale: 1.02,
     boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
     transition: { duration: 0.2, ease: "easeOut" }
  }
};

export default function CourseDetailPage() { // Removed props parameter
  const router = useRouter(); // Initialize router
  const params = React.use(useParams()); // Unwrap params promise
  const courseId = parseInt(params.id as string, 10); // Extract and parse the ID
  // In a real app, fetch course data based on ID. For now, find in mock data.
  const course = allCourses.find(c => c.id === courseId);

  // Function to handle clicking a module - navigates to the module page
  const handleModuleAction = (moduleId: string) => {
    // Navigate to the specific module page using App Router's push
    router.push(`/courses/${courseId}/modules/${moduleId}`);
  };

  // Mock logic: Consider course complete if progress is 100% or all modules are completed
  const isCourseComplete = course && (course.progress === 100 || course.modules.every(m => m.completed));


  if (!course) {
    return (
       <motion.div
          className="text-center py-16 sm:py-20 md:py-24" // Adjusted padding
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }} // Added ease
       >
         {/* Responsive Not Found Message */}
         <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-destructive mb-4 md:mb-5">Course Not Found</h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">We couldn't find the course you were looking for.</p>
         {/* Responsive Button with animation */}
         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" asChild className="mt-4 transition-transform hover:scale-105 text-sm sm:text-base md:text-lg md:py-2.5 md:px-5">
               <Link href="/courses">
                 <ArrowLeft className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Back to All Courses {/* Responsive Icon */}
               </Link>
             </Button>
         </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-8 md:space-y-10 lg:space-y-12" // Adjusted spacing
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
       <motion.div variants={itemVariants}>
          {/* Responsive Back Button */}
          <Button variant="outline" size="sm" asChild className="mb-4 sm:mb-6 md:mb-8 group transition-all hover:bg-accent hover:text-accent-foreground text-xs sm:text-sm md:text-base md:py-2 md:px-4">
            <Link href="/courses">
              <ArrowLeft className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 group-hover:-translate-x-1 transition-transform duration-200" /> Back to Courses {/* Responsive Icon */}
            </Link>
          </Button>
       </motion.div>
       <motion.h1
           className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary flex items-center gap-2 sm:gap-3" // Responsive font size and gap
          variants={itemVariants}
        >
            {/* Animated Icon */}
            <motion.div
                initial={{ rotate: -10, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
            >
               <BookText className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10"/>
            </motion.div>
             {course.title} {/* Responsive Icon */}
       </motion.h1>

       {/* Certificate Button (Conditional) */}
       {isCourseComplete && (
          <motion.div variants={itemVariants} className="flex justify-end">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="default"
                size="lg"
                asChild
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg md:text-xl py-3 sm:py-3.5 md:py-4 px-6 sm:px-8 md:px-10 rounded-full group"
             >
                <Link href={`/certificate/${courseId}`}>
                    <Award className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    View Certificate
                </Link>
            </Button>
            </motion.div>
          </motion.div>
       )}

      {/* Responsive Grid for Course Details and Modules */}
       <motion.section
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12" // Adjusted gaps, changed breakpoint to lg
        variants={containerVariants} // Stagger children within the grid
      >
         {/* Course Description Column */}
          <motion.div className="lg:col-span-2 space-y-6 md:space-y-8" variants={itemVariants}>
             <Card className="overflow-hidden shadow-lg border-primary/10 rounded-lg"> {/* Ensure rounded corners */}
                 <CardHeader className="p-0 relative overflow-hidden"> {/* Add overflow hidden */}
                      {/* Responsive Image Handling with hover effect */}
                      <motion.div
                          className="aspect-video w-full relative" // Added relative positioning
                          whileHover={{ scale: 1.03 }} // Gentle scale on hover
                          transition={{ duration: 0.3 }}
                      >
                          <Image
                             src={course.image}
                             alt={course.title}
                             layout="fill" // Use fill layout for responsiveness
                             objectFit="cover" // Cover the container
                             className="rounded-t-lg" // Removed hover effect from here
                             data-ai-hint="online course learning"
                             priority // Prioritize loading the main course image
                         />
                      </motion.div>
                       <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-lg"></div> {/* Ensure gradient also rounds */}
                       {/* Optional: Add overlay text */}
                 </CardHeader>
                 {/* Responsive Card Content */}
                 <CardContent className="p-4 sm:p-6 md:p-8 pt-6 md:pt-8">
                      <CardDescription className="text-base sm:text-lg md:text-xl leading-relaxed">{course.description}</CardDescription>
                 </CardContent>
             </Card>
          </motion.div>

        {/* Course Modules Column */}
         <motion.div className="lg:col-span-1 space-y-5 md:space-y-6" variants={itemVariants}>
             {/* Responsive Heading */}
             <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">Course Modules</h2>
              <Card className="shadow-md border-accent/10 rounded-lg"> {/* Ensure rounded corners */}
                 {/* Responsive Card Content */}
                 <CardContent className="pt-4 sm:pt-6 md:pt-8 space-y-3 sm:space-y-4 md:space-y-5">
                     {course.modules.map((module, index) => (
                          <motion.div
                             key={module.id}
                             className="flex items-center justify-between p-3 sm:p-4 md:p-5 rounded-lg border bg-muted/30 transition-all duration-200 ease-in-out hover:border-primary/50 cursor-pointer" // Added cursor-pointer
                             variants={moduleItemVariants}
                             whileHover="hover" // Apply hover animation
                             initial="hidden" // Apply initial for stagger
                             animate="visible" // Apply visible for stagger
                             custom={index} // Pass index for potential custom delay logic
                             transition={{ delay: index * 0.06 }} // Slightly adjusted delay
                             onClick={() => handleModuleAction(module.id)} // Make the whole div clickable and pass module ID
                          >
                              <div className="flex items-center gap-3 sm:gap-4 md:gap-5"> {/* Adjusted gap */}
                                 {module.completed ? (
                                     <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * 0.06 + 0.1, type: "spring" }}>
                                         <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-green-500" /> {/* Responsive icon size */}
                                     </motion.div>
                                 ) : (
                                     <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * 0.06 + 0.1, type: "spring" }}>
                                         <PlayCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary" /> {/* Responsive icon size */}
                                      </motion.div>
                                 )}
                                 <span className={`text-sm sm:text-base md:text-lg ${module.completed ? 'text-muted-foreground line-through' : 'font-medium'}`}>{module.title}</span>
                              </div>
                               {/* Keep button for visual cue, but main click is on div */}
                              <Button
                                 variant="ghost"
                                 size="sm"
                                 className="text-primary hover:text-primary/80 hover:bg-primary/10 group text-xs sm:text-sm md:text-base px-2 sm:px-3 md:py-1.5 md:px-4 pointer-events-none" // Make button non-interactive directly
                                 tabIndex={-1} // Remove from tab order
                               >
                                 {module.completed ? 'Review' : 'Start'}
                                 <ArrowRight className="ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"/> {/* Responsive Icon */}
                             </Button>
                         </motion.div>
                     ))}
                      {course.modules.length === 0 && (
                         <motion.p
                            className="text-sm sm:text-base md:text-lg text-muted-foreground text-center py-4 sm:py-6 md:py-8" // Adjusted padding/font size
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                         >
                            No modules available for this course yet.
                          </motion.p>
                     )}
                 </CardContent>
             </Card>
         </motion.div>
       </motion.section>
    </motion.div>
  );
}
