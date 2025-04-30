
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

// Mock course data - Resolved merge conflict, using the 16 course version
const allCourses = [
  { id: 1, title: "Introduction to Web Development", description: "Learn the fundamentals of HTML, CSS, and JavaScript.", progress: 65, image: "https://picsum.photos/seed/webdev/300/200" },
  { id: 2, title: "Advanced React Concepts", description: "Dive deep into hooks, state management, and performance.", progress: 30, image: "https://picsum.photos/seed/react/300/200" },
  { id: 3, title: "Data Structures and Algorithms", description: "Master essential computer science concepts.", progress: 0, image: "https://picsum.photos/seed/dsa/300/200" },
  { id: 4, title: "Python for Data Science", description: "Explore data analysis and machine learning with Python.", progress: 15, image: "https://picsum.photos/seed/python/300/200" },
  { id: 5, title: "Cloud Computing Basics (AWS)", description: "Understand the fundamentals of cloud services on AWS.", progress: 0, image: "https://picsum.photos/seed/awscloud/300/200" },
  { id: 6, title: "UI/UX Design Principles", description: "Learn the core concepts of user interface and experience design.", progress: 50, image: "https://picsum.photos/seed/uiux/300/200" },
  { id: 7, title: "Cybersecurity Fundamentals", description: "Learn the basics of cybersecurity threats, defenses, and best practices.", progress: 10, image: "https://picsum.photos/seed/cybersec/300/200" },
  { id: 8, title: "Database Management (SQL)", description: "Master SQL for querying and managing relational databases.", progress: 40, image: "https://picsum.photos/seed/sql/300/200" },
  { id: 9, title: "Introduction to DevOps", description: "Understand the culture, practices, and tools for faster software delivery.", progress: 5, image: "https://picsum.photos/seed/devops/300/200" },
  { id: 10, title: "Machine Learning Basics", description: "Get introduced to the core concepts of machine learning.", progress: 25, image: "https://picsum.photos/seed/ml/300/200" },
  { id: 11, title: "Networking Essentials", description: "Learn the fundamentals of computer networks and protocols.", progress: 0, image: "https://picsum.photos/seed/network/300/200" },
  { id: 12, title: "Linux Command Line Basics", description: "Become proficient in using the Linux terminal.", progress: 70, image: "https://picsum.photos/seed/linux/300/200" },
  { id: 13, title: "Agile Project Management", description: "Learn Agile methodologies like Scrum and Kanban.", progress: 15, image: "https://picsum.photos/seed/agile/300/200" },
  { id: 14, title: "Introduction to Blockchain", description: "Understand the technology behind cryptocurrencies.", progress: 0, image: "https://picsum.photos/seed/blockchain/300/200" },
  { id: 15, title: "API Design and Development", description: "Learn how to design, build, and document RESTful APIs.", progress: 35, image: "https://picsum.photos/seed/api/300/200" },
  { id: 16, title: "Ethical Hacking Fundamentals", description: "Explore techniques used to find vulnerabilities ethically.", progress: 20, image: "https://picsum.photos/seed/hacking/300/200" },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Slightly faster stagger for cards
      delayChildren: 0.1, // Start cards animation slightly earlier
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
      damping: 12, // Adjust damping for smoother spring
    },
  },
};

export default function CoursesPage() {
  return (
    <motion.div
      className="space-y-10 md:space-y-12" // Adjusted spacing
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
       <motion.section variants={itemVariants}>
        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
           <BookOpen className="h-7 w-7 sm:h-9 sm:w-9"/> All Courses
        </h1>
         <p className="text-lg sm:text-xl text-muted-foreground mb-6 md:mb-8 max-w-3xl"> {/* Adjusted margins and max-width */}
          Browse through our available courses and start learning today. Expand your horizons!
        </p>
        {/* Responsive Grid for Courses */}
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" // Adjusted gaps
            variants={containerVariants}
        >
          {allCourses.map((course) => (
             <motion.div key={course.id} variants={itemVariants}>
                 <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02] border border-primary/10">
                  <CardHeader className="p-0">
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={300}
                      height={200}
                      className="rounded-t-lg w-full object-cover aspect-[3/2]"
                    />
                  </CardHeader>
                  <CardContent className="p-4 sm:p-5 flex-grow"> {/* Adjusted padding */}
                    <CardTitle className="text-lg sm:text-xl mb-2">{course.title}</CardTitle>
                    <CardDescription className="text-sm sm:text-base">{course.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start gap-3 p-4 sm:p-5 border-t border-border/60 bg-muted/30"> {/* Adjusted padding */}
                     <div className="w-full">
                       <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                       </div>
                       <Progress value={course.progress} aria-label={`${course.title} progress: ${course.progress}%`} className="h-1.5 sm:h-2"/> {/* Adjusted height */}
                     </div>
                     <Button
                        variant={course.progress > 0 ? "outline" : "default"}
                        size="sm"
                        asChild
                        className="mt-2 self-end transition-transform duration-200 ease-in-out hover:translate-x-1 text-xs sm:text-sm" // Adjusted font size
                        >
                        <Link href={`/courses/${course.id}`}>
                          {course.progress > 0 ? 'Continue Learning' : 'Start Course'} <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" /> {/* Adjusted icon size/margin */}
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
