
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

// Expanded mock course data with more diverse IT topics and relevant image seeds
const allCourses = [
  { id: 1, title: "Introduction to Web Development", description: "Learn HTML, CSS, and JavaScript fundamentals.", progress: 65, image: "https://picsum.photos/seed/webdevintro/300/200" },
  { id: 2, title: "Advanced React Concepts", description: "Deep dive into hooks, state management, and performance.", progress: 30, image: "https://picsum.photos/seed/reactadvanced/300/200" },
  { id: 3, title: "Data Structures and Algorithms", description: "Master essential computer science concepts.", progress: 0, image: "https://picsum.photos/seed/datastructures/300/200" },
  { id: 4, title: "Python for Data Science", description: "Explore data analysis and ML with Python.", progress: 15, image: "https://picsum.photos/seed/datasciencepy/300/200" },
  { id: 5, title: "Cloud Computing Basics (AWS)", description: "Understand fundamentals of AWS cloud services.", progress: 0, image: "https://picsum.photos/seed/awsbasics/300/200" },
  { id: 6, title: "UI/UX Design Principles", description: "Learn core concepts of user interface design.", progress: 50, image: "https://picsum.photos/seed/uiuxdesign/300/200" },
  { id: 7, title: "Cybersecurity Fundamentals", description: "Basics of cybersecurity threats and defenses.", progress: 10, image: "https://picsum.photos/seed/cybersecurity/300/200" },
  { id: 8, title: "Database Management (SQL)", description: "Master SQL for querying relational databases.", progress: 40, image: "https://picsum.photos/seed/sqlbasics/300/200" },
  { id: 9, title: "Introduction to DevOps", description: "Understand CI/CD, IaC, and monitoring.", progress: 5, image: "https://picsum.photos/seed/devopsintro/300/200" },
  { id: 10, title: "Machine Learning Basics", description: "Core concepts of supervised/unsupervised learning.", progress: 25, image: "https://picsum.photos/seed/machinelearning/300/200" },
  { id: 11, title: "Networking Essentials", description: "Fundamentals of networks, protocols, OSI model.", progress: 0, image: "https://picsum.photos/seed/networking/300/200" },
  { id: 12, title: "Linux Command Line Basics", description: "Become proficient in using the Linux terminal.", progress: 70, image: "https://picsum.photos/seed/linuxcli/300/200" },
  { id: 13, title: "Agile Project Management", description: "Learn Scrum and Kanban methodologies.", progress: 15, image: "https://picsum.photos/seed/agilepm/300/200" },
  { id: 14, title: "Introduction to Blockchain", description: "Understand distributed ledger technology.", progress: 0, image: "https://picsum.photos/seed/blockchain/300/200" },
  { id: 15, title: "API Design and Development", description: "Learn RESTful API design best practices.", progress: 35, image: "https://picsum.photos/seed/apidesign/300/200" },
  { id: 16, title: "Ethical Hacking Fundamentals", description: "Explore techniques to find vulnerabilities ethically.", progress: 20, image: "https://picsum.photos/seed/ethicalhacking/300/200" },
  { id: 17, title: "Advanced CSS and Sass", description: "Master modern CSS features and Sass preprocessor.", progress: 0, image: "https://picsum.photos/seed/advancedcss/300/200" },
  { id: 18, title: "Node.js Backend Development", description: "Build scalable server-side applications with Node.js.", progress: 45, image: "https://picsum.photos/seed/nodejsdev/300/200" },
  { id: 19, title: "Mobile App Development (React Native)", description: "Create cross-platform mobile apps.", progress: 10, image: "https://picsum.photos/seed/reactnative/300/200" },
  { id: 20, title: "Cloud Security Best Practices", description: "Secure cloud infrastructure on major platforms.", progress: 0, image: "https://picsum.photos/seed/cloudsecurity/300/200" },
  { id: 21, title: "Introduction to Docker & Kubernetes", description: "Learn containerization and orchestration.", progress: 20, image: "https://picsum.photos/seed/dockerk8s/300/200" },
  { id: 22, title: "Software Testing Fundamentals", description: "Understand different testing methodologies.", progress: 5, image: "https://picsum.photos/seed/softwaretesting/300/200" },
  { id: 23, title: "Version Control with Git & GitHub", description: "Master Git for collaboration and code management.", progress: 80, image: "https://picsum.photos/seed/gitgithub/300/200" },
  { id: 24, title: "Building RESTful APIs with Python (Flask)", description: "Develop web APIs using the Flask framework.", progress: 0, image: "https://picsum.photos/seed/pythonflaskapi/300/200" },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Slightly faster stagger for more items
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

export default function CoursesPage() {
  return (
    <motion.div
      className="space-y-10 md:space-y-12 lg:space-y-16" // Adjusted spacing
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
       <motion.section variants={itemVariants}>
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
            variants={containerVariants}
        >
          {allCourses.map((course, index) => ( // Added index for potential priority logic
             <motion.div key={course.id} variants={itemVariants}>
                 <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02] border border-primary/10">
                  <CardHeader className="p-0">
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={300}
                      height={200}
                      className="rounded-t-lg w-full object-cover aspect-[3/2]"
                      loading={index < 8 ? "eager" : "lazy"} // Eager load first 8 images, lazy load others
                      priority={index < 4} // Prioritize loading first 4 images (above the fold approx)
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
                       <Progress value={course.progress} aria-label={`${course.title} progress: ${course.progress}%`} className="h-1.5 sm:h-2 md:h-2.5"/> {/* Adjusted height */}
                     </div>
                     <Button
                        variant={course.progress > 0 ? "outline" : "default"}
                        size="sm"
                        asChild
                         className="mt-2 self-end transition-transform duration-200 ease-in-out hover:translate-x-1 text-xs sm:text-sm md:text-base" // Adjusted font size
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
      </motion.section>
    </motion.div>
  );
}
