
"use client";

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ArrowLeft, Clock, CheckCircle, XCircle, Download, Loader, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Mock Data (replace with actual data fetching in a real app)
const assignments = [
  { id: 'a1', title: "HTML Basics Quiz", course: "Introduction to Web Development", dueDate: "May 5, 2025", status: 'graded', grade: '90%', description: "A short multiple-choice quiz covering fundamental HTML tags and document structure. This assignment tests your understanding of elements like headings, paragraphs, lists, and links.", submission: "Submitted on May 4, 2025." },
  { id: 'a2', title: "CSS Flexbox Challenge", course: "Introduction to Web Development", dueDate: "May 10, 2025", status: 'graded', grade: 'A', description: "A practical challenge to build a responsive layout using CSS Flexbox. You will be given a design to replicate, focusing on container and item properties.", submission: "Submitted on May 9, 2025." },
  { id: 'a3', title: "React Hooks Exercise", course: "Advanced React Concepts", dueDate: "May 15, 2025", status: 'submitted', description: "An exercise to refactor a class-based component to a functional component using React Hooks (useState, useEffect, useContext).", submission: "Submitted on May 15, 2025." },
  { id: 'a4', title: "Data Analysis Project Proposal", course: "Python for Data Science", dueDate: "May 20, 2025", status: 'pending', description: "Submit a one-page proposal for your final data analysis project. The proposal should outline your chosen dataset, research questions, and planned analysis methods.", submission: null },
  { id: 'a5', title: "SQL Query Practice", course: "Database Management (SQL)", dueDate: "May 1, 2025", status: 'overdue', description: "A set of 10 SQL problems requiring you to write queries for data retrieval, filtering, and joining from a sample database.", submission: null },
  { id: 'a6', title: "Linux Command Line Quiz", course: "Linux Command Line Basics", dueDate: "May 25, 2025", status: 'pending', description: "A quiz on essential Linux commands for file navigation, manipulation, and permissions.", submission: null },
];

const statusConfig = {
  pending: { icon: Clock, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400', label: 'Pending' },
  submitted: { icon: CheckCircle, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400', label: 'Submitted' },
  overdue: { icon: XCircle, color: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400', label: 'Overdue' },
  graded: { icon: CheckCircle, color: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400', label: 'Graded' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

export default function AssignmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const assignmentId = params.id as string;
  
  const [assignment, setAssignment] = useState<typeof assignments[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    // Simulate data fetch
    setTimeout(() => {
      const foundAssignment = assignments.find(a => a.id === assignmentId) || null;
      setAssignment(foundAssignment);
      setIsLoading(false);
    }, 500);
  }, [assignmentId]);

  const handleDownload = async () => {
    if (!contentRef.current || !assignment) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(contentRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'px', [canvas.width, canvas.height]);
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`EduHub-Assignment-${assignment.title.replace(/\s/g, '_')}.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({ variant: "destructive", title: "Download Failed", description: "An error occurred while generating the PDF." });
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-12 w-3/4" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-32" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-destructive">Assignment Not Found</h1>
        <p className="text-muted-foreground mt-4">We couldn't find the assignment you're looking for.</p>
        <Button onClick={() => router.push('/assignments')} className="mt-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Assignments
        </Button>
      </div>
    );
  }

  const config = statusConfig[assignment.status as keyof typeof statusConfig];
  const Icon = config.icon;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants}>
        <Button variant="outline" onClick={() => router.push('/assignments')} className="group">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Assignments
        </Button>
      </motion.div>

      <div ref={contentRef} className="p-4 bg-background">
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">{assignment.title}</h1>
            <p className="text-lg text-muted-foreground flex items-center gap-2 mt-2">
              <BookOpen className="h-5 w-5" />
              {assignment.course}
            </p>
          </div>
          <motion.div variants={itemVariants} className="flex-shrink-0">
            <Badge variant="outline" className={`${config.color} border-none text-md px-4 py-2 flex items-center gap-2`}>
              <Icon className="h-5 w-5" />
              {config.label}
              {assignment.status === 'graded' && assignment.grade && ` (${assignment.grade})`}
            </Badge>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Separator className="my-6" />
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{assignment.description}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h3 className="font-semibold">Due Date</h3>
                <p className="text-muted-foreground">{assignment.dueDate}</p>
              </div>
              <div>
                <h3 className="font-semibold">Status</h3>
                <p className="text-muted-foreground">{config.label}</p>
              </div>
              {assignment.grade && (
                <div>
                  <h3 className="font-semibold">Grade</h3>
                  <p className="text-muted-foreground">{assignment.grade}</p>
                </div>
              )}
              {assignment.submission && (
                <div>
                  <h3 className="font-semibold">Submission</h3>
                  <p className="text-muted-foreground">{assignment.submission}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="flex justify-end gap-4 mt-6">
        <Button onClick={handleDownload} disabled={isDownloading}>
          {isDownloading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
          Download PDF
        </Button>
        {assignment.status === 'pending' && (
          <Button>Submit Assignment</Button>
        )}
      </motion.div>
    </motion.div>
  );
}

    