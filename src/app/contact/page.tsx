
"use client"; // Mark as Client Component for form handling and animations

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { Send, Mail } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Form schema definition
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function ContactPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Contact form submitted:", values);
    // Simulate sending the message
    // In a real app, you would send this data to a backend API
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you shortly.",
    });
    form.reset(); // Reset form fields after submission
  }

  return (
    <motion.div
      className="space-y-8 md:space-y-10 lg:space-y-12 max-w-3xl mx-auto" // Center content and limit width
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6 md:mb-8 lg:mb-10 flex items-center justify-center gap-2 sm:gap-3" // Center heading
        variants={itemVariants}
      >
        <Mail className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10" />
        Contact Us
      </motion.h1>

      <motion.div variants={itemVariants}>
        <Card className="shadow-xl border-primary/10 rounded-lg overflow-hidden">
          <CardHeader className="p-4 sm:p-6 md:p-8 bg-gradient-to-b from-primary/5 to-transparent">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl text-primary">Get in Touch</CardTitle>
            <CardDescription className="text-sm sm:text-base md:text-lg">
              Have questions or feedback? Fill out the form below and we'll respond as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 md:p-8">
            <Form {...form}>
              <motion.form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 sm:space-y-6"
                variants={containerVariants} // Stagger form fields
              >
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} className="text-sm sm:text-base h-10 sm:h-11" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} className="text-sm sm:text-base h-10 sm:h-11" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Subject of your message" {...field} className="text-sm sm:text-base h-10 sm:h-11" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Type your message here..."
                            className="min-h-[120px] sm:min-h-[150px] text-sm sm:text-base" // Responsive height
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="pt-4 flex justify-end" // Align button to the right
                >
                  <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-base sm:text-lg md:text-xl py-2.5 sm:py-3 md:py-3.5 px-6 sm:px-8 md:px-10">
                    <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Send Message
                  </Button>
                </motion.div>
              </motion.form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
