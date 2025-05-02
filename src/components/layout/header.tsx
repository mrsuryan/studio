"use client"; // Mark as Client Component for hooks and interactivity

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Use App Router hooks
import { BookOpen, LogIn, LogOut, UserPlus, LayoutDashboard, ClipboardList, Activity, User, Search, Rocket, X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription, // Import SheetDescription
  SheetFooter,
} from "@/components/ui/sheet"


export function Header() {
  // State Management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [hasMounted, setHasMounted] = useState(false); // Track if component has mounted
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Routing and Path
  const router = useRouter();
  const pathname = usePathname(); // Get current path

  // Utilities
  const { toast } = useToast();

  // Config
  const hideSearchOnRoutes = ['/login', '/signup'];
  const shouldHideSearch = hideSearchOnRoutes.includes(pathname);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, requiresLogin: true },
    { href: "/courses", label: "Courses", icon: BookOpen, requiresLogin: true },
    { href: "/assignments", label: "Assignments", icon: ClipboardList, requiresLogin: true },
    { href: "/activities", label: "Activities", icon: Activity, requiresLogin: true },
    { href: "/interactive-demo", label: "Demo", icon: Rocket, requiresLogin: true },
  ];

  // --- Effects ---

  // Set hasMounted to true once the component mounts on the client
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Effect to check auth status and theme on mount and on storage change
  useEffect(() => {
    // Only run this effect on the client after mounting
    if (!hasMounted) return;

    const checkStatusAndTheme = () => {
      setIsLoadingAuth(true);
      const loggedInStatus = localStorage.getItem('isLoggedIn');
      const storedUserName = localStorage.getItem('userName');
      const storedUserEmail = localStorage.getItem('userEmail');
      const storedAvatarUrl = localStorage.getItem('userAvatarUrl');

      const isLoggedInNow = loggedInStatus === 'true';
      setIsLoggedIn(isLoggedInNow);
      setUserName(isLoggedInNow ? (storedUserName || '') : '');
      setUserEmail(isLoggedInNow ? (storedUserEmail || '') : '');
      // Set avatar: use stored URL, fallback to email-based seed, or default if no email
      setAvatarUrl(isLoggedInNow
          ? (storedAvatarUrl || `https://picsum.photos/seed/${storedUserEmail || 'default'}/100`)
          : '');

      setIsLoadingAuth(false);
    };

    // Initial check
    checkStatusAndTheme();

    // Listen for changes in localStorage (e.g., login/logout from another tab)
    window.addEventListener('storage', checkStatusAndTheme);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', checkStatusAndTheme);
    };
  }, [hasMounted]); // Depend only on hasMounted

  // Filter nav items based on auth status (only after mount and auth check)
  const filteredNavItems = hasMounted && !isLoadingAuth
    ? navItems.filter(item => !item.requiresLogin || isLoggedIn)
    : [];

  // Close mobile menu on route change
   useEffect(() => {
     setIsMobileMenuOpen(false);
   }, [pathname]);


  // --- Handlers ---

  const handleLogout = () => {
    // Clear user-specific data from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userBio');
    localStorage.removeItem('userEmailNotifications');
    // localStorage.removeItem('userDarkMode'); // Keep dark mode preference
    localStorage.removeItem('userAvatarUrl');

    // Trigger storage event to notify other components (like this header)
    window.dispatchEvent(new Event('storage'));

    // Reset theme to system default (optional, depends on desired behavior)
    // Removed automatic dark mode removal on logout
    // document.documentElement.classList.remove('dark');

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push('/login'); // Redirect to login page
  };

  // Helper to get initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return 'U'; // Default to 'U' if name is missing
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    // Optional: Add debounced search logic here
    console.log('Search Query:', event.target.value);
  };

   const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (searchQuery.trim()) {
         // In a real app, navigate to a search results page
         // router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
         toast({
             title: "Search Submitted",
             description: `Searching for: "${searchQuery}" (Feature not fully implemented)`,
         });
         console.log('Submitting search for:', searchQuery);
      }
      setIsMobileMenuOpen(false); // Close mobile menu after search submit
   };

  // --- Animation Variants ---
  const searchContainerVariants = {
    unfocused: { width: '25%' }, // Start smaller
    focused: { width: '50%' },   // Expand on focus
  };

  const searchIconVariants = {
    unfocused: { x: 0, opacity: 0.5, scale: 1 },
    focused: { x: 5, opacity: 1, scale: 1.1, rotate: 5 }, // Subtle animation on focus
  };

  const clearIconVariants = {
    hidden: { opacity: 0, scale: 0, x: 10 },
    visible: { opacity: 1, scale: 1, x: 0 },
  };

  // --- Render Logic ---

  // Conditionally render based on mount status to avoid hydration errors
  if (!hasMounted) {
    // Render simplified header or skeleton during server render / initial client render before mount
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          {/* Basic Logo Placeholder */}
          <Link href="/" className="mr-4 md:mr-6 flex items-center space-x-1.5 sm:space-x-2 group shrink-0">
             {/* Simplified SVG or just text */}
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 sm:h-8 sm:w-8 text-primary">
                 <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                 <path d="M12 11.5 6.5 8.5 12 5.5l5.5 3z"/>
                 <path d="m6.5 14 5.5 3 5.5-3"/><path d="M12 14.5V19"/>
             </svg>
             <span className="font-bold text-lg sm:text-xl inline-block text-primary">EduHub Portal</span>
          </Link>
          <div className="flex-1"></div> {/* Spacer */}
          {/* Skeleton for Auth Controls */}
          <div className="flex items-center space-x-2 ml-auto">
            <Skeleton className="h-9 w-9 rounded-full md:hidden" /> {/* Mobile Menu Skeleton */}
            <Skeleton className="h-9 w-9 rounded-full" /> {/* Avatar Skeleton */}
            <Skeleton className="h-8 w-16 hidden sm:block" /> {/* Login/Signup Skeleton */}
          </div>
        </div>
      </header>
    );
  }


  // --- Full Render (After Mount) ---
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
    >
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        {/* Logo and Title */}
        <Link href="/" className="mr-4 md:mr-6 flex items-center space-x-1.5 sm:space-x-2 group shrink-0"> {/* Adjusted mr-2 to mr-4 */}
           {/* Enhanced Logo SVG - Render consistently */}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7 sm:h-8 sm:w-8 text-primary transition-transform duration-300 group-hover:rotate-[10deg]"
              initial={{ rotate: -15, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
              <path d="M12 11.5 6.5 8.5 12 5.5l5.5 3z"/>
              <path d="m6.5 14 5.5 3 5.5-3"/>
              <path d="M12 14.5V19"/>
            </motion.svg>
           {/* Ensure text rendering is consistent */}
          <span className="font-bold text-lg sm:text-xl inline-block text-primary group-hover:text-accent transition-colors duration-300">
             EduHub Portal
          </span>
        </Link>

         {/* Animated Search Bar - Conditionally Rendered & Hidden on Mobile */}
         {!isLoadingAuth && !shouldHideSearch && isLoggedIn && (
                 <motion.div
                    className="hidden md:flex flex-1 justify-center mx-4 md:mx-6"
                    variants={searchContainerVariants}
                    initial="unfocused"
                    animate={isSearchFocused ? 'focused' : 'unfocused'}
                    transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                  >
                    <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
                      <motion.div
                        className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10"
                        variants={searchIconVariants}
                        animate={isSearchFocused ? 'focused' : 'unfocused'}
                        transition={{ type: "spring", stiffness: 180, damping: 12 }}
                      >
                        <Search className="h-4 w-4 text-muted-foreground" />
                      </motion.div>
                      <Input
                        type="search"
                        placeholder={isSearchFocused ? "Enter keywords..." : "Search courses..."}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        className={cn(
                          "w-full rounded-full bg-muted pl-8 sm:pl-9 pr-8 py-2 h-9 sm:h-10 text-sm sm:text-base focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1 transition-all duration-300 ease-in-out shadow-inner hover:shadow-md focus:shadow-lg focus:bg-background focus:ring-2",
                          isSearchFocused ? "pr-8" : "pr-4" // Adjust padding for clear button
                        )}
                        aria-label="Search courses"
                      />
                      {/* Clear Search Button */}
                      <AnimatePresence>
                        {searchQuery && isSearchFocused && (
                          <motion.button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/50 z-10"
                            aria-label="Clear search"
                            variants={clearIconVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{ duration: 0.15, type: "spring", stiffness: 200, damping: 15 }}
                          >
                            <X className="size-4" />
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </form>
                  </motion.div>
          )}

         {/* Spacer for desktop */}
         <div className="flex-1 hidden md:block"></div>


         {/* Desktop Navigation */}
         <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 text-sm lg:text-base font-medium ml-auto md:ml-0 mr-2 sm:mr-4">
           {filteredNavItems.map((item) => {
               const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'));
               return (
                   <Link
                       key={item.href}
                       href={item.href}
                       className={cn(
                          "relative flex items-center gap-1.5 transition-colors hover:text-primary pb-1 group", // Added pb-1 and group
                          isActive ? "text-primary font-semibold" : "text-foreground/70",
                          // Animated underline effect
                          "after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:origin-center after:transition-transform after:duration-300 after:ease-out",
                           isActive ? "after:scale-x-100" : "after:scale-x-0 group-hover:after:scale-x-50" // Underline animation
                       )}
                   >
                       <item.icon className="h-4 w-4 lg:h-5 lg:w-5" />
                       {item.label}
                   </Link>
               )
            })}
        </nav>

        {/* Auth Controls (Login/Signup or User Dropdown) */}
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 ml-auto md:ml-0">
           {isLoadingAuth ? (
                // Skeletons while loading auth state
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-9 w-9 rounded-full md:hidden" /> {/* Mobile Menu Skeleton */}
                    <Skeleton className="h-9 w-9 rounded-full" /> {/* Avatar Skeleton */}
                    <Skeleton className="h-8 w-16 hidden sm:block" /> {/* Login/Signup Skeleton */}
                </div>
              ) : isLoggedIn ? (
                // User Dropdown and Mobile Menu Trigger (Logged In)
                <>
                    <DropdownMenu>
                         {/* Ensure DropdownMenuTrigger has only one direct child */}
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full p-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border border-primary/20">
                                <AvatarImage src={avatarUrl} alt={userName} />
                                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                                    {getInitials(userName)}
                                </AvatarFallback>
                                </Avatar>
                            </Button>
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

                    {/* Mobile Menu Sheet */}
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                         {/* Ensure SheetTrigger has only one direct child */}
                        <SheetTrigger asChild className="md:hidden">
                             <Button variant="ghost" size="icon" className="w-9 h-9 sm:w-10 sm:w-10">
                                    <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0 flex flex-col bg-background">
                             <SheetHeader className="p-4 border-b flex flex-row items-center justify-between">
                                <SheetTitle>
                                    <Link href="/" className="flex items-center space-x-2 group" onClick={() => setIsMobileMenuOpen(false)}>
                                         {/* Use the same motion SVG as the main header */}
                                         <motion.svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 24 24"
                                              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                              className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-[10deg]">
                                              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                                              <path d="M12 11.5 6.5 8.5 12 5.5l5.5 3z"/>
                                              <path d="m6.5 14 5.5 3 5.5-3"/><path d="M12 14.5V19"/>
                                          </motion.svg>
                                         <span className="font-bold text-lg text-primary">EduHub Portal</span>
                                     </Link>
                                 </SheetTitle>
                                 {/* SheetClose is implicitly handled by SheetContent */}
                             </SheetHeader>
                             {/* Mobile Search */}
                             {!shouldHideSearch && (
                                 <div className="p-4 border-b">
                                     <form onSubmit={handleSearchSubmit} className="relative">
                                         {/* Search Icon */}
                                         <motion.div
                                            className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none z-10"
                                             variants={searchIconVariants}
                                             animate={isSearchFocused ? 'focused' : 'unfocused'}
                                             transition={{ type: "spring", stiffness: 180, damping: 12 }}
                                         >
                                                <Search className="h-4 w-4 text-muted-foreground" />
                                            </motion.div>
                                            {/* Search Input */}
                                            <Input
                                                type="search"
                                                placeholder={isSearchFocused ? "Enter keywords..." : "Search courses..."}
                                                value={searchQuery}
                                                onChange={handleSearchChange}
                                                onFocus={() => setIsSearchFocused(true)}
                                                onBlur={() => setIsSearchFocused(false)}
                                                className={cn(
                                                    "w-full rounded-full bg-muted pl-8 sm:pl-9 pr-8 py-2 h-9 sm:h-10 text-sm sm:text-base focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1 transition-all duration-300 ease-in-out shadow-inner hover:shadow-md focus:shadow-lg focus:bg-background focus:ring-2",
                                                    isSearchFocused ? "pr-8" : "pr-4"
                                                )}
                                                aria-label="Search courses"
                                            />
                                            {/* Clear Search Button */}
                                          <AnimatePresence>
                                             {searchQuery && isSearchFocused && (
                                                  <motion.button
                                                      type="button"
                                                      onClick={() => setSearchQuery('')}
                                                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground z-10"
                                                      aria-label="Clear search"
                                                      variants={clearIconVariants}
                                                      initial="hidden"
                                                      animate="visible"
                                                      exit="hidden"
                                                      transition={{ duration: 0.15, type: "spring", stiffness: 200, damping: 15 }}
                                                   >
                                                     <X className="size-4" />
                                                  </motion.button>
                                              )}
                                          </AnimatePresence>
                                     </form>
                                 </div>
                             )}
                             {/* Mobile Navigation */}
                             <nav className="flex-1 overflow-y-auto py-4 space-y-1">
                                 {filteredNavItems.map((item) => {
                                     const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'));
                                     return (
                                         <SheetClose asChild key={item.href}>
                                              <Link
                                                 href={item.href}
                                                 className={cn(
                                                     "flex items-center gap-3 px-4 py-2.5 rounded-md text-base font-medium transition-colors",
                                                     isActive ? "bg-primary/10 text-primary font-semibold" : "text-foreground/80 hover:bg-muted hover:text-foreground"
                                                 )}
                                             >
                                                 <item.icon className="h-5 w-5" />
                                                 {item.label}
                                             </Link>
                                         </SheetClose>
                                     );
                                 })}
                             </nav>
                             {/* Mobile Logout Button */}
                             <SheetFooter className="p-4 mt-auto border-t">
                                 <SheetClose asChild>
                                     <Button
                                         variant="outline"
                                         className="w-full flex items-center justify-center gap-2 text-destructive border-destructive hover:bg-destructive/10"
                                         onClick={handleLogout}
                                      >
                                         <LogOut className="mr-2 h-4 w-4" />
                                         <span>Log out</span>
                                     </Button>
                                 </SheetClose>
                             </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </>
              ) : (
                // Login/Signup Buttons (Logged Out)
                <>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="ghost" size="sm" asChild className="text-xs px-1.5 sm:text-sm sm:px-3">
                          <Link href="/login">
                             <LogIn className="mr-1 sm:mr-2 h-4 w-4" /> Login
                          </Link>
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-shadow text-xs px-1.5 sm:text-sm sm:px-3">
                          <Link href="/signup">
                            <UserPlus className="mr-1 sm:mr-2 h-4 w-4" /> Sign Up
                          </Link>
                        </Button>
                    </motion.div>
                </>
              )
           }
        </div>
      </div>
    </motion.header>
  );
}
