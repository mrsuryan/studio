
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
import { LogIn } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function LoginPage() {
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
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Login submitted:", values);

    // --- Simulate successful login ---
    // Derive a placeholder name from the email
    const nameFromEmail = values.email.split('@')[0] || "User";
    // Capitalize first letter, handle short names gracefully
    const userName = nameFromEmail.length > 0
      ? nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1)
      : "User";

    if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', values.email);
        localStorage.setItem('userName', userName);
        // Set default values for other profile fields if not existing
        if (!localStorage.getItem('userBio')) {
            localStorage.setItem('userBio', 'Learning enthusiast.');
        }
        if (!localStorage.getItem('userEmailNotifications')) {
            localStorage.setItem('userEmailNotifications', 'true');
        }
        if (!localStorage.getItem('userDarkMode')) {
            localStorage.setItem('userDarkMode', 'false');
        }
        // Trigger storage event for header update
        window.dispatchEvent(new Event('storage'));
    }

    toast({
      title: "Login Successful!",
      description: "Redirecting you to your dashboard...",
    });

    router.push('/'); // Redirect to homepage
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
              <LogIn className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 mx-auto text-primary" />
            </motion.div>
            {/* Responsive Titles */}
           <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">Welcome Back!</CardTitle>
           <CardDescription className="text-base sm:text-lg md:text-xl">Login to access your EduHub dashboard.</CardDescription>
         </CardHeader>
         <CardContent className="p-6 sm:p-8">
           <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6"> {/* Responsive spacing */}
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
                       <Input type="password" placeholder="••••••••" {...field} className="text-sm sm:text-base md:text-lg py-2.5 sm:py-3 h-10 sm:h-11 md:h-12" />
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
                    <LogIn className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" /> Login {/* Responsive Icon */}
                 </Button>
               </motion.div>
             </form>
           </Form>
           <p className="mt-4 sm:mt-6 text-center text-sm sm:text-base md:text-lg text-muted-foreground">
             Don't have an account?{" "}
             <Link href="/signup" className="font-semibold text-primary hover:underline hover:text-accent transition-colors">
               Sign up now
             </Link>
           </p>
         </CardContent>
       </Card>
    </motion.div>
  );
}
