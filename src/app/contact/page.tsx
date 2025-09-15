<<<<<<< HEAD
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>
              We'd love to hear from you. Here's how you can reach us.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">support@eduhub.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-muted-foreground">
                  123 Education Street<br />
                  Learning City, LC 12345
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this regarding?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message here..."
                  className="min-h-[150px]"
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
=======

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, User, MessageSquare, Star } from 'lucide-react'; // Added Star icon

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
  feedback: z.string().optional(), // Added optional feedback field
});

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const itemVariants = {
   initial: { opacity: 0, y: 15 },
   animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
 };

 const formContainerVariants = {
   animate: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
 };


export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      feedback: '', // Initialize feedback field
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Contact form submitted:', values); // Include feedback in log
    // Simulate sending the message
    toast({
      title: 'Message Sent!',
      description: 'Thank you for contacting us and providing feedback. We will get back to you soon.', // Updated toast message
    });
    form.reset(); // Reset form after submission
  }

  return (
    <motion.div
       className="flex justify-center items-center min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-10rem)] py-8 sm:py-12 px-4"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
       <motion.div variants={cardVariants} className="w-full max-w-md sm:max-w-lg md:max-w-2xl">
           <Card className="shadow-xl border-primary/20 overflow-hidden rounded-xl">
             <CardHeader className="text-center space-y-1 sm:space-y-2 bg-gradient-to-b from-primary/5 to-transparent p-6 sm:p-8 rounded-t-xl">
                <motion.div
                 initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                 animate={{ scale: 1, opacity: 1, rotate: 0 }}
                 transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 10 }}
               >
                  <Mail className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:h-14 mx-auto text-primary" />
                </motion.div>
                <motion.div variants={itemVariants}>
                   <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">Contact Us</CardTitle>
                </motion.div>
                <motion.div variants={itemVariants} transition={{ delay: 0.1 }}>
                   <CardDescription className="text-base sm:text-lg md:text-xl">Have questions or feedback? Fill out the form below.</CardDescription> {/* Updated description */}
                </motion.div>
             </CardHeader>
             <CardContent className="p-6 sm:p-8">
               <Form {...form}>
                 <motion.form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 sm:space-y-6"
                    variants={formContainerVariants}
                    initial="initial"
                    animate="animate"
                 >
                   <motion.div variants={itemVariants}>
                     <FormField
                       control={form.control}
                       name="name"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel className="text-sm sm:text-base md:text-lg flex items-center gap-1.5"> <User className="h-4 w-4" /> Name</FormLabel>
                           <FormControl>
                             <Input placeholder="Your Name" {...field} className="text-sm sm:text-base md:text-lg py-2.5 sm:py-3 h-10 sm:h-11 md:h-12" />
                           </FormControl>
                           <AnimatePresence>
                               <FormMessage/>
                           </AnimatePresence>
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
                           <FormLabel className="text-sm sm:text-base md:text-lg flex items-center gap-1.5"><Mail className="h-4 w-4"/> Email Address</FormLabel>
                           <FormControl>
                             <Input placeholder="you@example.com" {...field} className="text-sm sm:text-base md:text-lg py-2.5 sm:py-3 h-10 sm:h-11 md:h-12" />
                           </FormControl>
                           <AnimatePresence>
                               <FormMessage/>
                           </AnimatePresence>
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
                            <FormLabel className="text-sm sm:text-base md:text-lg flex items-center gap-1.5"><MessageSquare className="h-4 w-4" /> Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="What is your message about?" {...field} className="text-sm sm:text-base md:text-lg py-2.5 sm:py-3 h-10 sm:h-11 md:h-12" />
                            </FormControl>
                            <AnimatePresence>
                                <FormMessage/>
                            </AnimatePresence>
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
                           <FormLabel className="text-sm sm:text-base md:text-lg flex items-center gap-1.5"><MessageSquare className="h-4 w-4" /> Message</FormLabel>
                           <FormControl>
                             <Textarea placeholder="Your message..." {...field} className="min-h-[100px] sm:min-h-[120px] md:min-h-[150px] text-sm sm:text-base md:text-lg" />
                           </FormControl>
                           <AnimatePresence>
                               <FormMessage/>
                           </AnimatePresence>
                         </FormItem>
                       )}
                     />
                   </motion.div>
                   {/* Added Feedback Field */}
                   <motion.div variants={itemVariants}>
                     <FormField
                       control={form.control}
                       name="feedback"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel className="text-sm sm:text-base md:text-lg flex items-center gap-1.5"><Star className="h-4 w-4" /> Feedback (Optional)</FormLabel>
                           <FormControl>
                             <Textarea placeholder="Share your thoughts or suggestions..." {...field} className="min-h-[80px] sm:min-h-[100px] md:min-h-[120px] text-sm sm:text-base md:text-lg" />
                           </FormControl>
                           <AnimatePresence>
                               <FormMessage/>
                           </AnimatePresence>
                         </FormItem>
                       )}
                     />
                   </motion.div>
                   <motion.div
                     variants={itemVariants}
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     className="pt-2 sm:pt-4"
                   >
                     <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-base sm:text-lg md:text-xl py-3 sm:py-3.5 md:py-4 h-11 sm:h-12 md:h-14">
                       <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" /> Send Message
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
>>>>>>> fae96507e8fb8862cd7d4e20cf72dc9293ba1a91
