
"use client"; // Mark as Client Component for hooks and interactivity

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Award, CheckCircle, ArrowLeft, Loader } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"; // Use App Router hooks
import { Skeleton } from '@/components/ui/skeleton';
import { allCourses } from '@/data/courses'; // Assuming course data is needed
import { Separator } from '@/components/ui/separator'; // Import Separator
import { cn } from "@/lib/utils"; // Import cn
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useToast } from '@/hooks/use-toast';

interface CertificatePageProps {
  // params types handled by useParams hook
}

// Mock Certificate Data (replace with actual data fetching logic)
interface CertificateData {
  studentName: string;
  courseName: string;
  completionDate: string;
  issuingOrg: string;
  courseId: number; // Keep courseId for back navigation
}

// Updated function to use courseId from params
const fetchCertificateData = (courseIdParam: number, studentName: string): CertificateData | null => {
  const course = allCourses.find(c => c.id === courseIdParam);
  if (!course) return null;

  // Simulate fetching or generating data
  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return {
    studentName: studentName,
    courseName: course.title,
    completionDate: completionDate,
    issuingOrg: "EduHub Portal",
    courseId: courseIdParam,
  };
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
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
      damping: 12,
    },
  },
};

export default function CertificatePage() { // Removed props parameter
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [userName, setUserName] = useState<string>('Learner'); // Default name
  const [hasMounted, setHasMounted] = useState(false); // Track mount state
  const certificateRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const params = useParams(); // Get params using the hook
  const courseId = parseInt(params.courseId as string, 10); // Extract and parse courseId

  useEffect(() => {
    setHasMounted(true); // Component has mounted
  }, []);

  useEffect(() => {
    // Ensure this runs only after mounting on the client
    if (!hasMounted) return;

    // Fetch user name from localStorage (only runs on client)
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }

    // Simulate fetching certificate data
    setIsLoading(true);
    const data = fetchCertificateData(courseId, storedName || 'Learner');
    setCertificateData(data);
    // Simulate loading time
    setTimeout(() => setIsLoading(false), 500); // Reduced delay
  }, [courseId, hasMounted]); // Depend on courseId from useParams and hasMounted

  if (!hasMounted || isLoading) { // Show skeleton during loading or before mount
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Skeleton className="h-9 w-36 mb-6 md:mb-8" />
        <Card className="w-full max-w-2xl lg:max-w-4xl shadow-2xl border-4 border-primary/20 bg-gradient-to-br from-card to-blue-50/30 dark:from-card dark:to-blue-950/20 rounded-lg p-8 md:p-12 lg:p-16">
          <CardContent className="text-center space-y-6 md:space-y-8">
            <Skeleton className="h-16 w-16 md:h-20 md:w-20 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <Skeleton className="h-10 w-full max-w-xs mx-auto" />
            <Skeleton className="h-5 w-1/3 mx-auto" />
            <Skeleton className="h-5 w-1/4 mx-auto" />
            <Skeleton className="h-5 w-1/3 mx-auto" />
          </CardContent>
        </Card>
        <Skeleton className="h-10 w-32 mt-8" />
      </motion.div>
    );
  }

  if (!certificateData) {
    return (
      <motion.div
        className="text-center py-16 sm:py-20 md:py-24"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div variants={itemVariants}>
           <Award className="h-16 w-16 md:h-20 md:w-20 mx-auto text-destructive mb-4" />
         </motion.div>
        <motion.h1 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl font-semibold text-destructive mb-4 md:mb-5">Certificate Not Found</motion.h1>
        <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">We couldn't find the certificate for this course.</motion.p>
         <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" asChild className="mt-4 transition-transform hover:scale-105 text-sm sm:text-base md:text-lg md:py-2.5 md:px-5">
             <Link href={`/courses/${courseId}`}> {/* Use actual courseId */}
                <ArrowLeft className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Back to Course
             </Link>
           </Button>
         </motion.div>
      </motion.div>
    );
  }

  const handleDownload = async () => {
    const certificateElement = certificateRef.current;
    if (!certificateElement || !certificateData) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not find the certificate element to download.",
      });
      return;
    }

    setIsDownloading(true);

    try {
      const canvas = await html2canvas(certificateElement, {
        scale: 2, // Increase scale for better resolution
        useCORS: true, // If images are from external sources
        backgroundColor: null, // Use transparent background
      });

      const imgData = canvas.toDataURL('image/png');

      // Calculate dimensions for PDF
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`EduHub-Certificate-${certificateData.courseName.replace(/\s/g, '_')}.pdf`);

    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "An error occurred while generating the certificate PDF.",
      });
    } finally {
        setIsDownloading(false);
    }
  };


  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-4 sm:p-6 md:p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
        {/* Back Button */}
       <motion.div variants={itemVariants} className="w-full max-w-2xl lg:max-w-4xl mb-4 sm:mb-6 md:mb-8 self-start">
         <Button variant="outline" size="sm" asChild className="group transition-all hover:bg-accent hover:text-accent-foreground text-xs sm:text-sm md:text-base md:py-2 md:px-4">
           <Link href={`/courses/${certificateData.courseId}`}>
             <ArrowLeft className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 group-hover:-translate-x-1 transition-transform duration-200" />
             Back to Course
           </Link>
         </Button>
       </motion.div>

        {/* Certificate Card */}
       <motion.div ref={certificateRef} variants={itemVariants} className="w-full max-w-2xl lg:max-w-4xl">
        <Card className="shadow-2xl border-4 border-primary/20 bg-gradient-to-br from-card via-blue-50/50 to-accent/10 dark:from-card dark:via-blue-950/20 dark:to-accent/20 rounded-lg overflow-hidden">
           {/* Add a decorative top border element */}
          <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary"></div>
           <CardContent className="p-6 sm:p-8 md:p-12 lg:p-16 text-center space-y-4 sm:space-y-6 md:space-y-8">
              <motion.div variants={itemVariants} className="flex justify-center mb-4 md:mb-6">
                 {/* Enhanced Award Icon */}
                 <div className="p-3 bg-primary/10 rounded-full inline-block shadow-inner">
                    <Award className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 text-primary" />
                 </div>
              </motion.div>

              <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-lg font-medium text-muted-foreground tracking-wider uppercase">
               Certificate of Completion
             </motion.p>

              <motion.h1 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
               {certificateData.courseName}
             </motion.h1>

             <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-muted-foreground">
               This certifies that
             </motion.p>

             <motion.p variants={itemVariants} className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
               {certificateData.studentName}
             </motion.p>

             <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-muted-foreground">
               has successfully completed the course.
             </motion.p>

              <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-medium text-sm sm:text-base md:text-lg">
                 <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />
                 <span>Verified Completion</span>
              </motion.div>

             <Separator className="my-4 md:my-6" />

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm md:text-base text-muted-foreground space-y-2 sm:space-y-0">
               <span>Issued by: <strong>{certificateData.issuingOrg}</strong></span>
               <span>Completion Date: <strong>{certificateData.completionDate}</strong></span>
             </motion.div>
           </CardContent>
           {/* Add a decorative bottom border element */}
          <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary"></div>
         </Card>
       </motion.div>

       {/* Download Button */}
       <motion.div variants={itemVariants} className="mt-6 md:mt-10">
         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
           <Button size="lg" onClick={handleDownload} disabled={isDownloading} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg text-base sm:text-lg md:text-xl py-3 px-6 rounded-full">
             {isDownloading ? (
                <>
                    <Loader className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    Generating...
                </>
             ) : (
                <>
                    <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Download Certificate
                </>
             )}
           </Button>
         </motion.div>
       </motion.div>
    </motion.div>
  );
}
