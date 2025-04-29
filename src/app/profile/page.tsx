
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { UserCircle, Mail, Edit3, Save, Settings, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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

// Mock user data
const user = {
  name: "Alex Johnson",
  email: "alex.j@example.com",
  avatarUrl: "https://picsum.photos/seed/useravatar/200", // Placeholder avatar
  bio: "Lifelong learner and tech enthusiast. Currently exploring advanced React patterns.",
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const { toast } = useToast();

  const handleSave = () => {
    console.log("Saving profile:", { name, email, bio });
    // Add actual save logic here
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
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
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
               </motion.div>
              {isEditing ? (
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-2xl font-semibold mt-4 text-center"
                />
              ) : (
                <CardTitle className="text-2xl mt-4">{name}</CardTitle>
              )}
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-base text-muted-foreground mt-1 text-center"
                />
              ) : (
                 <CardDescription className="text-base flex items-center gap-1.5 mt-1">
                    <Mail className="h-4 w-4"/> {email}
                 </CardDescription>
              )}
            </CardHeader>
            <CardContent className="text-center">
               {isEditing ? (
                 <textarea
                   id="bio"
                   value={bio}
                   onChange={(e) => setBio(e.target.value)}
                   className="w-full p-2 border rounded-md text-sm text-muted-foreground min-h-[80px] focus:ring-primary focus:border-primary"
                   placeholder="Tell us about yourself..."
                 />
               ) : (
                <p className="text-sm text-muted-foreground italic">"{bio || 'No bio yet.'}"</p>
               )}
              <Separator className="my-4" />
              <Button
                variant={isEditing ? "default" : "outline"}
                size="sm"
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="w-full group transition-all"
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
              <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                <Label htmlFor="email-notifications" className="flex items-center gap-2 cursor-pointer">
                   <Bell className="h-4 w-4 text-muted-foreground"/> Email Notifications
                </Label>
                {/* Switch component would go here - Placeholder */}
                <span className="text-sm text-muted-foreground">[Switch Placeholder]</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                <Label htmlFor="dark-mode" className="flex items-center gap-2 cursor-pointer">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-muted-foreground">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                   </svg>
                    Dark Mode
                 </Label>
                 <span className="text-sm text-muted-foreground">[Switch Placeholder]</span>
              </div>
               <Button variant="outline" size="sm">Change Password</Button>
               <Button variant="destructive" size="sm">Delete Account</Button>
            </CardContent>
          </Card>

           {/* Learning Statistics Placeholder */}
           <Card className="shadow-md border-secondary/10">
            <CardHeader>
              <CardTitle className="text-xl">Learning Statistics</CardTitle>
              <CardDescription>Your progress overview.</CardDescription>
            </CardHeader>
             <CardContent>
                 <p className="text-muted-foreground">Course completion charts and activity summaries will appear here.</p>
                 <div className="mt-4 h-32 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                     Statistics Area
                 </div>
            </CardContent>
         </Card>

        </motion.div>
      </motion.div>
    </motion.div>
  );
}
