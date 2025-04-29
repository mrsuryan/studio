
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
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const router = useRouter();
  const { toast } = useToast();

  // Check login status on component mount and when localStorage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      // Set loading true at the beginning of the check
      setIsLoading(true);
      // Ensure this runs only on the client side
      if (typeof window !== 'undefined') {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        const storedUserName = localStorage.getItem('userName');
        const storedUserEmail = localStorage.getItem('userEmail');
        setIsLoggedIn(loggedInStatus === 'true');
        setUserName(storedUserName || '');
        setUserEmail(storedUserEmail || '');
        setIsLoading(false); // Set loading false after checking
      } else {
        setIsLoading(false); // Also set loading false if window is not defined (SSR/initial render)
      }
    };

    checkLoginStatus();

    // Listen for storage changes from other tabs/windows or same tab updates
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  const handleLogout = () => {
     if (typeof window !== 'undefined') {
        // Clear all relevant user data
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userBio');
        localStorage.removeItem('userEmailNotifications');
        localStorage.removeItem('userDarkMode');
        // Optionally remove avatar seed if stored, or handle avatar logic differently
        // localStorage.removeItem('userAvatarSeed');
     }
    setIsLoggedIn(false);
    setUserName('');
    setUserEmail('');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    // Use router.push for client-side navigation
    router.push('/login');
     // Optionally force a reload if state updates aren't propagating reliably everywhere
     // setTimeout(() => window.location.reload(), 50);
  };

  const getInitials = (name: string) => {
    if (!name) return 'U'; // Handle cases where name might be empty
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
    >
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-4 md:mr-8 flex items-center space-x-1.5 sm:space-x-2 group">
           <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 sm:h-7 sm:w-7 text-primary transition-transform duration-300 group-hover:rotate-[10deg]"
            initial={{ rotate: -15, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                <path d="M6.5 2H20v20H6.5C4 22 4 19.5 4 19.5zM12 7h-1v7.5"/>
                <path d="m11 11 1 1 1-1"/>
           </motion.svg>
          <span className="font-bold text-lg sm:text-xl inline-block text-primary group-hover:text-accent transition-colors duration-300">
            EduHub Portal
          </span>
        </Link>
         {/* Responsive Navigation Links */}
         <nav className="hidden md:flex flex-1 items-center space-x-4 lg:space-x-6 text-sm lg:text-base font-medium">
           {[
              { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
              { href: "/courses", label: "Courses", icon: BookOpen },
              { href: "/assignments", label: "Assignments", icon: ClipboardList },
              { href: "/activities", label: "Activities", icon: Activity },
           ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 transition-colors hover:text-primary text-foreground/70 hover:-translate-y-0.5 transform duration-200"
              >
                <item.icon className="h-4 w-4 lg:h-5 lg:w-5" />
                {item.label}
              </Link>
            ))}
        </nav>
        {/* Mobile Navigation Trigger (Example Placeholder - Not fully functional) */}
        {/* <div className="md:hidden flex-1 flex justify-end">
             <Button variant="ghost" size="icon">
                 <Menu className="h-6 w-6" />
             </Button>
        </div> */}
        <div className="flex flex-1 md:flex-none justify-end items-center space-x-2 sm:space-x-3">
           {isLoading ? (
              // Skeleton Loader while checking auth status
              <div className="flex items-center space-x-2">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-8 w-20 hidden sm:block" />
              </div>
           ) : isLoggedIn ? (
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                     <Button variant="ghost" className="relative h-9 w-9 rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <Avatar className="h-9 w-9 border border-primary/20">
                          {/* Use a consistent seed for placeholder or implement image upload later */}
                          <AvatarImage src={`https://picsum.photos/seed/${userEmail || 'default'}/100`} alt={userName} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                              {getInitials(userName)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none truncate">{userName || 'User'}</p>
                      <p className="text-xs leading-none text-muted-foreground truncate">
                        {userEmail || 'No email'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                   {/* Mobile Only Nav Links */}
                    <div className="md:hidden">
                       {[
                          { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
                          { href: "/courses", label: "Courses", icon: BookOpen },
                          { href: "/assignments", label: "Assignments", icon: ClipboardList },
                          { href: "/activities", label: "Activities", icon: Activity },
                       ].map((item) => (
                          <DropdownMenuItem key={item.href} asChild className="cursor-pointer">
                              <Link href={item.href}>
                                 <item.icon className="mr-2 h-4 w-4" />
                                 <span>{item.label}</span>
                              </Link>
                          </DropdownMenuItem>
                       ))}
                        <DropdownMenuSeparator />
                    </div>
                   <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/profile">
                         <User className="mr-2 h-4 w-4" />
                         <span>Profile</span>
                      </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
           ) : (
             <>
               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                 <Button variant="ghost" size="sm" asChild className="text-sm px-2 sm:px-3">
                   <Link href="/login">
                     <LogIn className="mr-1 sm:mr-2 h-4 w-4" /> Login
                   </Link>
                 </Button>
               </motion.div>
               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                 <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-shadow text-sm px-2 sm:px-3">
                   <Link href="/signup">
                     <UserPlus className="mr-1 sm:mr-2 h-4 w-4" /> Sign Up
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
