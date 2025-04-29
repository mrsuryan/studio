
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

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
     localStorage.setItem('isLoggedIn', 'true');
     // Force Header to re-check localStorage (or use a global state)
     window.dispatchEvent(new Event('storage')); // Trigger storage event listeners


     toast({
      title: "Signup Successful!",
      description: "Welcome to EduHub! Redirecting to login...",
      variant: "default", // Or success if you add a success variant
    });


    router.push('/login'); // Redirect to login page after signup
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
             <UserPlus className="h-12 w-12 mx-auto text-primary" />
           </motion.div>
          <CardTitle className="text-3xl font-bold text-primary">Create Your Account</CardTitle>
          <CardDescription className="text-lg">Join EduHub to start your learning journey.</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="text-base py-6" />
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
                      <Input type="password" placeholder="•••••••• (min. 6 characters)" {...field} className="text-base py-6" />
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
                   <UserPlus className="mr-2 h-5 w-5" /> Sign Up
                </Button>
              </motion.div>
            </form>
          </Form>
           <p className="mt-6 text-center text-base text-muted-foreground">
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
