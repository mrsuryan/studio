
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';
import { ArrowLeft, PlayCircle, CheckCircle, BookText } from "lucide-react";
import { motion } from "framer-motion";

// Mock course data - In a real app, fetch this based on params.id
const allCourses = [
  { id: 1, title: "Introduction to Web Development", description: "Learn the fundamentals of HTML, CSS, and JavaScript. Build your first website from scratch and understand the core concepts that power the web.", progress: 65, image: "https://picsum.photos/seed/webdev/600/400", modules: [{ id: 'm1', title: 'HTML Basics', completed: true }, { id: 'm2', title: 'CSS Fundamentals', completed: true }, { id: 'm3', title: 'JavaScript Introduction', completed: false }, { id: 'm4', title: 'DOM Manipulation', completed: false }] },
  { id: 2, title: "Advanced React Concepts", description: "Dive deep into hooks, state management patterns like Context API and Redux, and performance optimization techniques for complex React applications.", progress: 30, image: "https://picsum.photos/seed/react/600/400", modules: [{ id: 'm5', title: 'React Hooks Deep Dive', completed: true }, { id: 'm6', title: 'State Management (Context API)', completed: false }, { id: 'm7', title: 'Performance Optimization', completed: false }, {id: 'm8', title: 'Testing React Apps', completed: false}] },
  { id: 3, title: "Data Structures and Algorithms", description: "Master essential computer science concepts, including arrays, linked lists, trees, graphs, sorting, and searching algorithms. Prepare for technical interviews.", progress: 0, image: "https://picsum.photos/seed/dsa/600/400", modules: [{ id: 'm9', title: 'Arrays and Strings', completed: false }, { id: 'm10', title: 'Linked Lists', completed: false }, { id: 'm11', title: 'Trees and Graphs', completed: false }, {id: 'm12', title: 'Sorting Algorithms', completed: false}] },
  { id: 4, title: "Python for Data Science", description: "Explore data analysis, visualization, and machine learning using Python libraries like NumPy, Pandas, Matplotlib, and Scikit-learn.", progress: 15, image: "https://picsum.photos/seed/python/600/400", modules: [{ id: 'm13', title: 'NumPy Essentials', completed: true }, { id: 'm14', title: 'Pandas DataFrames', completed: false }, { id: 'm15', title: 'Introduction to Matplotlib', completed: false }, {id: 'm16', title: 'Basic Machine Learning', completed: false}] },
  { id: 5, title: "Cloud Computing Basics", description: "Understand the fundamentals of cloud services, including IaaS, PaaS, SaaS models, and compare major cloud providers like AWS, Azure, and GCP.", progress: 0, image: "https://picsum.photos/seed/cloud/600/400", modules: [{ id: 'm17', title: 'What is Cloud Computing?', completed: false }, { id: 'm18', title: 'Service Models (IaaS, PaaS, SaaS)', completed: false }, { id: 'm19', title: 'Major Cloud Providers Overview', completed: false }, {id: 'm20', title: 'Cloud Security Basics', completed: false}] },
  { id: 6, title: "UI/UX Design Principles", description: "Learn the core concepts of user interface and experience design, including user research, wireframing, prototyping, and visual design principles.", progress: 50, image: "https://picsum.photos/seed/uiux/600/400", modules: [{ id: 'm21', title: 'User Research Methods', completed: true }, { id: 'm22', title: 'Wireframing and Prototyping', completed: true }, { id: 'm23', title: 'Visual Design Principles', completed: false }, {id: 'm24', title: 'Usability Testing', completed: false}] },
];


interface CoursePageProps {
  params: { id: string };
}

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

const moduleItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export default function CourseDetailPage({ params }: CoursePageProps) {
  const courseId = parseInt(params.id, 10);
  const course = allCourses.find(c => c.id === courseId);

  if (!course) {
    return (
       <motion.div
          className="text-center py-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
       >
        <h1 className="text-3xl font-semibold text-destructive mb-4">Course Not Found</h1>
         <p className="text-lg text-muted-foreground mb-6">We couldn't find the course you were looking for.</p>
        <Button variant="outline" asChild className="mt-4 transition-transform hover:scale-105">
          <Link href="/courses">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Courses
          </Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
       <motion.div variants={itemVariants}>
         <Button variant="outline" size="sm" asChild className="mb-6 group transition-all hover:bg-accent hover:text-accent-foreground">
            <Link href="/courses">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" /> Back to Courses
            </Link>
          </Button>
       </motion.div>
       <motion.h1
          className="text-4xl font-bold text-primary flex items-center gap-3"
          variants={itemVariants}
        >
            <BookText className="h-9 w-9"/> {course.title}
       </motion.h1>
      <motion.section
        className="grid md:grid-cols-3 gap-10"
        variants={containerVariants}
      >
         <motion.div className="md:col-span-2 space-y-6" variants={itemVariants}>

            <Card className="overflow-hidden shadow-lg border-primary/10">
                <CardHeader className="p-0 relative">
                     <Image
                        src={course.image}
                        alt={course.title}
                        width={600}
                        height={400}
                        className="rounded-t-lg w-full object-cover aspect-video transition-transform duration-500 hover:scale-105"
                     />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        {/* Optional: Add overlay text or elements here */}
                      </div>
                </CardHeader>
                <CardContent className="p-6 pt-6">
                     <CardDescription className="text-lg leading-relaxed">{course.description}</CardDescription>
                </CardContent>
            </Card>
         </motion.div>

        <motion.div className="md:col-span-1 space-y-5" variants={itemVariants}>
            <h2 className="text-2xl font-semibold">Course Modules</h2>
             <Card className="shadow-md border-accent/10">
                <CardContent className="pt-6 space-y-4">
                    {course.modules.map((module, index) => (
                         <motion.div
                            key={module.id}
                            className="flex items-center justify-between p-4 rounded-lg border bg-muted/30 hover:bg-muted/70 transition-all duration-200 ease-in-out hover:border-primary/50"
                            variants={moduleItemVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.1 }}
                         >
                             <div className="flex items-center gap-4">
                                {module.completed ? (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}>
                                        <CheckCircle className="h-6 w-6 text-green-500" />
                                    </motion.div>
                                ) : (
                                    <PlayCircle className="h-6 w-6 text-primary" />
                                )}
                                <span className={`text-base ${module.completed ? 'text-muted-foreground line-through' : 'font-medium'}`}>{module.title}</span>
                             </div>
                             <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10 group">
                                {module.completed ? 'Review' : 'Start'}
                                <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"/>
                            </Button>
                        </motion.div>
                    ))}
                     {course.modules.length === 0 && (
                        <p className="text-base text-muted-foreground text-center py-6">No modules available for this course yet.</p>
                    )}
                </CardContent>
            </Card>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
