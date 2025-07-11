"use client"; // Mark as Client Component for Framer Motion and Link

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Use Next.js Link
import Image from 'next/image'; // Use Next.js Image for optimization
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Mock course data - Keep it local to this component, using relevant seeds from the main list
const featuredCourses = [
  { id: 1, title: "Introduction to Web Development", description: "Learn HTML, CSS, and JavaScript fundamentals.", progress: 65, image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwwfHx8fDE3NTIyMjUwOTN8MA&ixlib=rb-4.1.0&q=80&w=1080", aiHint: "web development code screen" },
  { id: 7, title: "Cybersecurity Fundamentals", description: "Basics of cybersecurity threats and defenses.", progress: 10, image: "https://picsum.photos/seed/cybersecurity/300/200", aiHint: "cyber security lock" },
  { id: 21, title: "Introduction to Docker & Kubernetes", description: "Learn containerization and orchestration.", progress: 20, image: "https://picsum.photos/seed/dockerk8s/300/200", aiHint: "docker kubernetes containers" },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger animation of child elements
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
    },
  },
  hover: { // Added hover variant for enhanced effect
     scale: 1.03, // Slightly larger scale on hover
     boxShadow: "0 10px 20px rgba(0,0,0,0.1)", // More prominent shadow
     transition: { duration: 0.2, ease: "easeOut" }
  }
};

export function FeaturedCoursesSection() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      variants={containerVariants}
      initial="hidden" // Start hidden
      animate="visible" // Animate to visible
    >
      {featuredCourses.map((course, index) => (
        <motion.div
          key={course.id}
          variants={itemVariants}
          whileHover="hover" // Apply hover animation variant
        >
           <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out border border-border/60 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg"> {/* Added focus ring and rounded-lg */}
            <CardHeader className="p-0 relative"> {/* Added relative for positioning if needed */}
               {/* Use Next.js Image component */}
               <Image
                src={course.image}
                alt={course.title}
                width={300} // Provide explicit width
                height={200} // Provide explicit height
                className="rounded-t-lg w-full object-cover aspect-[3/2] transition-transform duration-300 group-hover:scale-105" // Added group-hover effect if Card is parent group
                data-ai-hint={course.aiHint}
                priority={index < 3} // Prioritize loading for the first 3 images
              />
            </CardHeader>
             {/* Responsive Card Content */}
             <CardContent className="p-4 sm:p-5 flex-grow">
               <CardTitle className="text-lg sm:text-xl md:text-2xl mb-2">{course.title}</CardTitle>
               <CardDescription className="text-sm sm:text-base md:text-lg line-clamp-3">{course.description}</CardDescription> {/* Added line-clamp */}
             </CardContent>
            {/* Responsive Card Footer */}
            <CardFooter className="flex flex-col items-start gap-3 p-4 sm:p-5 border-t border-border/60 bg-muted/30">
               <div className="w-full">
                 <div className="flex justify-between text-xs sm:text-sm md:text-base text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                 </div>
                 <Progress value={course.progress} aria-label={`${course.title} progress: ${course.progress}%`} className="h-1.5 sm:h-2 md:h-2.5" />
               </div>
               {/* Button with Link */}
                <Button
                variant={course.progress > 0 ? "outline" : "default"}
                size="sm"
                asChild
                 className="mt-2 self-end transition-transform duration-200 ease-in-out hover:translate-x-1 text-xs sm:text-sm md:text-base group" // Added group class, responsive text size
                >
                  <Link href={`/courses/${course.id}`}>
                     {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                      {/* Arrow Icon with hover animation */}
                     <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4 md:h-5 md:w-5 transition-transform duration-200 group-hover:translate-x-1" /> {/* Adjusted icon size/margin */}
                  </Link>
                </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
