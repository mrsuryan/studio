"use client"; // Mark as Client Component for state, effects, and interactivity

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { UserCircle, Mail, Edit3, Save, Settings, Bell, Moon, Trash2, Upload, Lock, KeyRound, Loader } from "lucide-react"; // Added Loader
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // Import Alert Dialog components
import * as z from "zod"; // Import Zod
import { useForm } from "react-hook-form"; // Import useForm
import { zodResolver } from "@hookform/resolvers/zod"; // Import zodResolver
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Import Form components
import * as React from 'react'; // Import React


// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Faster stagger
      delayChildren: 0.1, // Adjusted delay
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
      damping: 12, // Adjusted damping
    },
  },
};

const cardContentVariant = {
   hidden: { opacity: 0, y: 10 },
   visible: {
     opacity: 1,
     y: 0,
     transition: { staggerChildren: 0.05, delayChildren: 0.1 }
   }
 };


// Default user structure
interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string; // Can now be a data URL
  bio: string;
  emailNotifications: boolean;
  darkMode: boolean;
}

const defaultUser: UserProfile = {
    name: "User",
    email: "user@example.com",
    avatarUrl: `https://picsum.photos/seed/default-user/200`, // Consistent default placeholder
    bio: "Learning enthusiast.",
    emailNotifications: true,
    darkMode: false, // Default to light mode
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit for localStorage

// Zod schema for password change form
const passwordSchema = z.object({
    currentPassword: z.string().min(6, "Current password is required (min. 6 chars)."), // Added min length hint
    newPassword: z.string().min(8, "New password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm password is required."),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Error applies to the confirm field
  });

export default function ProfilePage() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>(defaultUser);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input
  const { toast } = useToast();

  // Form hook for password change
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
      resolver: zodResolver(passwordSchema),
      defaultValues: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    });

  // Load user data and apply theme from localStorage on mount
  useEffect(() => {
    let loadedProfile = { ...defaultUser }; // Start with default

    // Ensure this code only runs on the client
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem('userName');
      const storedEmail = localStorage.getItem('userEmail');
      const storedBio = localStorage.getItem('userBio');
      const storedNotifications = localStorage.getItem('userEmailNotifications');
      const storedDarkMode = localStorage.getItem('userDarkMode'); // Load only from storage
      const storedAvatarUrl = localStorage.getItem('userAvatarUrl'); // Load stored avatar URL

      loadedProfile = {
        name: storedName || defaultUser.name,
        email: storedEmail || defaultUser.email,
        avatarUrl: storedAvatarUrl || `https://picsum.photos/seed/${storedEmail || 'default-user'}/200`,
        bio: storedBio || defaultUser.bio,
        emailNotifications: storedNotifications ? storedNotifications === 'true' : defaultUser.emailNotifications,
        // Explicitly set dark mode based ONLY on localStorage preference, defaulting to false
        darkMode: storedDarkMode === 'true',
      };

       // Apply initial dark mode based *only* on stored preference
      if (loadedProfile.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    setProfile(loadedProfile);
    // Simulate loading time or wait for actual data fetch
    setTimeout(() => setIsLoading(false), 300); // Simulate loading for skeletons

  }, []); // Empty dependency array ensures this runs only once on mount

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };

 // Handle switch change for notifications and dark mode
 const handleSwitchChange = (checked: boolean, id: 'darkMode' | 'emailNotifications') => {
    // Ensure this runs only on the client
    if (typeof window === 'undefined') return;

    setProfile((prevProfile) => ({
        ...prevProfile,
        [id]: checked,
    }));

    // Save preference to localStorage
    localStorage.setItem(id === 'darkMode' ? 'userDarkMode' : 'userEmailNotifications', String(checked));

    // Apply theme change immediately if dark mode was toggled
    if (id === 'darkMode') {
        if (checked) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
    }

    // Trigger storage event to allow header (or other components) to react if needed
    window.dispatchEvent(new Event('storage'));
 };


  const handleProfileSave = () => {
    // Ensure this runs only on the client
    if (typeof window === 'undefined') return;

    console.log("Saving profile:", profile);
    // Only save fields that are editable in this section (name, bio)
    localStorage.setItem('userName', profile.name);
    localStorage.setItem('userBio', profile.bio);
    // Ensure avatar URL is saved if it was changed
    localStorage.setItem('userAvatarUrl', profile.avatarUrl);
    // Trigger storage event to update header etc.
    window.dispatchEvent(new Event('storage'));

    setIsEditingProfile(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information (name, bio, avatar) has been saved.",
    });
  };

  // Handle password change form submission
  function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
      console.log("Password change submitted:", values);
      // --- Simulate password change success ---
      // In a real app: Send 'values.currentPassword' and 'values.newPassword' to the backend for verification and update.
      // For this demo, we'll just show a success message.

      // Simulate success (replace with actual API call logic)
      toast({
          title: "Password Updated",
          description: "Your password has been changed successfully. (Demo)", // Indicate it's a demo
       });
      passwordForm.reset(); // Clear the form after submission
    }

    // Simulate Email Change Request
    const handleEmailChangeRequest = () => {
      // In a real app:
      // 1. Prompt the user for the new email address (e.g., using a Dialog).
      // 2. Send the request to the backend.
      // 3. Backend sends a verification email to the new address.
      // 4. User clicks link in email to confirm.
      // 5. Backend updates the email address.
      toast({
        title: "Change Email (Demo)",
        description: "Functionality to change email requires backend integration and is not fully implemented in this demo.",
        variant: "default", // Use default variant for informational messages
      });
    };

   const handleDeleteAccount = () => {
     // Ensure this runs only on the client
     if (typeof window === 'undefined') return;

     console.log("Attempting to delete account...");
    localStorage.clear(); // Clear all local storage data
    window.dispatchEvent(new Event('storage')); // Notify header/other components
    document.documentElement.classList.remove('dark'); // Reset dark mode visually

     toast({
       title: "Account Deleted",
       description: "Your account and data have been removed. Redirecting...",
       variant: "destructive",
     });
     // Redirect to signup page after a short delay
     // Using window.location.href for simple client-side redirect after clearing storage
     setTimeout(() => {
         window.location.href = '/signup';
     }, 1500); // Delay to allow toast visibility
   };

   // Handle file selection for avatar
   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     const file = event.target.files?.[0];
     if (!file) return;

     // Basic validation
     if (!file.type.startsWith('image/')) {
       toast({
         variant: "destructive",
         title: "Invalid File Type",
         description: "Please select an image file (e.g., JPG, PNG, WEBP).",
       });
       return;
     }

     if (file.size > MAX_FILE_SIZE) {
       toast({
         variant: "destructive",
         title: "File Too Large",
         description: `Please select an image smaller than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
       });
       return;
     }

     // Read file as data URL
     const reader = new FileReader();
     reader.onloadend = () => {
       const dataUrl = reader.result as string;
       setProfile((prevProfile) => ({
         ...prevProfile,
         avatarUrl: dataUrl,
       }));
       // Automatically save the new avatar to localStorage
       if (typeof window !== 'undefined') {
           localStorage.setItem('userAvatarUrl', dataUrl);
           // Trigger storage event to update header
           window.dispatchEvent(new Event('storage'));
       }

        toast({
            title: "Avatar Updated",
            description: "Your profile picture has been changed.",
        });
        // Optionally trigger save if in editing mode? Or just save avatar immediately.
        // For simplicity, saving avatar immediately without needing main "Save" button.
     };
     reader.onerror = () => {
        toast({
            variant: "destructive",
            title: "Error Reading File",
            description: "Could not read the selected image file.",
        });
     }
     reader.readAsDataURL(file);
   };

   // Trigger hidden file input click
   const triggerFileInput = () => {
     fileInputRef.current?.click();
   };

  return (
    <motion.div
      className="space-y-8 md:space-y-10 lg:space-y-12" // Adjusted spacing
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
         className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6 md:mb-8 lg:mb-10 flex items-center gap-2 sm:gap-3" // Responsive heading
        variants={itemVariants}
      >
         {/* Animated Icon */}
         <motion.div whileHover={{ rotate: 10, scale: 1.1 }}>
             <Settings className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10" /> {/* Changed Icon to Settings */}
         </motion.div>
         Settings & Profile {/* Updated Title */}
      </motion.h1>

      {/* Responsive Grid */}
      <motion.div
         className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12" // Adjusted breakpoint and gap
        variants={containerVariants} // Stagger children within the grid
      >
        {/* Profile Information Card */}
        <motion.div className="lg:col-span-1" variants={itemVariants}>
          <Card className="shadow-lg border-primary/10 rounded-lg overflow-hidden"> {/* Added rounded-lg and overflow */}
             <CardHeader className="items-center text-center p-4 sm:p-6 md:p-8"> {/* Responsive padding */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 150 }} // Adjusted delay
                  className="relative group" // Add relative positioning for overlay
                >
                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/webp" // Specify accepted image types
                    className="hidden"
                    aria-label="Upload profile picture"
                  />
                 {/* Responsive Avatar */}
                 <Avatar
                     className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 border-4 border-primary/20 cursor-pointer transition-transform duration-300 group-hover:scale-105" // Added hover scale
                     onClick={triggerFileInput} // Make avatar clickable
                     role="button"
                     tabIndex={0}
                     onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') triggerFileInput() }}
                 >
                  {isLoading ? (
                     <Skeleton className="h-full w-full rounded-full" />
                   ) : (
                     <>
                      <AvatarImage src={profile.avatarUrl} alt={profile.name} className="transition-opacity duration-300" />
                      {/* Fallback with initials */}
                      <AvatarFallback className="text-lg sm:text-xl md:text-2xl font-semibold">
                        {profile.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                      </AvatarFallback>
                     </>
                   )}
                 </Avatar>
                  {/* Edit Icon Overlay */}
                  <div
                     className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer" // Darker overlay
                     onClick={triggerFileInput}
                     role="button"
                     aria-label="Change profile picture"
                   >
                      {/* Animated Upload Icon */}
                      <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.2 }}
                      >
                         <Upload className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" /> {/* Responsive Icon */}
                     </motion.div>
                   </div>
                </motion.div>
                {/* Name - Editable */}
                <AnimatePresence mode="wait"> {/* Animate presence for swapping Input/Title */}
                  {isLoading ? (
                    <Skeleton key="name-skeleton" className="h-7 sm:h-8 md:h-9 w-3/4 mt-4 mx-auto" />
                  ) : isEditingProfile ? (
                    <motion.div key="name-input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full mt-4">
                       <Label htmlFor="name" className="sr-only">Name</Label>
                       <Input
                         id="name"
                         value={profile.name}
                         onChange={handleProfileInputChange}
                          className="text-xl sm:text-2xl md:text-3xl font-semibold text-center h-auto py-1 px-2" // Responsive text/height/padding
                         placeholder="Your Name"
                       />
                    </motion.div>
                   ) : (
                     <motion.div key="name-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                       <CardTitle className="text-xl sm:text-2xl md:text-3xl mt-4">{profile.name}</CardTitle>
                     </motion.div>
                   )}
                </AnimatePresence>
               {/* Email - Read-only with Change Button */}
               {isLoading ? (
                  <Skeleton className="h-5 sm:h-6 md:h-7 w-1/2 mt-2 mx-auto" />
               ) : (
                  <div className="mt-1 md:mt-2 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                    <CardDescription className="text-sm sm:text-base md:text-lg flex items-center gap-1 sm:gap-1.5">
                       <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5"/> {profile.email} {/* Responsive Icon */}
                    </CardDescription>
                     {/* Add a small button to trigger email change flow */}
                     <Button variant="link" size="sm" onClick={handleEmailChangeRequest} className="text-xs p-0 h-auto text-accent hover:underline">
                         Change Email
                      </Button>
                  </div>
               )}
             </CardHeader>
             <CardContent className="text-center p-4 sm:p-6 md:p-8 pt-0"> {/* Responsive padding */}
                {/* Bio - Editable */}
                <AnimatePresence mode="wait">
                    {isLoading ? (
                      <div key="bio-skeleton" className="space-y-1 mt-1 md:mt-2">
                        <Skeleton className="h-4 sm:h-5 w-full" />
                        <Skeleton className="h-4 sm:h-5 w-5/6" />
                        <Skeleton className="h-4 sm:h-5 w-3/4" />
                      </div>
                    ) : isEditingProfile ? (
                       <motion.div key="bio-textarea" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full mt-2 md:mt-3">
                         <Label htmlFor="bio" className="sr-only">Bio</Label>
                         <Textarea
                           id="bio"
                           value={profile.bio}
                           onChange={handleProfileInputChange}
                           className="w-full p-2 border rounded-md text-xs sm:text-sm md:text-base text-muted-foreground min-h-[60px] sm:min-h-[80px] md:min-h-[100px] focus:ring-primary focus:border-primary" // Responsive styles
                           placeholder="Tell us about yourself..."
                         />
                       </motion.div>
                    ) : (
                       <motion.div key="bio-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <p className="text-xs sm:text-sm md:text-base text-muted-foreground italic mt-2 md:mt-3">"{profile.bio || 'No bio yet.'}"</p>
                       </motion.div>
                    )}
                </AnimatePresence>
               <Separator className="my-4 md:my-6" />
                {/* Edit/Save Button */}
                <AnimatePresence mode="wait">
                    {isLoading ? (
                         <Skeleton key="button-skeleton" className="h-9 md:h-10 w-full" />
                    ) : (
                         <motion.div
                              key={isEditingProfile ? 'save-button' : 'edit-button'}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              whileHover={{ scale: 1.03 }} // Scale button on hover
                              whileTap={{ scale: 0.97 }}   // Scale down on tap
                         >
                            <Button
                             variant={isEditingProfile ? "default" : "outline"}
                             size="sm"
                             onClick={() => (isEditingProfile ? handleProfileSave() : setIsEditingProfile(true))}
                             className="w-full group transition-all text-xs sm:text-sm md:text-base md:py-2.5" // Responsive text size & padding
                             disabled={isLoading}
                           >
                             {isEditingProfile ? (
                               <>
                                 <Save className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" /> Save Changes {/* Updated Text */}
                               </>
                             ) : (
                               <>
                                 <Edit3 className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 group-hover:animate-pulse" /> Edit Profile
                               </>
                             )}
                           </Button>
                         </motion.div>
                    )}
                 </AnimatePresence>
             </CardContent>
           </Card>
        </motion.div>

        {/* Settings & Security Section */}
        <motion.div className="lg:col-span-2 space-y-6 md:space-y-8 lg:space-y-10" variants={itemVariants}>

          {/* Change Password Card */}
          <Card className="shadow-md border-secondary/10 rounded-lg overflow-hidden">
             <CardHeader className="p-4 sm:p-6 md:p-8">
               <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2">
                 <motion.div whileHover={{ rotate: -15 }}> <Lock className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-secondary-foreground" /> </motion.div>
                 Change Password
               </CardTitle>
               <CardDescription className="text-sm md:text-base">Update your account password. Requires backend integration for full functionality.</CardDescription>
             </CardHeader>
             <motion.div
                 className="p-4 sm:p-6 md:p-8 pt-0" // Responsive padding
                 variants={cardContentVariant} // Use content variant
                 initial="hidden"
                 animate="visible"
              >
                {isLoading ? (
                   <div className="space-y-4">
                     <Skeleton className="h-10 md:h-12 w-full" />
                     <Skeleton className="h-10 md:h-12 w-full" />
                     <Skeleton className="h-10 md:h-12 w-full" />
                     <Skeleton className="h-9 md:h-10 w-1/3 mt-2" />
                   </div>
                ) : (
                 <Form {...passwordForm}>
                     <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4 sm:space-y-6">
                       <motion.div variants={itemVariants}>
                         <FormField
                           control={passwordForm.control}
                           name="currentPassword"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel className="text-sm sm:text-base md:text-lg">Current Password</FormLabel>
                               <FormControl>
                                 <Input type="password" placeholder="••••••••" {...field} className="text-sm sm:text-base md:text-lg py-2.5 sm:py-3 h-10 sm:h-11 md:h-12" />
                               </FormControl>
                               <AnimatePresence>
                                 <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                                   <FormMessage/>
                                  </motion.div>
                               </AnimatePresence>
                             </FormItem>
                           )}
                         />
                       </motion.div>
                        <motion.div variants={itemVariants}>
                           <FormField
                             control={passwordForm.control}
                             name="newPassword"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel className="text-sm sm:text-base md:text-lg">New Password</FormLabel>
                                 <FormControl>
                                   <Input type="password" placeholder="New Password (min. 8 chars)" {...field} className="text-sm sm:text-base md:text-lg py-2.5 sm:py-3 h-10 sm:h-11 md:h-12" />
                                 </FormControl>
                                 <AnimatePresence>
                                   <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                                     <FormMessage/>
                                    </motion.div>
                                 </AnimatePresence>
                               </FormItem>
                             )}
                           />
                       </motion.div>
                        <motion.div variants={itemVariants}>
                           <FormField
                             control={passwordForm.control}
                             name="confirmPassword"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel className="text-sm sm:text-base md:text-lg">Confirm New Password</FormLabel>
                                 <FormControl>
                                   <Input type="password" placeholder="Confirm New Password" {...field} className="text-sm sm:text-base md:text-lg py-2.5 sm:py-3 h-10 sm:h-11 md:h-12" />
                                 </FormControl>
                                 <AnimatePresence>
                                   <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                                     <FormMessage/>
                                    </motion.div>
                                 </AnimatePresence>
                               </FormItem>
                             )}
                           />
                       </motion.div>
                       <motion.div
                          variants={itemVariants}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="pt-2"
                        >
                           <Button type="submit" size="sm" className="text-xs sm:text-sm md:text-base md:py-2.5" disabled={passwordForm.formState.isSubmitting}>
                               {passwordForm.formState.isSubmitting ? (
                                   <Loader className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                   <KeyRound className="mr-2 h-4 w-4"/>
                               )}
                                Update Password
                            </Button>
                       </motion.div>
                     </form>
                   </Form>
                )}
             </motion.div>
           </Card>

           {/* Preferences Card */}
           <Card className="shadow-md border-accent/10 rounded-lg overflow-hidden"> {/* Added rounded-lg and overflow */}
             <CardHeader className="p-4 sm:p-6 md:p-8"> {/* Responsive padding */}
               <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2">
                  <motion.div whileHover={{ rotate: 15 }}> {/* Animate Icon */}
                      <Settings className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-accent" />
                  </motion.div>
                  Preferences {/* Responsive Icon */}
               </CardTitle>
               <CardDescription className="text-sm md:text-base">Manage your account preferences.</CardDescription>
             </CardHeader>
             <motion.div
                 className="space-y-4 md:space-y-5 p-4 sm:p-6 md:p-8 pt-0" // Responsive padding
                 variants={cardContentVariant} // Use content variant
                 initial="hidden"
                 animate="visible"
              >
                {isLoading ? (
                    <>
                        <Skeleton className="h-10 md:h-12 w-full" />
                        <Skeleton className="h-10 md:h-12 w-full" />
                    </>
                ) : (
                  <>
                    <motion.div variants={itemVariants} className="flex items-center justify-between p-3 md:p-4 rounded-md bg-muted/30 border">
                      <Label htmlFor="emailNotifications" className="flex items-center gap-2 cursor-pointer text-sm sm:text-base md:text-lg">
                        <Bell className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground"/> Email Notifications {/* Responsive Icon */}
                      </Label>
                       {/* Animated Switch */}
                       <motion.div whileTap={{ scale: 0.9 }}>
                         <Switch
                           id="emailNotifications"
                           checked={profile.emailNotifications}
                           onCheckedChange={(checked) => handleSwitchChange(checked, 'emailNotifications')}
                           aria-label="Toggle email notifications"
                         />
                       </motion.div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="flex items-center justify-between p-3 md:p-4 rounded-md bg-muted/30 border">
                      <Label htmlFor="darkMode" className="flex items-center gap-2 cursor-pointer text-sm sm:text-base md:text-lg">
                        <Moon className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" /> {/* Responsive Icon */}
                         Theme
                       </Label>
                       <div className="flex items-center gap-2">
                          <span className="text-muted-foreground text-xs sm:text-sm">{profile.darkMode ? "Dark" : "Light"}</span>
                           {/* Animated Switch */}
                           <motion.div whileTap={{ scale: 0.9 }}>
                             <Switch
                                  id="darkMode"
                                  checked={profile.darkMode}
                                  onCheckedChange={(checked) => handleSwitchChange(checked, 'darkMode')}
                                  aria-label="Toggle dark mode"
                              />
                           </motion.div>
                       </div>
                    </motion.div>
                  </>
                )}
             </motion.div>
           </Card>

            {/* Danger Zone Card */}
            <Card className="shadow-md border-destructive/20 rounded-lg overflow-hidden">
                 <CardHeader className="p-4 sm:p-6 md:p-8 bg-destructive/5">
                   <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2 text-destructive">
                     <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                     Danger Zone
                   </CardTitle>
                   <CardDescription className="text-sm md:text-base text-destructive/80">
                     Manage potentially destructive account actions.
                   </CardDescription>
                 </CardHeader>
                 <motion.div
                     className="p-4 sm:p-6 md:p-8 pt-4" // Responsive padding
                     variants={cardContentVariant}
                     initial="hidden"
                     animate="visible"
                 >
                     {isLoading ? (
                         <Skeleton className="h-9 md:h-10 w-36 md:w-44" />
                     ) : (
                         <motion.div variants={itemVariants} className="flex flex-wrap gap-2 sm:gap-3">
                             {/* Delete Account with Confirmation */}
                             <AlertDialog>
                                 <AlertDialogTrigger asChild>
                                     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                         <Button variant="destructive" size="sm" className="text-xs sm:text-sm md:text-base md:py-2 md:px-4">
                                             <Trash2 className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5"/> Delete Account
                                         </Button>
                                     </motion.div>
                                 </AlertDialogTrigger>
                                 <AlertDialogContent as={motion.div} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                                     <AlertDialogHeader>
                                         <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                         <AlertDialogDescription>
                                             This action cannot be undone. This will permanently delete your
                                             account and remove your data from our servers.
                                         </AlertDialogDescription>
                                     </AlertDialogHeader>
                                     <AlertDialogFooter>
                                         <AlertDialogCancel>Cancel</AlertDialogCancel>
                                         <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive hover:bg-destructive/90">
                                             Yes, delete account
                                         </AlertDialogAction>
                                     </AlertDialogFooter>
                                 </AlertDialogContent>
                             </AlertDialog>
                         </motion.div>
                     )}
                 </motion.div>
             </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
