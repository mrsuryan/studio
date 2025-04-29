
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { UserCircle, Mail, Edit3, Save, Settings, Bell, Moon, Trash2, Upload } from "lucide-react"; // Added Upload
import { motion } from "framer-motion";
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
      staggerChildren: 0.1,
      delayChildren: 0.15, // Adjusted delay
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
    darkMode: false,
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
        darkMode: storedDarkMode ? storedDarkMode === 'true' : defaultUser.darkMode,
      };

      // Apply initial dark mode
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

     // Apply dark mode immediately and save
    if (id === 'darkMode') {
      if (checked) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
       if (typeof window !== 'undefined') {
           localStorage.setItem('userDarkMode', String(checked));
           // Trigger storage event to potentially update other components like header
           window.dispatchEvent(new Event('storage'));
       }
    }
    // Save notification preference
     if (id === 'emailNotifications' && typeof window !== 'undefined') {
        localStorage.setItem('userEmailNotifications', String(checked));
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
        localStorage.setItem('userDarkMode', String(profile.darkMode));
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
        document.documentElement.classList.remove('dark'); // Reset dark mode just in case
      }
     toast({
       title: "Account Deleted",
       description: "Your account and data have been removed. Redirecting...",
       variant: "destructive",
     });
     // Redirect to signup page after a short delay
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
      className="space-y-8 md:space-y-10" // Adjusted spacing
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-primary mb-6 md:mb-8 flex items-center gap-2 sm:gap-3" // Responsive heading
        variants={itemVariants}
      >
        <UserCircle className="h-7 w-7 sm:h-9 sm:w-9" /> My Profile
      </motion.h1>

      {/* Responsive Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10" // Adjusted breakpoint and gap
        variants={containerVariants}
      >
        {/* Profile Information Card */}
        <motion.div className="lg:col-span-1" variants={itemVariants}>
          <Card className="shadow-lg border-primary/10">
            <CardHeader className="items-center text-center p-4 sm:p-6"> {/* Responsive padding */}
               <motion.div
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ delay: 0.2, type: "spring", stiffness: 150 }} // Adjusted delay
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
                <Avatar
                    className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-primary/20 cursor-pointer"
                    onClick={triggerFileInput} // Make avatar clickable
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') triggerFileInput() }}
                >
                 {isLoading ? (
                    <Skeleton className="h-full w-full rounded-full" />
                  ) : (
                    <>
                     <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                     {/* Fallback with initials */}
                     <AvatarFallback className="text-lg sm:text-xl font-semibold">
                       {profile.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                     </AvatarFallback>
                    </>
                  )}
                </Avatar>
                 {/* Edit Icon Overlay */}
                 <div
                    className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    onClick={triggerFileInput}
                    role="button"
                    aria-label="Change profile picture"
                  >
                    <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
               </motion.div>
               {/* Name - Editable */}
               {isLoading ? (
                  <Skeleton className="h-7 sm:h-8 w-3/4 mt-4 mx-auto" />
               ) : isEditing ? (
                <Input
                  id="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="text-xl sm:text-2xl font-semibold mt-4 text-center h-auto py-1" // Responsive text/height
                  placeholder="Your Name"
                />
              ) : (
                <CardTitle className="text-xl sm:text-2xl mt-4">{profile.name}</CardTitle>
              )}
              {/* Email - Read-only */}
              {isLoading ? (
                 <Skeleton className="h-5 w-1/2 mt-2 mx-auto" />
              ) : (
                 <CardDescription className="text-sm sm:text-base flex items-center justify-center gap-1 sm:gap-1.5 mt-1">
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4"/> {profile.email}
                 </CardDescription>
              )}
            </CardHeader>
            <CardContent className="text-center p-4 sm:p-6 pt-0"> {/* Responsive padding */}
               {/* Bio - Editable */}
               {isLoading ? (
                 <div className="space-y-1 mt-1">
                   <Skeleton className="h-4 w-full" />
                   <Skeleton className="h-4 w-5/6" />
                   <Skeleton className="h-4 w-3/4" />
                 </div>
               ) : isEditing ? (
                 <Textarea
                   id="bio"
                   value={profile.bio}
                   onChange={handleInputChange}
                   className="w-full p-2 border rounded-md text-xs sm:text-sm text-muted-foreground min-h-[60px] sm:min-h-[80px] focus:ring-primary focus:border-primary mt-2" // Responsive styles
                   placeholder="Tell us about yourself..."
                 />
               ) : (
                <p className="text-xs sm:text-sm text-muted-foreground italic mt-2">"{profile.bio || 'No bio yet.'}"</p>
               )}
              <Separator className="my-4" />
               {/* Edit/Save Button */}
               {isLoading ? (
                   <Skeleton className="h-9 w-full" />
               ) : (
                   <Button
                    variant={isEditing ? "default" : "outline"}
                    size="sm"
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    className="w-full group transition-all text-xs sm:text-sm" // Responsive text size
                    disabled={isLoading}
                  >
                    {isEditing ? (
                      <>
                        <Save className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Save Changes
                      </>
                    ) : (
                      <>
                        <Edit3 className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:animate-pulse" /> Edit Profile
                      </>
                    )}
                  </Button>
               )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Settings & Preferences Card */}
        <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
          <Card className="shadow-md border-accent/10">
            <CardHeader className="p-4 sm:p-6"> {/* Responsive padding */}
              <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-accent" /> Account Settings
              </CardTitle>
              <CardDescription className="text-sm">Manage your account preferences and notification settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0"> {/* Responsive padding */}
               {isLoading ? (
                   <>
                       <Skeleton className="h-10 w-full" />
                       <Skeleton className="h-10 w-full" />
                       <div className="flex flex-wrap gap-2 pt-2">
                           <Skeleton className="h-9 w-32" />
                           <Skeleton className="h-9 w-36" />
                       </div>
                   </>
               ) : (
                 <>
                   <div className="flex items-center justify-between p-3 rounded-md bg-muted/30 border">
                     <Label htmlFor="emailNotifications" className="flex items-center gap-2 cursor-pointer text-sm sm:text-base">
                       <Bell className="h-4 w-4 text-muted-foreground"/> Email Notifications
                     </Label>
                     <Switch
                       id="emailNotifications"
                       checked={profile.emailNotifications}
                       onCheckedChange={(checked) => handleSwitchChange(checked, 'emailNotifications')}
                       aria-label="Toggle email notifications"
                     />
                   </div>
                   <div className="flex items-center justify-between p-3 rounded-md bg-muted/30 border">
                     <Label htmlFor="darkMode" className="flex items-center gap-2 cursor-pointer text-sm sm:text-base">
                       <Moon className="h-4 w-4 text-muted-foreground" />
                        Dark Mode
                      </Label>
                      <Switch
                       id="darkMode"
                       checked={profile.darkMode}
                       onCheckedChange={(checked) => handleSwitchChange(checked, 'darkMode')}
                       aria-label="Toggle dark mode"
                     />
                   </div>
                    {/* Buttons with responsive text and wrapping */}
                    <div className="pt-4 flex flex-wrap gap-2 sm:gap-3">
                        <Button variant="outline" size="sm" className="text-xs sm:text-sm">Change Password</Button>
                         {/* Delete Account with Confirmation */}
                         <AlertDialog>
                             <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm" className="text-xs sm:text-sm">
                                    <Trash2 className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4"/> Delete Account
                                </Button>
                             </AlertDialogTrigger>
                             <AlertDialogContent>
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
                    </div>
                 </>
               )}
            </CardContent>
          </Card>

           {/* Learning Statistics Placeholder */}
           <Card className="shadow-md border-secondary/10">
            <CardHeader className="p-4 sm:p-6"> {/* Responsive padding */}
              <CardTitle className="text-lg sm:text-xl">Learning Statistics</CardTitle>
              <CardDescription className="text-sm">Your progress overview.</CardDescription>
            </CardHeader>
             <CardContent className="p-4 sm:p-6 pt-0"> {/* Responsive padding */}
                 {isLoading ? (
                    <Skeleton className="h-24 sm:h-32 w-full mt-4" /> // Responsive height
                 ) : (
                     <>
                         <p className="text-muted-foreground text-sm sm:text-base">Course completion charts and activity summaries will appear here.</p>
                         <div className="mt-4 h-24 sm:h-32 bg-muted/50 rounded-md flex items-center justify-center text-muted-foreground border border-dashed text-xs sm:text-sm">
                             Statistics Area (Coming Soon)
                         </div>
                     </>
                 )}
            </CardContent>
         </Card>

        </motion.div>
      </motion.div>
    </motion.div>
  );
}
