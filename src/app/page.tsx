
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';
import { ArrowRight, BookOpen, Info } from "lucide-react"; // Added Info icon
import { motion } from "framer-motion";

// Mock course data - Update featured courses
const featuredCourses = [
  { id: 1, title: "Introduction to Web Development", description: "Learn the fundamentals of HTML, CSS, and JavaScript.", progress: 65, image: "https://picsum.photos/seed/webdev/300/200" },
  { id: 7, title: "Cybersecurity Fundamentals", description: "Learn the basics of protecting systems and networks.", progress: 5, image: "https://picsum.photos/seed/cybersecurity/300/200" }, // Corrected title
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

export default function Home() {
  return (
    <div className="space-y-10 md:space-y-16"> {/* Adjusted spacing */}
      <motion.section
        className="text-center py-10 px-4 sm:py-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 shadow-inner" // Added padding and shadow
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
         {/* Responsive Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary mb-3 sm:mb-4">Welcome to EduHub Portal</h1>
        {/* Responsive Description */}
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
          Your journey to knowledge starts here. Explore our courses and enhance your skills with interactive learning.
        </p>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Responsive Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 md:mb-8 text-primary flex items-center gap-2">
             <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"/> Featured Courses
             {/* Added Info icon for instruction indication */}
             <Info className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-muted-foreground hover:text-foreground transition-colors cursor-help" title="Explore some of our most popular courses." />
        </h2>
        {/* Responsive Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
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
         <motion.div
            className="text-center mt-10 md:mt-12 lg:mt-16" // Adjusted margin top
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5, duration: 0.5 }}
         >
             {/* Responsive Button */}
            <Button size="lg" asChild className="transition-transform duration-200 ease-in-out hover:scale-105 text-base sm:text-lg md:text-xl py-3 sm:py-3.5 md:py-4 px-6 sm:px-8 md:px-10">
                <Link href="/courses">
                    View All Courses <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
            </Button>
        </motion.div>
      </motion.section>
    </div>
  );
}

