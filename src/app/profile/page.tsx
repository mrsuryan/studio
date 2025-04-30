
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { UserCircle, Mail, Edit3, Save, Settings, Bell, Moon, Trash2, Upload } from "lucide-react"; // Added Upload
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
import { useState, useEffect, useRef } from "react";
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

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>(defaultUser);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input
  const { toast } = useToast();

  // Load user data from localStorage on mount
  useEffect(() => {
    let loadedProfile = { ...defaultUser }; // Start with default

    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem('userName');
      const storedEmail = localStorage.getItem('userEmail');
      const storedBio = localStorage.getItem('userBio');
      const storedNotifications = localStorage.getItem('userEmailNotifications');
      const storedDarkMode = localStorage.getItem('userDarkMode');
      const storedAvatarUrl = localStorage.getItem('userAvatarUrl'); // Load stored avatar URL

      loadedProfile = {
        name: storedName || defaultUser.name,
        email: storedEmail || defaultUser.email,
        // Use stored avatar URL if available, otherwise fallback
        avatarUrl: storedAvatarUrl || `https://picsum.photos/seed/${storedEmail || 'default-user'}/200`,
        bio: storedBio || defaultUser.bio,
        emailNotifications: storedNotifications ? storedNotifications === 'true' : defaultUser.emailNotifications,
        // Explicitly check stored dark mode preference
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };

 const handleSwitchChange = (checked: boolean, id: keyof UserProfile) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: checked,
    }));

     // Apply dark mode immediately and save to localStorage
    if (id === 'darkMode') {
      if (checked) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
       if (typeof window !== 'undefined') {
           localStorage.setItem('userDarkMode', String(checked));
           // Trigger storage event to ensure header theme updates if it listens
           window.dispatchEvent(new Event('storage'));
       }
    }
    // Save notification preference to localStorage
     if (id === 'emailNotifications' && typeof window !== 'undefined') {
        localStorage.setItem('userEmailNotifications', String(checked));
        // Optional: Trigger storage event if needed elsewhere
        // window.dispatchEvent(new Event('storage'));
     }
 };

  const handleSave = () => {
    console.log("Saving profile:", profile);
     if (typeof window !== 'undefined') {
        localStorage.setItem('userName', profile.name);
        // Avoid saving potentially edited email directly if it shouldn't be changeable
        // localStorage.setItem('userEmail', profile.email);
        localStorage.setItem('userBio', profile.bio);
        localStorage.setItem('userEmailNotifications', String(profile.emailNotifications));
        localStorage.setItem('userDarkMode', String(profile.darkMode)); // Ensure dark mode is saved
        localStorage.setItem('userAvatarUrl', profile.avatarUrl); // Save avatar URL
        // Trigger storage event to update header etc.
        window.dispatchEvent(new Event('storage'));
     }
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

   const handleDeleteAccount = () => {
     console.log("Attempting to delete account...");
      if (typeof window !== 'undefined') {
        localStorage.clear(); // Clear all local storage data
        window.dispatchEvent(new Event('storage')); // Notify header/other components
        document.documentElement.classList.remove('dark'); // Reset dark mode visually
      }
     toast({
       title: "Account Deleted",
       description: "Your account and data have been removed. Redirecting...",
       variant: "destructive",
     });
     // Redirect to signup page after a short delay
     setTimeout(() => {
         window.location.href = '/signup'; // Use standard redirect after clearing storage
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
             <UserCircle className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10" />
         </motion.div>
         My Profile {/* Responsive Icon */}
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
                  ) : isEditing ? (
                    <motion.div key="name-input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                       <Input
                         id="name"
                         value={profile.name}
                         onChange={handleInputChange}
                          className="text-xl sm:text-2xl md:text-3xl font-semibold mt-4 text-center h-auto py-1 px-2" // Responsive text/height/padding
                         placeholder="Your Name"
                       />
                    </motion.div>
                   ) : (
                     <motion.div key="name-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                       <CardTitle className="text-xl sm:text-2xl md:text-3xl mt-4">{profile.name}</CardTitle>
                     </motion.div>
                   )}
                </AnimatePresence>
               {/* Email - Read-only */}
               {isLoading ? (
                  <Skeleton className="h-5 sm:h-6 md:h-7 w-1/2 mt-2 mx-auto" />
               ) : (
                  <CardDescription className="text-sm sm:text-base md:text-lg flex items-center justify-center gap-1 sm:gap-1.5 mt-1 md:mt-2">
                     <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5"/> {profile.email} {/* Responsive Icon */}
                  </CardDescription>
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
                    ) : isEditing ? (
                       <motion.div key="bio-textarea" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                         <Textarea
                           id="bio"
                           value={profile.bio}
                           onChange={handleInputChange}
                           className="w-full p-2 border rounded-md text-xs sm:text-sm md:text-base text-muted-foreground min-h-[60px] sm:min-h-[80px] md:min-h-[100px] focus:ring-primary focus:border-primary mt-2 md:mt-3" // Responsive styles
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
                              key={isEditing ? 'save-button' : 'edit-button'}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              whileHover={{ scale: 1.03 }} // Scale button on hover
                              whileTap={{ scale: 0.97 }}   // Scale down on tap
                         >
                            <Button
                             variant={isEditing ? "default" : "outline"}
                             size="sm"
                             onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                             className="w-full group transition-all text-xs sm:text-sm md:text-base md:py-2.5" // Responsive text size & padding
                             disabled={isLoading}
                           >
                             {isEditing ? (
                               <>
                                 <Save className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" /> Save Changes {/* Responsive Icon */}
                               </>
                             ) : (
                               <>
                                 <Edit3 className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 group-hover:animate-pulse" /> Edit Profile {/* Responsive Icon */}
                               </>
                             )}
                           </Button>
                         </motion.div>
                    )}
                 </AnimatePresence>
             </CardContent>
           </Card>
        </motion.div>

        {/* Settings & Preferences Card */}
        <motion.div className="lg:col-span-2 space-y-6 md:space-y-8 lg:space-y-10" variants={itemVariants}>
           {/* Animate Card Content */}
           <Card className="shadow-md border-accent/10 rounded-lg overflow-hidden"> {/* Added rounded-lg and overflow */}
             <CardHeader className="p-4 sm:p-6 md:p-8"> {/* Responsive padding */}
               <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2">
                  <motion.div whileHover={{ rotate: 15 }}> {/* Animate Icon */}
                      <Settings className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-accent" />
                  </motion.div>
                  Account Settings {/* Responsive Icon */}
               </CardTitle>
               <CardDescription className="text-sm md:text-base">Manage your account preferences and notification settings.</CardDescription>
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
                        <div className="flex flex-wrap gap-2 pt-2 md:pt-4">
                            <Skeleton className="h-9 md:h-10 w-32 md:w-40" />
                            <Skeleton className="h-9 md:h-10 w-36 md:w-44" />
                        </div>
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
                     {/* Buttons with responsive text and wrapping */}
                     <motion.div variants={itemVariants} className="pt-4 md:pt-6 flex flex-wrap gap-2 sm:gap-3">
                         {/* Animated Button */}
                         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" size="sm" className="text-xs sm:text-sm md:text-base md:py-2 md:px-4">Change Password</Button>
                         </motion.div>
                          {/* Delete Account with Confirmation */}
                          <AlertDialog>
                              <AlertDialogTrigger asChild>
                                 {/* Animated Button */}
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                     <Button variant="destructive" size="sm" className="text-xs sm:text-sm md:text-base md:py-2 md:px-4">
                                         <Trash2 className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5"/> Delete Account {/* Responsive Icon */}
                                     </Button>
                                  </motion.div>
                              </AlertDialogTrigger>
                              {/* Animated Dialog Content */}
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
                  </>
                )}
             </motion.div>
           </Card>

            {/* Learning Statistics Placeholder */}
            <Card className="shadow-md border-secondary/10 rounded-lg overflow-hidden"> {/* Added rounded-lg and overflow */}
             <CardHeader className="p-4 sm:p-6 md:p-8"> {/* Responsive padding */}
               <CardTitle className="text-lg sm:text-xl md:text-2xl">Learning Statistics</CardTitle>
               <CardDescription className="text-sm md:text-base">Your progress overview.</CardDescription>
             </CardHeader>
               <motion.div
                   className="p-4 sm:p-6 md:p-8 pt-0" // Responsive padding
                   variants={cardContentVariant}
                   initial="hidden"
                   animate="visible"
                >
                  {isLoading ? (
                     <Skeleton className="h-24 sm:h-32 md:h-40 w-full mt-4" /> // Responsive height
                  ) : (
                      <>
                          <motion.p variants={itemVariants} className="text-muted-foreground text-sm sm:text-base md:text-lg">Course completion charts and activity summaries will appear here.</motion.p>
                           <motion.div
                               variants={itemVariants}
                               className="mt-4 h-24 sm:h-32 md:h-40 bg-muted/50 rounded-md flex items-center justify-center text-muted-foreground border border-dashed text-xs sm:text-sm md:text-base relative overflow-hidden" // Added relative and overflow
                            >
                                {/* Subtle animated lines background */}
                                <motion.div
                                   className="absolute inset-0 flex opacity-10"
                                   style={{
                                      backgroundImage: `linear-gradient(45deg, hsl(var(--border)) 25%, transparent 25%, transparent 75%, hsl(var(--border)) 75%, hsl(var(--border))), linear-gradient(45deg, hsl(var(--border)) 25%, transparent 25%, transparent 75%, hsl(var(--border)) 75%, hsl(var(--border)))`,
                                      backgroundSize: `20px 20px`,
                                      backgroundPosition: `0 0, 10px 10px`,
                                    }}
                                   animate={{ backgroundPosition: ['0 0, 10px 10px', '20px 20px, 30px 30px'] }}
                                   transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                />
                                <span className="relative z-10">Statistics Area (Coming Soon)</span>
                           </motion.div>
                      </>
                  )}
               </motion.div>
          </Card>

        </motion.div>
      </motion.div>
    </motion.div>
  );
}
