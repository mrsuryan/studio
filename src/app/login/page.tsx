
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { useEffect } from 'react'; // Import useEffect

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

   // Redirect if already logged in
   useEffect(() => {
     if (typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true') {
       router.push('/'); // Redirect to homepage if already logged in
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
    const userName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1); // Capitalize first letter

    if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', values.email);
        localStorage.setItem('userName', userName); // Store derived name
        // Force Header to re-check localStorage (or use a global state)
        // A simple way is to dispatch a custom event or rely on page navigation
        window.dispatchEvent(new Event('storage')); // Trigger storage event listeners
    }


    toast({
      title: "Login Successful!",
      description: "Redirecting you to your dashboard...",
    });


    router.push('/'); // Redirect to homepage
  }

  return (
    <motion.div
      className="flex justify-center items-center min-h-[calc(100vh-15rem)] py-12" // Adjust min-height as needed
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md shadow-xl border-primary/20">
        <CardHeader className="text-center space-y-2 bg-gradient-to-b from-primary/5 to-transparent p-8 rounded-t-lg">
           <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          >
             <LogIn className="h-12 w-12 mx-auto text-primary" />
           </motion.div>
          <CardTitle className="text-3xl font-bold text-primary">Welcome Back!</CardTitle>
          <CardDescription className="text-lg">Login to access your EduHub dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} className="text-base py-6" />
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
                    <FormLabel className="text-base">Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} className="text-base py-6" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-lg py-7">
                   <LogIn className="mr-2 h-5 w-5" /> Login
                </Button>
              </motion.div>
            </form>
          </Form>
          <p className="mt-6 text-center text-base text-muted-foreground">
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
