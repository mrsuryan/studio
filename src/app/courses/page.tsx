
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { allCourses } from '@/data/courses'; // Import shared course data

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06, // Slightly adjusted stagger for smoother appearance
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
  hover: {
    scale: 1.04, // Slightly increased hover scale
    boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.1)", // More pronounced shadow
    transition: { duration: 0.2, ease: "easeInOut" } // Smoother hover transition
  }
};

export default function CoursesPage() {
  return (
    <motion.div
      className="space-y-10 md:space-y-12 lg:space-y-16" // Adjusted spacing
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
       <motion.section variants={itemVariants}> {/* Apply animation to the section header */}
         {/* Responsive Heading */}
         <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3 sm:mb-4 md:mb-5 flex items-center gap-2 sm:gap-3">
            <BookOpen className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10"/> All Courses {/* Responsive Icon */}
         </h1>
         {/* Responsive Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 md:mb-8 lg:mb-10 max-w-3xl"> {/* Adjusted margins and max-width */}
           Browse through our available courses and start learning today. Expand your horizons!
         </p>
        {/* Responsive Grid for Courses */}
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8" // Added xl breakpoint, adjusted gaps
            variants={containerVariants} // Apply container variant for stagger effect
        >
          {allCourses.map((course, index) => ( // Added index for potential priority logic
             <motion.div
                key={course.id}
                variants={itemVariants}
                whileHover="hover" // Apply hover animation variant
             >
                 <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out border border-primary/10 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg hover:shadow-xl hover:border-primary/30"> {/* Added focus ring and rounded-lg */}
                  <CardHeader className="p-0 relative overflow-hidden"> {/* Added relative and overflow hidden */}
                     <motion.div
                          className="aspect-[3/2] w-full"
                          whileHover={{ scale: 1.05 }} // Scale image slightly on hover
                          transition={{ duration: 0.3 }}
                     >
                         <Image
                           src={course.image}
                           alt={course.title}
                           width={300}
                           height={200}
                           className="rounded-t-lg w-full h-full object-cover" // Ensure image covers the area
                           loading={index < 8 ? "eager" : "lazy"} // Eager load first 8 images, lazy load others
                           priority={index < 4} // Prioritize loading first 4 images (above the fold approx)
                         />
                      </motion.div>
                  </CardHeader>
                  {/* Responsive Card Content */}
                  <CardContent className="p-4 sm:p-5 flex-grow">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl mb-2 line-clamp-2">{course.title}</CardTitle> {/* Added line-clamp */}
                    <CardDescription className="text-sm sm:text-base md:text-lg line-clamp-3">{course.description}</CardDescription> {/* Added line-clamp */}
                  </CardContent>
                  {/* Responsive Card Footer */}
                  <CardFooter className="flex flex-col items-start gap-3 p-4 sm:p-5 border-t border-border/60 bg-muted/30">
                     <div className="w-full">
                       <div className="flex justify-between text-xs sm:text-sm md:text-base text-muted-foreground mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                       </div>
                       <Progress value={course.progress} aria-label={`${course.title} progress: ${course.progress}%`} className="h-1.5 sm:h-2 md:h-2.5"/> {/* Adjusted height */}
                     </div>
                     {/* Add hover effect to button */}
                      <motion.div whileHover={{ scale: 1.05 }} className="self-end mt-2">
                         <Button
                            variant={course.progress > 0 ? "outline" : "default"}
                            size="sm"
                            asChild
                             className="transition-transform duration-200 ease-in-out group text-xs sm:text-sm md:text-base" // Added group class
                            >
                            <Link href={`/courses/${course.id}`}>
                              {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                               <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4 md:h-5 md:w-5 transition-transform duration-200 group-hover:translate-x-1" /> {/* Adjusted icon animation */}
                            </Link>
                          </Button>
                      </motion.div>
                  </CardFooter>
                </Card>
             </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
