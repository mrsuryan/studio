
"use client"; // Mark as Client Component for hooks and interactivity

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Ribbon, CheckCircle, ArrowLeft, Loader } from "lucide-react"; // Changed Award to Ribbon
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation"; // Use App Router hooks
import { Skeleton } from '@/components/ui/skeleton';
import { allCourses } from '@/data/courses'; // Assuming course data is needed
import { Separator } from '@/components/ui/separator'; // Import Separator
import { cn } from "@/lib/utils"; // Import cn
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useToast } from '@/hooks/use-toast';

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

// SVG for decorative corners
const Corner = ({ className }: { className?: string }) => (
    <svg
        className={cn("absolute w-12 h-12 text-primary/30", className)}
        fill="currentColor"
        viewBox="0 0 20 20"
    >
        <path d="M10 0C4.477 0 0 4.477 0 10v10h10C4.477 20 0 15.523 0 10S4.477 0 10 0z" />
    </svg>
);


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
        <Card className="w-full max-w-2xl lg:max-w-4xl shadow-2xl border-4 border-primary/20 bg-gradient-to-br from-card to-accent/20 rounded-lg p-8 md:p-12 lg:p-16">
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
           <Ribbon className="h-16 w-16 md:h-20 md:w-20 mx-auto text-destructive mb-4" />
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
        backgroundColor: document.documentElement.classList.contains('dark') ? '#111827' : '#ffffff', // Set background based on theme
        onclone: (document) => {
            // This is to ensure the background is applied to the cloned element for canvas rendering
            const body = document.querySelector('body');
            if(body) {
                const isDark = document.documentElement.classList.contains('dark');
                body.style.backgroundColor = isDark ? '#111827' : '#ffffff';
            }
        }
      });

      const imgData = canvas.toDataURL('image/png');

      // Calculate dimensions for PDF (A4 landscape)
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const canvasAspectRatio = canvas.width / canvas.height;
      const pdfAspectRatio = pdfWidth / pdfHeight;

      let finalWidth, finalHeight;
      if (canvasAspectRatio > pdfAspectRatio) {
          finalWidth = pdfWidth;
          finalHeight = pdfWidth / canvasAspectRatio;
      } else {
          finalHeight = pdfHeight;
          finalWidth = pdfHeight * canvasAspectRatio;
      }

      const x = (pdfWidth - finalWidth) / 2;
      const y = (pdfHeight - finalHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
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
       <motion.div variants={itemVariants} className="w-full max-w-5xl lg:max-w-6xl mb-4 sm:mb-6 md:mb-8 self-start">
         <Button variant="outline" size="sm" asChild className="group transition-all hover:bg-accent hover:text-accent-foreground text-xs sm:text-sm md:text-base md:py-2 md:px-4">
           <Link href={`/courses/${certificateData.courseId}`}>
             <ArrowLeft className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 group-hover:-translate-x-1 transition-transform duration-200" />
             Back to Course
           </Link>
         </Button>
       </motion.div>

        {/* Certificate Card */}
       <motion.div
            ref={certificateRef}
            variants={itemVariants}
            className="w-full max-w-5xl lg:max-w-6xl bg-card text-card-foreground p-2 rounded-lg shadow-2xl"
        >
        <div className="border-2 border-primary/20 rounded-md p-2">
            <div className="border border-dashed border-primary/30 rounded-md p-8 md:p-12 text-center relative overflow-hidden bg-gradient-to-br from-background to-accent/10">
                {/* Decorative Corners */}
                <Corner className="top-2 left-2" />
                <Corner className="top-2 right-2 transform rotate-90" />
                <Corner className="bottom-2 left-2 transform -rotate-90" />
                <Corner className="bottom-2 right-2 transform rotate-180" />

                <motion.div variants={itemVariants} className="flex justify-center items-center gap-4 mb-4">
                    <Ribbon className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-widest uppercase">{certificateData.issuingOrg}</h2>
                </motion.div>

                <motion.p
                    variants={itemVariants}
                    className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wider text-foreground"
                >
                    Certificate of Achievement
                </motion.p>
                
                <motion.p
                    variants={itemVariants}
                    className="mt-6 text-base sm:text-lg text-muted-foreground uppercase tracking-widest"
                >
                    This certificate is proudly presented to
                </motion.p>
                
                <motion.p
                    variants={itemVariants}
                    className="font-dancing-script text-6xl sm:text-7xl md:text-8xl my-4 text-primary"
                >
                    {certificateData.studentName}
                </motion.p>
                
                <motion.p
                    variants={itemVariants}
                    className="text-base sm:text-lg text-muted-foreground"
                >
                    For successfully completing the course
                </motion.p>

                <motion.h1
                    variants={itemVariants}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-8"
                >
                    {certificateData.courseName}
                </motion.h1>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col md:flex-row justify-around items-center gap-8 mt-10 text-muted-foreground"
                >
                    <div className="flex flex-col items-center">
                        <p className="font-semibold text-foreground">{certificateData.completionDate}</p>
                        <Separator className="w-24 mt-1" />
                        <p className="text-sm mt-1">Date</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="font-dancing-script text-2xl text-foreground">EduHub</p>
                        <Separator className="w-24 mt-1" />
                        <p className="text-sm mt-1">Issuing Authority</p>
                    </div>
                </motion.div>
                
                 <motion.div variants={itemVariants} className="mt-6 flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-medium text-sm sm:text-base">
                     <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />
                     <span>Verified Completion</span>
                  </motion.div>
            </div>
        </div>
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

    