
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ListChecks, CheckCircle, Clock, CircleHelp, FileText } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link"; // Assuming assignments might link somewhere

// Mock assignment data
const assignments = [
  { id: 1, title: "HTML Basics Quiz", course: "Introduction to Web Development", dueDate: "2024-08-15", status: "Submitted" },
  { id: 2, title: "React State Management Project", course: "Advanced React Concepts", dueDate: "2024-08-20", status: "Pending" },
  { id: 3, title: "Algorithm Analysis Worksheet", course: "Data Structures and Algorithms", dueDate: "2024-08-25", status: "Pending" },
  { id: 4, title: "CSS Flexbox Challenge", course: "Introduction to Web Development", dueDate: "2024-08-10", status: "Graded" },
  { id: 5, title: "Python Data Cleaning Task", course: "Python for Data Science", dueDate: "2024-09-01", status: "Pending" },
];

const getStatusProps = (status: string): { variant: "default" | "secondary" | "outline" | "destructive" | null | undefined, icon: React.ElementType } => {
  switch (status.toLowerCase()) {
    case 'submitted': return { variant: 'secondary', icon: CheckCircle };
    case 'pending': return { variant: 'default', icon: Clock }; // Default likely primary color
    case 'graded': return { variant: 'outline', icon: FileText }; // Outline often subtle gray
    default: return { variant: 'secondary', icon: CircleHelp }; // Fallback
  }
};

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


export default function AssignmentsPage() {
  return (
    <motion.div
      className="space-y-10"
       initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-4xl font-bold text-primary mb-8 flex items-center gap-3"
        variants={itemVariants}
      >
         <ListChecks className="h-9 w-9" /> Assignments Overview
      </motion.h1>

      <motion.div className="space-y-5" variants={containerVariants}>
        {assignments.map((assignment, index) => {
          const { variant, icon: Icon } = getStatusProps(assignment.status);
          return (
            <motion.div key={assignment.id} variants={itemVariants}>
              <Card className="hover:shadow-lg transition-all duration-300 ease-in-out border-l-4 border-transparent hover:border-primary data-[status='Pending']:border-accent data-[status='Graded']:border-green-500 data-[status='Submitted']:border-secondary" data-status={assignment.status}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                  <div>
                     <CardTitle className="text-xl font-semibold">{assignment.title}</CardTitle>
                      <CardDescription className="text-base mt-1">
                        Course: {assignment.course}
                     </CardDescription>
                  </div>
                   <Badge variant={variant} className="text-sm px-3 py-1 capitalize flex items-center gap-1.5">
                      <Icon className="h-4 w-4"/>
                      {assignment.status}
                   </Badge>
                </CardHeader>
                <CardContent className="flex justify-between items-center pt-2">
                  <p className="text-base text-muted-foreground">
                     Due: <span className="font-medium text-foreground">{assignment.dueDate}</span>
                  </p>
                   {/* Add link or button to view/submit assignment */}
                   <Link href={`/assignments/${assignment.id}`} passHref>
                        <Button variant="outline" size="sm" className="group transition-all hover:bg-primary hover:text-primary-foreground">
                          View Details
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 ml-1.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                           </svg>

                        </Button>
                   </Link>
                </CardContent>
              </Card>
             </motion.div>
          );
        })}
      </motion.div>
       {assignments.length === 0 && (
          <motion.div variants={itemVariants} className="text-center py-10">
            <Card className="inline-block p-8 border-dashed">
                 <CircleHelp className="h-16 w-16 mx-auto text-muted-foreground mb-4"/>
                <p className="text-xl text-muted-foreground">You have no assignments currently.</p>
                <p className="text-base text-muted-foreground mt-2">Keep up the great work!</p>
            </Card>
          </motion.div>
        )}
    </motion.div>
  );
}
