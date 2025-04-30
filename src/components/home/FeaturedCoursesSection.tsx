
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Mock course data - Keep it local to this component
const featuredCourses = [
  { id: 1, title: "Introduction to Web Development", description: "Learn the fundamentals of HTML, CSS, and JavaScript.", progress: 65, image: "https://picsum.photos/seed/webdev/300/200" },
  { id: 7, title: "Cybersecurity Fundamentals", description: "Learn the basics of protecting systems and networks.", progress: 5, image: "https://picsum.photos/seed/cybersecurity/300/200" },
  { id: 5, title: "Cloud Computing Basics (AWS)", description: "Understand the fundamentals of cloud services on AWS.", progress: 0, image: "https://picsum.photos/seed/awscloud/300/200" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
};

export function FeaturedCoursesSection() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      variants={containerVariants}
      initial="hidden" // Add initial and animate here if needed, or control from parent
      animate="visible"
    >
      {featuredCourses.map((course) => (
        <motion.div key={course.id} variants={itemVariants}>
           <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02] border border-border/60">
            <CardHeader className="p-0">
              <Image
                src={course.image}
                alt={course.title}
                width={300}
                height={200}
                className="rounded-t-lg w-full object-cover aspect-[3/2]"
                loading="lazy" // Add lazy loading to images below the fold
              />
            </CardHeader>
             {/* Responsive Card Content */}
             <CardContent className="p-4 sm:p-5 flex-grow">
               <CardTitle className="text-lg sm:text-xl md:text-2xl mb-2">{course.title}</CardTitle>
               <CardDescription className="text-sm sm:text-base md:text-lg">{course.description}</CardDescription>
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
               <Button
                variant={course.progress > 0 ? "outline" : "default"}
                size="sm"
                asChild
                 className="mt-2 self-end transition-transform duration-200 ease-in-out hover:translate-x-1 text-xs sm:text-sm md:text-base" // Responsive text size
                >
                  <Link href={`/courses/${course.id}`}>
                     {course.progress > 0 ? 'Continue Learning' : 'Start Course'} <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4 md:h-5 md:w-5" /> {/* Adjusted icon size/margin */}
                  </Link>
                </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
