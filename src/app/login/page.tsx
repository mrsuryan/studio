"use client"; // Mark as Client Component for client-side hooks and interactivity

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Use App Router's router
import { useEffect } from 'react'; // Import useEffect for client-side checks
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] } }, // Expo ease out
};

const itemVariants = {
   initial: { opacity: 0, y: 15 },
   animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
 };

 const formContainerVariants = {
   animate: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } // Stagger form fields
 };

export default function LoginPage() {
   const { toast } = useToast();
   const router = useRouter(); // Use App Router's router

   // Redirect if already logged in (client-side check)
   useEffect(() => {
     if (localStorage.getItem('isLoggedIn') === 'true') {
       router.push('/'); // Redirect to homepage
     }
   }, [router]); // Add router to dependency array

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Login submitted:", values);

    // --- Simulate successful login ---
    // In a real app, you would send this to your backend for verification
    // For now, we'll simulate success and store info in localStorage

    // Basic name derivation from email (replace with actual user data fetch if possible)
    const nameFromEmail = values.email.split('@')[0] || "User";
    // Capitalize first letter
    const userName = nameFromEmail.length > 0
      ? nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1)
      : "User";

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', values.email);
    localStorage.setItem('userName', userName); // Store derived name
    // Set default bio if none exists
    if (!localStorage.getItem('userBio')) {
        localStorage.setItem('userBio', 'Learning enthusiast.');
    }
    // Set default notification preference if none exists
    if (!localStorage.getItem('userEmailNotifications')) {
        localStorage.setItem('userEmailNotifications', 'true');
    }
    // Maintain dark mode preference or default to false
    const storedDarkMode = localStorage.getItem('userDarkMode') === 'true';
    localStorage.setItem('userDarkMode', String(storedDarkMode));
    // Apply theme based on preference
    // Theme applying logic removed - handled in profile page now
    // if (storedDarkMode) {
    //      document.documentElement.classList.add('dark');
    // } else {
    //      document.documentElement.classList.remove('dark');
    // }
    // Set a default avatar URL based on email hash
    localStorage.setItem('userAvatarUrl', `https://picsum.photos/seed/${values.email}/100`);

    // Trigger storage event to update header immediately
    window.dispatchEvent(new Event('storage'));

    toast({
      title: "Login Successful!",
      description: "Redirecting you to your dashboard...",
    });

    router.push('/'); // Redirect to homepage after login
  }

  return (
    <motion.div
      // Responsive vertical centering and padding
       className="flex justify-center items-center min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-10rem)] py-8 sm:py-12 px-4" // Adjusted min-height
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
       {/* Responsive Card Width */}
       <motion.div variants={cardVariants} className="w-full max-w-sm sm:max-w-md md:max-w-lg">
           <Card className="shadow-xl border-primary/20 overflow-hidden rounded-xl"> {/* Increased rounding */}
             <CardHeader className="text-center space-y-1 sm:space-y-2 bg-gradient-to-b from-primary/5 to-transparent p-6 sm:p-8 rounded-t-xl"> {/* Match rounding */}
                <motion.div
                 initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                 animate={{ scale: 1, opacity: 1, rotate: 0 }}
                 transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 10 }} // Spring animation for icon
               >
                  {/* Responsive Icon Size */}
                  <LogIn className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 mx-auto text-primary" />
                </motion.div>
                {/* Responsive Titles */}
                <motion.div variants={itemVariants}>
                   <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">Welcome Back!</CardTitle>
                </motion.div>
                 <motion.div variants={itemVariants} transition={{ delay: 0.1 }}> {/* Slight delay for description */}
                    <CardDescription className="text-base sm:text-lg md:text-xl">Login to access your EduHub dashboard.</CardDescription>
                 </motion.div>
             </CardHeader>
             <CardContent className="p-6 sm:p-8">
               <Form {...form}>
                 <motion.form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 sm:space-y-6" // Responsive spacing
                    variants={formContainerVariants} // Apply stagger container
                    initial="initial"
                    animate="animate"
                 >
                   <motion.div variants={itemVariants}>
                     <FormField
                       control={form.control}
                       name="email"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel className="text-sm sm:text-base md:text-lg">Email Address</FormLabel> {/* Responsive label */}
                           <FormControl>
                             {/* Responsive Input */}
                             <Input placeholder="you@example.com" {...field} className="text-sm sm:text-base md:text-lg py-2.5 sm:py-3 h-10 sm:h-11 md:h-12" />
                           </FormControl>
                           <AnimatePresence> {/* Animate error message appearance */}
                              <FormMessage as={motion.p} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}/>
                           </AnimatePresence>
                         </FormItem>
                       )}
                     />
                   </motion.div>
                   <motion.div variants={itemVariants}>
                     <FormField
                       control={form.control}
                       name="password"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel className="text-sm sm:text-base md:text-lg">Password</FormLabel> {/* Responsive label */}
                           <FormControl>
                              {/* Responsive Input */}
                             <Input type="password" placeholder="••••••••" {...field} className="text-sm sm:text-base md:text-lg py-2.5 sm:py-3 h-10 sm:h-11 md:h-12" />
                           </FormControl>
                           <AnimatePresence>
                              <FormMessage as={motion.p} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}/>
                           </AnimatePresence>
                         </FormItem>
                       )}
                     />
                   </motion.div>
                   <motion.div
                     variants={itemVariants} // Apply item variant
                     whileHover={{ scale: 1.02 }} // Slightly reduced hover scale
                     whileTap={{ scale: 0.98 }}
                     className="pt-2 sm:pt-4" // Add responsive top padding
                   >
                      {/* Responsive Button */}
                     <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-base sm:text-lg md:text-xl py-3 sm:py-3.5 md:py-4 h-11 sm:h-12 md:h-14">
                        <LogIn className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" /> Login {/* Responsive Icon */}
                     </Button>
                   </motion.div>
                 </motion.form>
               </Form>
               <motion.p
                   variants={itemVariants} // Apply item variant
                   transition={{ delay: 0.2 }} // Add delay for the sign up link
                   className="mt-4 sm:mt-6 text-center text-sm sm:text-base md:text-lg text-muted-foreground"
               >
                 Don't have an account?{" "}
                 <Link href="/signup" className="font-semibold text-primary hover:underline hover:text-accent transition-colors">
                   Sign up now
                 </Link>
               </motion.p>
             </CardContent>
           </Card>
       </motion.div>
    </motion.div>
  );
}
