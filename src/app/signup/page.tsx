
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { useEffect } from 'react';

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
import { UserPlus } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function SignupPage() {
  const { toast } = useToast();
  const router = useRouter();

  // Redirect if already logged in (client-side check)
   useEffect(() => {
     if (typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true') {
       router.push('/'); // Redirect to homepage
     }
   }, [router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

 function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Signup submitted:", values);
     // --- Simulate successful signup & auto-login ---
     if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', values.name);
        localStorage.setItem('userEmail', values.email);
        // Set default profile fields on signup
        localStorage.setItem('userBio', 'New user - ready to learn!');
        localStorage.setItem('userEmailNotifications', 'true');
        localStorage.setItem('userDarkMode', 'false'); // Default to light mode
        // Trigger storage event for header update
        window.dispatchEvent(new Event('storage'));
     }

     toast({
      title: "Signup Successful!",
      description: "Welcome to EduHub! Redirecting you...",
      variant: "default",
    });

    router.push('/'); // Redirect to homepage after signup
  }

  return (
    <motion.div
      // Responsive vertical centering and padding
       className="flex justify-center items-center min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-10rem)] py-8 sm:py-12 px-4" // Adjusted min-height
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
       {/* Responsive Card Width */}
       <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg shadow-xl border-primary/20 overflow-hidden">
         <CardHeader className="text-center space-y-1 sm:space-y-2 bg-gradient-to-b from-primary/5 to-transparent p-6 sm:p-8 rounded-t-lg">
            <motion.div
             initial={{ scale: 0.5, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
           >
              {/* Responsive Icon Size */}
              <UserPlus className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 mx-auto text-primary" />
            </motion.div>
            {/* Responsive Titles */}
           <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">Create Your Account</CardTitle>
           <CardDescription className="text-base sm:text-lg md:text-xl">Join EduHub to start your learning journey.</CardDescription>
         </CardHeader>
         <CardContent className="p-6 sm:p-8">
           <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6"> {/* Responsive spacing */}
                <FormField
                 control={form.control}
                 name="name"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel className="text-sm sm:text-base md:text-lg">Full Name</FormLabel> {/* Responsive label */}
                     <FormControl>
                       {/* Responsive Input */}
                       <Input placeholder="John Doe" {...field} className="text-sm sm:text-base md:text-lg py-2.5 sm:py-3 h-10 sm:h-11 md:h-12" />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
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
                     <FormMessage />
                   </FormItem>
                 )}
               />
               <FormField
                 control={form.control}
                 name="password"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel className="text-sm sm:text-base md:text-lg">Password</FormLabel> {/* Responsive label */}
                     <FormControl>
                       {/* Responsive Input */}
                       <Input type="password" placeholder="•••••••• (min. 6 characters)" {...field} className="text-sm sm:text-base md:text-lg py-2.5 sm:py-3 h-10 sm:h-11 md:h-12" />
                     </FormControl>
                      <FormMessage />
                   </FormItem>
                 )}
               />
               <motion.div
                 whileHover={{ scale: 1.02 }} // Slightly reduced hover scale
                 whileTap={{ scale: 0.98 }}
                 className="pt-2 sm:pt-4" // Add responsive top padding
               >
                  {/* Responsive Button */}
                 <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-base sm:text-lg md:text-xl py-3 sm:py-3.5 md:py-4 h-11 sm:h-12 md:h-14">
                    <UserPlus className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" /> Sign Up {/* Responsive Icon */}
                 </Button>
               </motion.div>
             </form>
           </Form>
            <p className="mt-4 sm:mt-6 text-center text-sm sm:text-base md:text-lg text-muted-foreground">
             Already have an account?{" "}
             <Link href="/login" className="font-semibold text-primary hover:underline hover:text-accent transition-colors">
               Log in
             </Link>
           </p>
         </CardContent>
       </Card>
    </motion.div>
  );
}
