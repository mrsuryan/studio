
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea"; // Import Textarea
import { UserCircle, Mail, Edit3, Save, Settings, Bell, Moon, Trash2 } from "lucide-react"; // Added Moon and Trash2
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch"; // Import Switch
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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
    },
  },
};

// Default user structure
interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  bio: string;
  emailNotifications: boolean;
  darkMode: boolean;
}

const defaultUser: UserProfile = {
    name: "User",
    email: "user@example.com",
    avatarUrl: `https://picsum.photos/seed/${Math.random()}/200`, // Random placeholder
    bio: "Learning enthusiast.",
    emailNotifications: true,
    darkMode: false, // Default to light mode
};


export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>(defaultUser);
  const { toast } = useToast();

  // Load user data from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem('userName');
      const storedEmail = localStorage.getItem('userEmail');
      const storedBio = localStorage.getItem('userBio'); // Attempt to load bio
      const storedNotifications = localStorage.getItem('userEmailNotifications');
      const storedDarkMode = localStorage.getItem('userDarkMode');

      const loadedProfile: UserProfile = {
        name: storedName || defaultUser.name,
        email: storedEmail || defaultUser.email,
        // Keep random avatar or implement avatar storage/upload later
        avatarUrl: `https://picsum.photos/seed/${storedEmail || defaultUser.email}/200`,
        bio: storedBio || defaultUser.bio,
        emailNotifications: storedNotifications ? storedNotifications === 'true' : defaultUser.emailNotifications,
        darkMode: storedDarkMode ? storedDarkMode === 'true' : defaultUser.darkMode,
      };

      setProfile(loadedProfile);
      setIsLoading(false); // Data loaded

      // Apply dark mode if enabled
      if (loadedProfile.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

    } else {
       setIsLoading(false); // Stop loading even if window is undefined (SSR case)
    }
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

     // Apply dark mode immediately
    if (id === 'darkMode') {
      if (checked) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
       if (typeof window !== 'undefined') {
           localStorage.setItem('userDarkMode', String(checked));
       }
    }
     if (id === 'emailNotifications') {
        if (typeof window !== 'undefined') {
           localStorage.setItem('userEmailNotifications', String(checked));
        }
     }
 };


  const handleSave = () => {
    console.log("Saving profile:", profile);
     if (typeof window !== 'undefined') {
        localStorage.setItem('userName', profile.name);
        localStorage.setItem('userEmail', profile.email); // Allow email editing? Maybe disable field later
        localStorage.setItem('userBio', profile.bio);
        localStorage.setItem('userEmailNotifications', String(profile.emailNotifications));
        localStorage.setItem('userDarkMode', String(profile.darkMode));
        // Trigger storage event to potentially update other components if needed
        window.dispatchEvent(new Event('storage'));
     }
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

   const handleDeleteAccount = () => {
     // Add confirmation dialog here before proceeding
     console.log("Deleting account...");
      if (typeof window !== 'undefined') {
        localStorage.clear(); // Clear all user data
         window.dispatchEvent(new Event('storage')); // Notify header/other components
      }
     toast({
       title: "Account Deleted",
       description: "Your account and data have been removed.",
       variant: "destructive",
     });
     // Redirect to signup or login page
     window.location.href = '/signup'; // Use window.location for full redirect after localStorage clear
   };


  return (
    <motion.div
      className="space-y-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-4xl font-bold text-primary mb-8 flex items-center gap-3"
        variants={itemVariants}
      >
        <UserCircle className="h-9 w-9" /> My Profile
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        {/* Profile Information Card */}
        <motion.div className="md:col-span-1" variants={itemVariants}>
          <Card className="shadow-lg border-primary/10">
            <CardHeader className="items-center text-center">
               <motion.div
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
               >
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                 {isLoading ? (
                    <Skeleton className="h-full w-full rounded-full" />
                  ) : (
                    <>
                     <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                     <AvatarFallback>{profile.name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </>
                  )}
                </Avatar>
               </motion.div>
               {isLoading ? (
                  <Skeleton className="h-8 w-3/4 mt-4 mx-auto" />
               ) : isEditing ? (
                <Input
                  id="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="text-2xl font-semibold mt-4 text-center"
                  placeholder="Your Name"
                />
              ) : (
                <CardTitle className="text-2xl mt-4">{profile.name}</CardTitle>
              )}
              {isLoading ? (
                 <Skeleton className="h-5 w-1/2 mt-2 mx-auto" />
              ) : isEditing ? (
                 // Consider disabling email editing or adding verification
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="text-base text-muted-foreground mt-1 text-center"
                  placeholder="your.email@example.com"
                />
              ) : (
                 <CardDescription className="text-base flex items-center justify-center gap-1.5 mt-1">
                    <Mail className="h-4 w-4"/> {profile.email}
                 </CardDescription>
              )}
            </CardHeader>
            <CardContent className="text-center">
               {isLoading ? (
                 <>
                   <Skeleton className="h-4 w-full mt-1" />
                   <Skeleton className="h-4 w-5/6 mt-1" />
                   <Skeleton className="h-4 w-3/4 mt-1" />
                 </>
               ) : isEditing ? (
                 <Textarea // Use Textarea component
                   id="bio"
                   value={profile.bio}
                   onChange={handleInputChange}
                   className="w-full p-2 border rounded-md text-sm text-muted-foreground min-h-[80px] focus:ring-primary focus:border-primary"
                   placeholder="Tell us about yourself..."
                 />
               ) : (
                <p className="text-sm text-muted-foreground italic">"{profile.bio || 'No bio yet.'}"</p>
               )}
              <Separator className="my-4" />
               {isLoading ? (
                   <Skeleton className="h-9 w-full" />
               ) : (
                   <Button
                    variant={isEditing ? "default" : "outline"}
                    size="sm"
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    className="w-full group transition-all"
                    disabled={isLoading} // Disable button while loading
                  >
                    {isEditing ? (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </>
                    ) : (
                      <>
                        <Edit3 className="mr-2 h-4 w-4 group-hover:animate-pulse" /> Edit Profile
                      </>
                    )}
                  </Button>
               )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Settings & Preferences Card */}
        <motion.div className="md:col-span-2 space-y-6" variants={itemVariants}>
          <Card className="shadow-md border-accent/10">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Settings className="h-5 w-5 text-accent" /> Account Settings
              </CardTitle>
              <CardDescription>Manage your account preferences and notification settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {isLoading ? (
                   <>
                       <Skeleton className="h-10 w-full" />
                       <Skeleton className="h-10 w-full" />
                       <div className="flex gap-2 pt-2">
                           <Skeleton className="h-9 w-32" />
                           <Skeleton className="h-9 w-32" />
                       </div>
                   </>
               ) : (
                 <>
                   <div className="flex items-center justify-between p-3 rounded-md bg-muted/30 border">
                     <Label htmlFor="emailNotifications" className="flex items-center gap-2 cursor-pointer text-base">
                       <Bell className="h-4 w-4 text-muted-foreground"/> Email Notifications
                     </Label>
                     <Switch
                       id="emailNotifications"
                       checked={profile.emailNotifications}
                       onCheckedChange={(checked) => handleSwitchChange(checked, 'emailNotifications')}
                     />
                   </div>
                   <div className="flex items-center justify-between p-3 rounded-md bg-muted/30 border">
                     <Label htmlFor="darkMode" className="flex items-center gap-2 cursor-pointer text-base">
                       <Moon className="h-4 w-4 text-muted-foreground" />
                        Dark Mode
                      </Label>
                      <Switch
                       id="darkMode"
                       checked={profile.darkMode}
                       onCheckedChange={(checked) => handleSwitchChange(checked, 'darkMode')}
                     />
                   </div>
                    <div className="pt-4 flex flex-wrap gap-3">
                        <Button variant="outline" size="sm">Change Password</Button>
                        <Button variant="destructive" size="sm" onClick={handleDeleteAccount}>
                           <Trash2 className="mr-2 h-4 w-4"/> Delete Account
                        </Button>
                    </div>
                 </>
               )}
            </CardContent>
          </Card>

           {/* Learning Statistics Placeholder */}
           <Card className="shadow-md border-secondary/10">
            <CardHeader>
              <CardTitle className="text-xl">Learning Statistics</CardTitle>
              <CardDescription>Your progress overview.</CardDescription>
            </CardHeader>
             <CardContent>
                 {isLoading ? (
                    <Skeleton className="h-32 w-full mt-4" />
                 ) : (
                     <>
                         <p className="text-muted-foreground">Course completion charts and activity summaries will appear here.</p>
                         <div className="mt-4 h-32 bg-muted/50 rounded-md flex items-center justify-center text-muted-foreground border border-dashed">
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
