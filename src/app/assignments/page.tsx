
"use client"; // Mark as Client Component for Framer Motion

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, CheckCircle, Clock, XCircle, Download, Loader } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Import Button
import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";

// Define Assignment Status type
type AssignmentStatus = 'pending' | 'submitted' | 'overdue' | 'graded';

// Mock Assignment Data
interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: AssignmentStatus;
  grade?: string; // Optional grade
}

const assignments: Assignment[] = [
  { id: 'a1', title: "HTML Basics Quiz", course: "Introduction to Web Development", dueDate: "May 5, 2025", status: 'graded', grade: '90%' },
  { id: 'a2', title: "CSS Flexbox Challenge", course: "Introduction to Web Development", dueDate: "May 10, 2025", status: 'graded', grade: 'A' },
  { id: 'a3', title: "React Hooks Exercise", course: "Advanced React Concepts", dueDate: "May 15, 2025", status: 'submitted' },
  { id: 'a4', title: "Data Analysis Project Proposal", course: "Python for Data Science", dueDate: "May 20, 2025", status: 'pending' },
  { id: 'a5', title: "SQL Query Practice", course: "Database Management (SQL)", dueDate: "May 1, 2025", status: 'overdue' },
   { id: 'a6', title: "Linux Command Line Quiz", course: "Linux Command Line Basics", dueDate: "May 25, 2025", status: 'pending' },
];

// Mapping status to UI elements
const statusConfig: Record<AssignmentStatus, { icon: React.ElementType; color: string; label: string }> = {
  pending: { icon: Clock, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400', label: 'Pending' },
  submitted: { icon: CheckCircle, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400', label: 'Submitted' },
  overdue: { icon: XCircle, color: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400', label: 'Overdue' },
  graded: { icon: CheckCircle, color: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400', label: 'Graded' },
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
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

export default function AssignmentsPage() {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();
  const assignmentsCardRef = useRef<HTMLDivElement>(null);


  const handleDownload = async () => {
    const cardElement = assignmentsCardRef.current;
    if (!cardElement) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not find the content to download.",
      });
      return;
    }

    setIsDownloading(true);

    try {
      const canvas = await html2canvas(cardElement, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`EduHub-Assignments.pdf`);

    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "An error occurred while generating the assignments PDF.",
      });
    } finally {
        setIsDownloading(false);
    }
  };

  return (
    <motion.div
      className="space-y-8 md:space-y-10 lg:space-y-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6 md:mb-8 lg:mb-10 flex items-center gap-2 sm:gap-3"
        variants={itemVariants}
      >
         <motion.div whileHover={{ rotate: 5 }}>
             <ClipboardList className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10" />
         </motion.div>
         Assignments Overview
      </motion.h1>

      <motion.div variants={itemVariants} ref={assignmentsCardRef}>
        <Card className="shadow-lg border-primary/10 overflow-hidden rounded-lg">
           <CardHeader className="p-4 sm:p-6 md:p-8 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl sm:text-2xl md:text-3xl">Your Assignments</CardTitle>
                <CardDescription className="text-sm sm:text-base md:text-lg">Keep track of your upcoming and completed assignments.</CardDescription>
              </div>
              <Button size="sm" onClick={handleDownload} disabled={isDownloading}>
                {isDownloading ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Download className="mr-2 h-4 w-4" />
                )}
                Download
              </Button>
           </CardHeader>
           <CardContent className="p-0"> {/* Remove default padding */}
            <div className="overflow-x-auto"> {/* Add horizontal scroll for small screens */}
                 <Table>
                   <TableHeader>
                     <TableRow>
                       <TableHead className="w-[40%] pl-4 sm:pl-6 md:pl-8 text-xs sm:text-sm md:text-base">Assignment</TableHead>
                       <TableHead className="w-[25%] text-xs sm:text-sm md:text-base">Course</TableHead>
                       <TableHead className="w-[15%] text-xs sm:text-sm md:text-base">Due Date</TableHead>
                       <TableHead className="w-[15%] text-xs sm:text-sm md:text-base">Status</TableHead>
                        <TableHead className="w-[5%] pr-4 sm:pr-6 md:pr-8 text-xs sm:text-sm md:text-base"></TableHead> {/* Action column */}
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                     {assignments.map((assignment, index) => {
                       const config = statusConfig[assignment.status];
                       const Icon = config.icon;
                       return (
                         <motion.tr
                           key={assignment.id}
                           variants={itemVariants}
                           initial="hidden"
                           animate="visible"
                           transition={{ delay: index * 0.05 }} // Stagger row animation
                           className="hover:bg-muted/50 transition-colors"
                         >
                           <TableCell className="font-medium pl-4 sm:pl-6 md:pl-8 py-3 sm:py-4 text-sm sm:text-base">{assignment.title}</TableCell>
                           <TableCell className="text-muted-foreground py-3 sm:py-4 text-sm sm:text-base">{assignment.course}</TableCell>
                           <TableCell className="text-muted-foreground py-3 sm:py-4 text-sm sm:text-base">{assignment.dueDate}</TableCell>
                           <TableCell className="py-3 sm:py-4">
                             <Badge variant="outline" className={`${config.color} border-none text-xs sm:text-sm px-2 py-0.5 flex items-center gap-1 w-fit`}>
                               <Icon className="h-3 w-3" />
                               {config.label}
                               {assignment.status === 'graded' && assignment.grade && ` (${assignment.grade})`}
                             </Badge>
                           </TableCell>
                            <TableCell className="text-right pr-4 sm:pr-6 md:pr-8 py-3 sm:py-4">
                                {/* Example Action Button */}
                                <Button variant="ghost" size="sm" asChild className="text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3">
                                     {/* In a real app, link to assignment details/submission */}
                                     <Link href={`#`}>
                                        View
                                     </Link>
                                 </Button>
                            </TableCell>
                         </motion.tr>
                       );
                     })}
                   </TableBody>
                 </Table>
            </div>
             {assignments.length === 0 && (
               <motion.div
                 variants={itemVariants}
                 className="text-center py-12 sm:py-16 md:py-20 px-4"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.2 }}
               >
                 <ClipboardList className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4" />
                 <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground">No assignments found.</p>
                 <p className="text-sm sm:text-base text-muted-foreground mt-2">Check back later for new assignments.</p>
               </motion.div>
             )}
           </CardContent>
         </Card>
      </motion.div>
    </motion.div>
  );
}
