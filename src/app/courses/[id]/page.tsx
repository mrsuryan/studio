
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';
import { ArrowLeft, PlayCircle, CheckCircle, BookText, ArrowRight } from "lucide-react"; // Added ArrowRight
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation'; // Import useRouter

// Expanded mock course data - Ensure this list matches the one on courses/page.tsx
const allCourses = [
  { id: 1, title: "Introduction to Web Development", description: "Learn HTML, CSS, and JavaScript fundamentals. Build your first website from scratch and understand the core concepts that power the web.", progress: 65, image: "https://picsum.photos/seed/webdevintro/600/400", modules: [{ id: 'm1', title: 'HTML Basics', completed: true }, { id: 'm2', title: 'CSS Fundamentals', completed: true }, { id: 'm3', title: 'JavaScript Introduction', completed: false }, { id: 'm4', title: 'DOM Manipulation', completed: false }] },
  { id: 2, title: "Advanced React Concepts", description: "Dive deep into hooks, state management patterns like Context API and Redux, and performance optimization techniques for complex React applications.", progress: 30, image: "https://picsum.photos/seed/reactadvanced/600/400", modules: [{ id: 'm5', title: 'React Hooks Deep Dive', completed: true }, { id: 'm6', title: 'State Management (Context API)', completed: false }, { id: 'm7', title: 'Performance Optimization', completed: false }, {id: 'm8', title: 'Testing React Apps', completed: false}] },
  { id: 3, title: "Data Structures and Algorithms", description: "Master essential computer science concepts, including arrays, linked lists, trees, graphs, sorting, and searching algorithms. Prepare for technical interviews.", progress: 0, image: "https://picsum.photos/seed/datastructures/600/400", modules: [{ id: 'm9', title: 'Arrays and Strings', completed: false }, { id: 'm10', title: 'Linked Lists', completed: false }, { id: 'm11', title: 'Trees and Graphs', completed: false }, {id: 'm12', title: 'Sorting Algorithms', completed: false}] },
  { id: 4, title: "Python for Data Science", description: "Explore data analysis, visualization, and machine learning using Python libraries like NumPy, Pandas, Matplotlib, and Scikit-learn.", progress: 15, image: "https://picsum.photos/seed/datasciencepy/600/400", modules: [{ id: 'm13', title: 'NumPy Essentials', completed: true }, { id: 'm14', title: 'Pandas DataFrames', completed: false }, { id: 'm15', title: 'Introduction to Matplotlib', completed: false }, {id: 'm16', title: 'Basic Machine Learning', completed: false}] },
  { id: 5, title: "Cloud Computing Basics (AWS)", description: "Understand the fundamentals of cloud services on AWS, including EC2, S3, and basic architecture patterns.", progress: 0, image: "https://picsum.photos/seed/awsbasics/600/400", modules: [{ id: 'm17', title: 'What is Cloud Computing?', completed: false }, { id: 'm18', title: 'Core AWS Services (EC2, S3)', completed: false }, { id: 'm19', title: 'AWS Architecture Basics', completed: false }, {id: 'm20', title: 'Cloud Security Fundamentals', completed: false}] },
  { id: 6, title: "UI/UX Design Principles", description: "Learn the core concepts of user interface and experience design, including user research, wireframing, prototyping, and visual design principles.", progress: 50, image: "https://picsum.photos/seed/uiuxdesign/600/400", modules: [{ id: 'm21', title: 'User Research Methods', completed: true }, { id: 'm22', title: 'Wireframing and Prototyping', completed: true }, { id: 'm23', title: 'Visual Design Principles', completed: false }, {id: 'm24', title: 'Usability Testing', completed: false}] },
  { id: 7, title: "Cybersecurity Fundamentals", description: "Learn the basics of cybersecurity threats, defenses, and best practices to protect digital assets.", progress: 10, image: "https://picsum.photos/seed/cybersecurity/600/400", modules: [{ id: 'm25', title: 'Introduction to Threats', completed: true }, { id: 'm26', title: 'Network Security Basics', completed: false }, { id: 'm27', title: 'Cryptography Essentials', completed: false }, { id: 'm28', title: 'Security Best Practices', completed: false }] },
  { id: 8, title: "Database Management (SQL)", description: "Master SQL for querying, managing, and manipulating relational databases effectively.", progress: 40, image: "https://picsum.photos/seed/sqlbasics/600/400", modules: [{ id: 'm29', title: 'Relational Database Concepts', completed: true }, { id: 'm30', title: 'Basic SQL Queries', completed: true }, { id: 'm31', title: 'Advanced SQL Joins', completed: false }, { id: 'm32', title: 'Database Design Principles', completed: false }] },
  { id: 9, title: "Introduction to DevOps", description: "Understand the culture, practices, and tools that enable faster and more reliable software delivery.", progress: 5, image: "https://picsum.photos/seed/devopsintro/600/400", modules: [{ id: 'm33', title: 'What is DevOps?', completed: true }, { id: 'm34', title: 'CI/CD Pipelines', completed: false }, { id: 'm35', title: 'Infrastructure as Code', completed: false }, { id: 'm36', title: 'Monitoring and Logging', completed: false }] },
  { id: 10, title: "Machine Learning Basics", description: "Get introduced to the core concepts of machine learning, including supervised and unsupervised learning.", progress: 25, image: "https://picsum.photos/seed/machinelearning/600/400", modules: [{ id: 'm37', title: 'Introduction to ML', completed: true }, { id: 'm38', title: 'Supervised Learning Algorithms', completed: false }, { id: 'm39', title: 'Unsupervised Learning', completed: false }, { id: 'm40', title: 'Model Evaluation', completed: false }] },
  { id: 11, title: "Networking Essentials", description: "Learn the fundamentals of computer networks, protocols, and the OSI model.", progress: 0, image: "https://picsum.photos/seed/networking/600/400", modules: [{ id: 'm41', title: 'OSI Model Explained', completed: false }, { id: 'm42', title: 'TCP/IP Protocol Suite', completed: false }, { id: 'm43', title: 'IP Addressing and Subnetting', completed: false }, { id: 'm44', title: 'Common Network Devices', completed: false }] },
  { id: 12, title: "Linux Command Line Basics", description: "Become proficient in using the Linux terminal for system administration and development tasks.", progress: 70, image: "https://picsum.photos/seed/linuxcli/600/400", modules: [{ id: 'm45', title: 'Navigating the Filesystem', completed: true }, { id: 'm46', title: 'File Permissions', completed: true }, { id: 'm47', title: 'Process Management', completed: true }, { id: 'm48', title: 'Shell Scripting Introduction', completed: false }] },
  { id: 13, title: "Agile Project Management", description: "Learn Agile methodologies like Scrum and Kanban for efficient project delivery.", progress: 15, image: "https://picsum.photos/seed/agilepm/600/400", modules: [{ id: 'm49', title: 'Agile Principles', completed: true }, { id: 'm50', title: 'Scrum Framework', completed: false }, { id: 'm51', title: 'Kanban Method', completed: false }, { id: 'm52', title: 'User Stories and Backlogs', completed: false }] },
  { id: 14, title: "Introduction to Blockchain", description: "Understand the technology behind cryptocurrencies and distributed ledger systems.", progress: 0, image: "https://picsum.photos/seed/blockchain/600/400", modules: [{ id: 'm53', title: 'What is Blockchain?', completed: false }, { id: 'm54', title: 'Cryptography in Blockchain', completed: false }, { id: 'm55', title: 'Consensus Mechanisms', completed: false }, { id: 'm56', title: 'Blockchain Use Cases', completed: false }] },
  { id: 15, title: "API Design and Development", description: "Learn how to design, build, and document RESTful APIs using best practices.", progress: 35, image: "https://picsum.photos/seed/apidesign/600/400", modules: [{ id: 'm57', title: 'REST Principles', completed: true }, { id: 'm58', title: 'API Design Patterns', completed: false }, { id: 'm59', title: 'API Documentation (Swagger/OpenAPI)', completed: false }, { id: 'm60', title: 'API Security Basics', completed: false }] },
  { id: 16, title: "Ethical Hacking Fundamentals", description: "Explore the techniques used by hackers to find vulnerabilities, but for ethical purposes.", progress: 20, image: "https://picsum.photos/seed/ethicalhacking/600/400", modules: [{ id: 'm61', title: 'Ethical Hacking Overview', completed: true }, { id: 'm62', title: 'Reconnaissance Techniques', completed: false }, { id: 'm63', title: 'Scanning Networks', completed: false }, { id: 'm64', title: 'Web Application Hacking Basics', completed: false }] },
  { id: 17, title: "Advanced CSS and Sass", description: "Master modern CSS features and Sass preprocessor.", progress: 0, image: "https://picsum.photos/seed/advancedcss/600/400", modules: [{ id: 'm65', title: 'Advanced Selectors', completed: false }, { id: 'm66', title: 'CSS Grid Layout', completed: false }, { id: 'm67', title: 'Sass Variables & Mixins', completed: false }, { id: 'm68', title: 'Responsive Design with Sass', completed: false }] },
  { id: 18, title: "Node.js Backend Development", description: "Build scalable server-side applications with Node.js.", progress: 45, image: "https://picsum.photos/seed/nodejsdev/600/400", modules: [{ id: 'm69', title: 'Node.js Basics', completed: true }, { id: 'm70', title: 'Express.js Framework', completed: true }, { id: 'm71', title: 'Asynchronous JavaScript', completed: false }, { id: 'm72', title: 'Working with Databases', completed: false }] },
  { id: 19, title: "Mobile App Development (React Native)", description: "Create cross-platform mobile apps.", progress: 10, image: "https://picsum.photos/seed/reactnative/600/400", modules: [{ id: 'm73', title: 'React Native Setup', completed: true }, { id: 'm74', title: 'Core Components', completed: false }, { id: 'm75', title: 'Navigation', completed: false }, { id: 'm76', title: 'State Management in RN', completed: false }] },
  { id: 20, title: "Cloud Security Best Practices", description: "Secure cloud infrastructure on major platforms.", progress: 0, image: "https://picsum.photos/seed/cloudsecurity/600/400", modules: [{ id: 'm77', title: 'IAM and Access Control', completed: false }, { id: 'm78', title: 'Network Security Groups', completed: false }, { id: 'm79', title: 'Data Encryption', completed: false }, { id: 'm80', title: 'Monitoring and Auditing', completed: false }] },
  { id: 21, title: "Introduction to Docker & Kubernetes", description: "Learn containerization and orchestration.", progress: 20, image: "https://picsum.photos/seed/dockerk8s/600/400", modules: [{ id: 'm81', title: 'Docker Fundamentals', completed: true }, { id: 'm82', title: 'Building Docker Images', completed: false }, { id: 'm83', title: 'Kubernetes Architecture', completed: false }, { id: 'm84', title: 'Deploying Applications with K8s', completed: false }] },
  { id: 22, title: "Software Testing Fundamentals", description: "Understand different testing methodologies.", progress: 5, image: "https://picsum.photos/seed/softwaretesting/600/400", modules: [{ id: 'm85', title: 'Types of Testing', completed: true }, { id: 'm86', title: 'Unit Testing', completed: false }, { id: 'm87', title: 'Integration Testing', completed: false }, { id: 'm88', title: 'Test Automation Basics', completed: false }] },
  { id: 23, title: "Version Control with Git & GitHub", description: "Master Git for collaboration and code management.", progress: 80, image: "https://picsum.photos/seed/gitgithub/600/400", modules: [{ id: 'm89', title: 'Git Basics', completed: true }, { id: 'm90', title: 'Branching and Merging', completed: true }, { id: 'm91', title: 'Working with GitHub', completed: true }, { id: 'm92', title: 'Collaboration Workflows', completed: true }] },
  { id: 24, title: "Building RESTful APIs with Python (Flask)", description: "Develop web APIs using the Flask framework.", progress: 0, image: "https://picsum.photos/seed/pythonflaskapi/600/400", modules: [{ id: 'm93', title: 'Flask Introduction', completed: false }, { id: 'm94', title: 'Routing and Views', completed: false }, { id: 'm95', title: 'Request Handling', completed: false }, { id: 'm96', title: 'Building JSON APIs', completed: false }] },
];


