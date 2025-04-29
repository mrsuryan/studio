
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

// Mock course data
const allCourses = [
  { id: 1, title: "Introduction to Web Development", description: "Learn the fundamentals of HTML, CSS, and JavaScript.", progress: 65, image: "https://picsum.photos/seed/webdev/300/200" },
  { id: 2, title: "Advanced React Concepts", description: "Dive deep into hooks, state management, and performance.", progress: 30, image: "https://picsum.photos/seed/react/300/200" },
  { id: 3, title: "Data Structures and Algorithms", description: "Master essential computer science concepts.", progress: 0, image: "https://picsum.photos/seed/dsa/300/200" },
  { id: 4, title: "Python for Data Science", description: "Explore data analysis and machine learning with Python.", progress: 15, image: "https://picsum.photos/seed/python/300/200" },
  { id: 5, title: "Cloud Computing Basics", description: "Understand the fundamentals of cloud services.", progress: 0, image: "https://picsum.photos/seed/cloud/300/200" },
   { id: 6, title: "UI/UX Design Principles", description: "Learn the core concepts of user interface and experience design.", progress: 50, image: "https://picsum.photos/seed/uiux/300/200" },
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


export default function CoursesPage() {
  return (
    <motion.div
      className="space-y-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
       <motion.section variants={itemVariants}>
        <h1 className="text-4xl font-bold text-primary mb-4 flex items-center gap-3">
           <BookOpen className="h-9 w-9"/> All Courses
        </h1>
         <p className="text-xl text-muted-foreground mb-8">
          Browse through our available courses and start learning today. Expand your horizons!
        </p>
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants} // Re-use container for staggering cards
        >
          {allCourses.map((course) => (
             <motion.div key={course.id} variants={itemVariants}>
                 <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02] border-primary/10">
                  <CardHeader className="p-0">
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={300}
                      height={200}
                      className="rounded-t-lg w-full object-cover aspect-[3/2]"
                    />
                  </CardHeader>
                  <CardContent className="pt-5 flex-grow">
                    <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                    <CardDescription className="text-base">{course.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start gap-3 pt-4 border-t border-border/60">
                     <div className="w-full">
                       <div className="flex justify-between text-sm text-muted-foreground mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                       </div>
                       <Progress value={course.progress} aria-label={`${course.title} progress: ${course.progress}%`} className="h-2"/>
                     </div>
                     <Button
                        variant={course.progress > 0 ? "outline" : "default"}
                        size="sm"
                        asChild
                        className="mt-2 self-end transition-transform duration-200 ease-in-out hover:translate-x-1"
                        >
                        <Link href={`/courses/${course.id}`}>
                          {course.progress > 0 ? 'Continue Learning' : 'Start Course'} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                  </CardFooter>
                </Card>
             </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
