
'use client'; // Add this directive for client components

import Link from 'next/link';
import { BookOpen, LogIn, LogOut, UserPlus, LayoutDashboard, ClipboardList, Activity, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';


export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState(''); // Added state for email
  const router = useRouter();
  const { toast } = useToast();

  // Check login status on component mount and when localStorage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedInStatus = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') : null;
      const storedUserName = typeof window !== 'undefined' ? localStorage.getItem('userName') : null;
      const storedUserEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null; // Get email
      setIsLoggedIn(loggedInStatus === 'true');
      setUserName(storedUserName || '');
      setUserEmail(storedUserEmail || ''); // Set email
    };

    checkLoginStatus();

    // Listen for storage changes from other tabs/windows or same tab updates
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
     if (typeof window !== 'undefined') {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail'); // Remove email on logout
        localStorage.removeItem('userBio');
        localStorage.removeItem('userEmailNotifications');
        localStorage.removeItem('userDarkMode');
     }
    setIsLoggedIn(false);
    setUserName('');
    setUserEmail(''); // Clear email state
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push('/login'); // Redirect to login page after logout
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  }


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
    >
      <div className="container flex h-16 items-center"> {/* Increased height */}
        <Link href="/" className="mr-8 flex items-center space-x-2 group"> {/* Increased margin */}
          {/* Enhanced SVG Logo */}
           <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-[10deg]" // Increased size & hover effect
            initial={{ rotate: -15, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                <path d="M6.5 2H20v20H6.5C4 22 4 19.5 4 19.5zM12 7h-1v7.5"/>
                <path d="m11 11 1 1 1-1"/>
           </motion.svg>
          <span className="font-bold text-xl inline-block text-primary group-hover:text-accent transition-colors duration-300"> {/* Increased font size & hover */}
            EduHub Portal
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-base font-medium"> {/* Increased text size */}
           {[
              { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
              { href: "/courses", label: "Courses", icon: BookOpen },
              { href: "/assignments", label: "Assignments", icon: ClipboardList },
              { href: "/activities", label: "Activities", icon: Activity },
           ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 transition-colors hover:text-primary text-foreground/70 hover:-translate-y-0.5 transform duration-200" // Add Tailwind hover effect instead
              >
                <item.icon className="h-5 w-5" /> {/* Increased icon size */}
                {item.label}
              </Link>
            ))}
        </nav>
        <div className="flex items-center space-x-3"> {/* Increased spacing */}
           {isLoggedIn ? (
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                     <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                        <Avatar className="h-9 w-9">
                          {/* Add AvatarImage if you store profile picture URLs */}
                          {/* <AvatarImage src="/path/to/avatar.jpg" alt={userName} /> */}
                          <AvatarFallback className="bg-primary text-primary-foreground">
                              {getInitials(userName)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userEmail}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                   <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/profile">
                         <User className="mr-2 h-4 w-4" />
                         <span>Profile</span>
                      </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
           ) : (
             <>
               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                 <Button variant="ghost" size="sm" asChild>
                   <Link href="/login">
                     <LogIn className="mr-2 h-4 w-4" /> Login
                   </Link>
                 </Button>
               </motion.div>
               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                 <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-shadow">
                   <Link href="/signup">
                     <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                   </Link>
                 </Button>
               </motion.div>
             </>
           )}
        </div>
      </div>
    </motion.header>
  );
}