interface CoursePageProps {
  params: { id: string };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Adjusted stagger
      delayChildren: 0.15, // Slightly earlier delay
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
      damping: 13, // Slightly more damping
    },
  },
};

const moduleItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
        type: "spring", // Use spring for module items too
        stiffness: 110,
        damping: 14,
    }
  },
  hover: { // Add hover effect for modules
     backgroundColor: "hsl(var(--muted))",
     scale: 1.02,
     boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
     transition: { duration: 0.2, ease: "easeOut" }
  }
};

export default function CourseDetailPage({ params }: CoursePageProps) {
  const router = useRouter(); // Initialize router
  const courseId = parseInt(params.id, 10);
  // In a real app, fetch course data based on ID. For now, find in mock data.
  const course = allCourses.find(c => c.id === courseId);

  const handleModuleAction = (moduleId: string) => {
    // Navigate to the specific module page
    router.push(`/courses/${courseId}/modules/${moduleId}`);
  };


  if (!course) {
    return (
       <motion.div
          className="text-center py-16 sm:py-20 md:py-24" // Adjusted padding
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }} // Added ease
       >
         {/* Responsive Not Found Message */}
         <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-destructive mb-4 md:mb-5">Course Not Found</h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">We couldn't find the course you were looking for.</p>
         {/* Responsive Button with animation */}
         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
             <Button variant="outline" asChild className="mt-4 transition-transform hover:scale-105 text-sm sm:text-base md:text-lg md:py-2.5 md:px-5">
               <Link href="/courses">
                 <ArrowLeft className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Back to All Courses {/* Responsive Icon */}
               </Link>
             </Button>
         </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-8 md:space-y-10 lg:space-y-12" // Adjusted spacing
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
       <motion.div variants={itemVariants}>
          {/* Responsive Back Button */}
          <Button variant="outline" size="sm" asChild className="mb-4 sm:mb-6 md:mb-8 group transition-all hover:bg-accent hover:text-accent-foreground text-xs sm:text-sm md:text-base md:py-2 md:px-4">
            <Link href="/courses">
              <ArrowLeft className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 group-hover:-translate-x-1 transition-transform duration-200" /> Back to Courses {/* Responsive Icon */}
            </Link>
          </Button>
       </motion.div>
       <motion.h1
           className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary flex items-center gap-2 sm:gap-3" // Responsive font size and gap
          variants={itemVariants}
        >
            {/* Animated Icon */}
            <motion.div
                initial={{ rotate: -10, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
            >
               <BookText className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10"/>
            </motion.div>
             {course.title} {/* Responsive Icon */}
       </motion.h1>
      {/* Responsive Grid for Course Details and Modules */}
       <motion.section
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12" // Adjusted gaps, changed breakpoint to lg
        variants={containerVariants} // Stagger children within the grid
      >
         {/* Course Description Column */}
          <motion.div className="lg:col-span-2 space-y-6 md:space-y-8" variants={itemVariants}>
             <Card className="overflow-hidden shadow-lg border-primary/10 rounded-lg"> {/* Ensure rounded corners */}
                 <CardHeader className="p-0 relative overflow-hidden"> {/* Add overflow hidden */}
                      {/* Responsive Image Handling with hover effect */}
                      <motion.div
                          className="aspect-video w-full"
                          whileHover={{ scale: 1.03 }} // Gentle scale on hover
                          transition={{ duration: 0.3 }}
                      >
                         <Image
                             src={course.image}
                             alt={course.title}
                             fill // Use fill for responsive images with aspect ratio container
                             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 67vw, 50vw" // Updated sizes based on layout (approx 2/3 width on lg+)
                             className="rounded-t-lg object-cover" // Removed hover effect from here
                             priority // Add priority for the main course image LCP
                         />
                      </motion.div>
                       <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-lg"></div> {/* Ensure gradient also rounds */}
                       {/* Optional: Add overlay text */}
                 </CardHeader>
                 {/* Responsive Card Content */}
                 <CardContent className="p-4 sm:p-6 md:p-8 pt-6 md:pt-8">
                      <CardDescription className="text-base sm:text-lg md:text-xl leading-relaxed">{course.description}</CardDescription>
                 </CardContent>
             </Card>
          </motion.div>

        {/* Course Modules Column */}
         <motion.div className="lg:col-span-1 space-y-5 md:space-y-6" variants={itemVariants}>
             {/* Responsive Heading */}
             <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">Course Modules</h2>
              <Card className="shadow-md border-accent/10 rounded-lg"> {/* Ensure rounded corners */}
                 {/* Responsive Card Content */}
                 <CardContent className="pt-4 sm:pt-6 md:pt-8 space-y-3 sm:space-y-4 md:space-y-5">
                     {course.modules.map((module, index) => (
                          <motion.div
                             key={module.id}
                             className="flex items-center justify-between p-3 sm:p-4 md:p-5 rounded-lg border bg-muted/30 transition-all duration-200 ease-in-out hover:border-primary/50 cursor-pointer" // Added cursor-pointer
                             variants={moduleItemVariants}
                             whileHover="hover" // Apply hover animation
                             initial="hidden" // Apply initial for stagger
                             animate="visible" // Apply visible for stagger
                             custom={index} // Pass index for potential custom delay logic
                             transition={{ delay: index * 0.06 }} // Slightly adjusted delay
                             onClick={() => handleModuleAction(module.id)} // Make the whole div clickable and pass module ID
                          >
                              <div className="flex items-center gap-3 sm:gap-4 md:gap-5"> {/* Adjusted gap */}
                                 {module.completed ? (
                                     <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * 0.06 + 0.1, type: "spring" }}>
                                         <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-green-500" /> {/* Responsive icon size */}
                                     </motion.div>
                                 ) : (
                                     <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * 0.06 + 0.1, type: "spring" }}>
                                         <PlayCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary" /> {/* Responsive icon size */}
                                      </motion.div>
                                 )}
                                 <span className={`text-sm sm:text-base md:text-lg ${module.completed ? 'text-muted-foreground line-through' : 'font-medium'}`}>{module.title}</span>
                              </div>
                               {/* Keep button for visual cue, but main click is on div */}
                              <Button
                                 variant="ghost"
                                 size="sm"
                                 className="text-primary hover:text-primary/80 hover:bg-primary/10 group text-xs sm:text-sm md:text-base px-2 sm:px-3 md:py-1.5 md:px-4 pointer-events-none" // Make button non-interactive directly
                                 tabIndex={-1} // Remove from tab order
                               >
                                 {module.completed ? 'Review' : 'Start'}
                                 <ArrowRight className="ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"/> {/* Responsive Icon */}
                             </Button>
                         </motion.div>
                     ))}
                      {course.modules.length === 0 && (
                         <motion.p
                            className="text-sm sm:text-base md:text-lg text-muted-foreground text-center py-4 sm:py-6 md:py-8" // Adjusted padding/font size
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                         >
                            No modules available for this course yet.
                          </motion.p>
                     )}
                 </CardContent>
             </Card>
         </motion.div>
       </motion.section>
    </motion.div>
  );
}
