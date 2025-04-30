
'use client'; // Add this directive for client components

import Link from 'next/link';
import { BookOpen, LogIn, LogOut, UserPlus, LayoutDashboard, ClipboardList, Activity, User, Search, Rocket, X, Menu } from 'lucide-react'; // Added Search, Rocket, X, Menu
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Added Input
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Import usePathname
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton
import { cn } from '@/lib/utils'; // Import cn utility
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet" // Import Sheet components

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(''); // State for avatar URL
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [isSearchFocused, setIsSearchFocused] = useState(false); // State for search focus animation
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu sheet
  const router = useRouter();
  const pathname = usePathname(); // Get current path
  const { toast } = useToast();

  // Routes where the search bar should be hidden
  const hideSearchOnRoutes = ['/login', '/signup'];
  const shouldHideSearch = hideSearchOnRoutes.includes(pathname);

  // Navigation items - Filtered based on login state later
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, requiresLogin: true },
    { href: "/courses", label: "Courses", icon: BookOpen, requiresLogin: true },
    { href: "/assignments", label: "Assignments", icon: ClipboardList, requiresLogin: true },
    { href: "/activities", label: "Activities", icon: Activity, requiresLogin: true },
    { href: "/interactive-demo", label: "Demo", icon: Rocket, requiresLogin: true }, // Added Demo Link
  ];

  const filteredNavItems = navItems.filter(item => !item.requiresLogin || isLoggedIn);

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
        const storedAvatarUrl = localStorage.getItem('userAvatarUrl'); // Load avatar URL

        const isLoggedInNow = loggedInStatus === 'true';
        setIsLoggedIn(isLoggedInNow);
        setUserName(isLoggedInNow ? (storedUserName || '') : '');
        setUserEmail(isLoggedInNow ? (storedUserEmail || '') : '');
        // Set avatar URL if logged in, otherwise use default/placeholder logic or clear it
        setAvatarUrl(isLoggedInNow
            ? (storedAvatarUrl || `https://picsum.photos/seed/${storedUserEmail || 'default'}/100`)
            : ''); // Clear avatar URL if not logged in

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

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);


  const handleLogout = () => {
     if (typeof window !== 'undefined') {
        // Clear all relevant user data
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userBio');
        localStorage.removeItem('userEmailNotifications');
        localStorage.removeItem('userDarkMode');
        localStorage.removeItem('userAvatarUrl'); // Clear avatar URL on logout
        // Optionally remove avatar seed if stored, or handle avatar logic differently
        // localStorage.removeItem('userAvatarSeed');
        // Dispatch storage event to notify other components (like profile page)
        window.dispatchEvent(new Event('storage'));
     }
    setIsLoggedIn(false);
    setUserName('');
    setUserEmail('');
    setAvatarUrl(''); // Clear avatar URL state
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    // TODO: Implement actual search functionality (e.g., debounced API call)
    console.log('Search Query:', event.target.value);
  };

   const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (searchQuery.trim()) {
         // TODO: Redirect to a search results page or perform search action
         toast({
             title: "Search Submitted",
             description: `Searching for: "${searchQuery}" (Feature not fully implemented)`,
         });
         console.log('Submitting search for:', searchQuery);
         // Example: router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
       // Optionally close mobile menu after search submit
      setIsMobileMenuOpen(false);
   };


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
    >
      {/* Ensure container padding is responsive */}
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        {/* Logo and Title */}
        <Link href="/" className="mr-2 md:mr-6 flex items-center space-x-1.5 sm:space-x-2 group shrink-0">
           {/* Enhanced Logo SVG */}
           <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7 sm:h-8 sm:w-8 text-primary transition-transform duration-300 group-hover:rotate-[10deg]" // Slightly larger icon
            initial={{ rotate: -15, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                 {/* Adding a small 'graduation cap' like element */}
                 <path d="M12 11.5 6.5 8.5 12 5.5l5.5 3z"/>
                 <path d="m6.5 14 5.5 3 5.5-3"/>
                 <path d="M12 14.5V19"/>
           </motion.svg>
          <span className="font-bold text-lg sm:text-xl inline-block text-primary group-hover:text-accent transition-colors duration-300">
            EduHub {/* Shorten name on mobile if needed, or keep full */}
             <span className="hidden sm:inline"> Portal</span>
          </span>
        </Link>

         {/* Animated Search Bar - Conditionally Rendered & Hidden on Mobile */}
         {!shouldHideSearch && (
            <motion.div
                className="hidden md:flex flex-1 mx-4 md:mx-6 max-w-xs md:max-w-sm lg:max-w-md" // Hide on small screens (mobile)
                initial={false} // Don't animate initially
                animate={{ maxWidth: isSearchFocused ? '100%' : '24rem' }} // Animate max-width on focus
                transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            >
                <form onSubmit={handleSearchSubmit} className="relative w-full">
                <motion.div
                    className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    initial={{ scale: 1 }}
                    animate={{ scale: isSearchFocused ? 1.1 : 1 }} // Slightly grow icon on focus
                    transition={{ type: 'spring', stiffness: 180, damping: 10 }} // Bouncier spring
                >
                    <Search
                        className="h-4 w-4 text-muted-foreground"
                    />
                </motion.div>
                <Input
                    type="search"
                    placeholder={isSearchFocused ? "Enter keywords..." : "Search courses..."} // Dynamic placeholder
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full rounded-lg bg-muted pl-8 sm:pl-9 pr-8 py-2 h-9 sm:h-10 text-sm sm:text-base focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1 transition-all duration-300 ease-in-out shadow-sm hover:shadow focus:shadow-md focus:bg-background" // Adjusted padding right for clear button
                    aria-label="Search courses"
                />
                {/* Animated clear button */}
                    <AnimatePresence>
                        {searchQuery && ( // Show clear button if there's text
                            <motion.button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted"
                                aria-label="Clear search"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.2, ease: "easeOut" }} // Smoother ease
                            >
                            <X className="size-4" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </form>
            </motion.div>
         )}

         {/* Spacer to push auth to the right (Desktop) */}
         <div className="flex-1 hidden md:block"></div>

         {/* Responsive Navigation Links (Desktop) */}
         <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 text-sm lg:text-base font-medium ml-auto md:ml-0 mr-2 sm:mr-4">
           {filteredNavItems.map((item) => { // Use filtered items
               const isActive = pathname.startsWith(item.href); // Use startsWith for nested routes
               return (
                   <Link
                       key={item.href}
                       href={item.href}
                       className={cn(
                          "relative flex items-center gap-1.5 transition-colors hover:text-primary text-foreground/70 pb-1 group", // Use group for hover effects on underline
                          // Animated Underline effect using ::after pseudo-element
                          "after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:origin-center after:transition-transform after:duration-300 after:ease-out",
                          isActive ? "text-primary after:scale-x-100" : "after:scale-x-0 group-hover:after:scale-x-50" // Animate scaleX for underline on active/hover
                       )}
                   >
                       <item.icon className="h-4 w-4 lg:h-5 lg:w-5" />
                       {item.label}
                   </Link>
               )
            })}
        </nav>

        {/* Auth Buttons / User Dropdown / Mobile Menu Trigger */}
        {/* Use ml-auto to push auth buttons to the right on mobile when nav is hidden */}
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 ml-auto md:ml-0">
           {isLoading ? (
              // Skeleton Loader while checking auth status
              <div className="flex items-center space-x-2">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-8 w-16 hidden sm:block" /> {/* Adjusted skeleton width */}
              </div>
           ) : isLoggedIn ? (
            <>
                {/* User Dropdown (Visible on all screens when logged in) */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        {/* Adjusted button padding for better mobile tap target */}
                        <Button variant="ghost" className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full p-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                             <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border border-primary/20">
                            {/* Use avatarUrl state */}
                            <AvatarImage src={avatarUrl} alt={userName} />
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
                    {/* Profile Link */}
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

                {/* Mobile Menu Trigger (Only visible on mobile) */}
                {/* Use md:hidden to hide only on medium screens and up */}
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild className="md:hidden">
                         <Button variant="ghost" size="icon" className="w-9 h-9 sm:w-10 sm:h-10"> {/* Ensure consistent size */}
                             <Menu className="h-5 w-5 sm:h-6 sm:w-6" /> {/* Adjusted icon size */}
                             <span className="sr-only">Toggle Menu</span>
                         </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0 flex flex-col"> {/* Added flex flex-col */}
                        {/* Mobile Menu Content */}
                        <div className="flex flex-col h-full">
                             {/* Mobile Header */}
                             <div className="flex items-center justify-between p-4 border-b">
                                <Link href="/" className="flex items-center space-x-2 group" onClick={() => setIsMobileMenuOpen(false)}>
                                     <motion.svg /* Re-use logo SVG */
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
                                {/* Explicit Close Button */}
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <X className="h-5 w-5" />
                                        <span className="sr-only">Close Menu</span>
                                    </Button>
                                </SheetTrigger>
                             </div>
                             {/* Mobile Search (Optional but recommended for mobile) */}
                             {!shouldHideSearch && (
                                <div className="p-4 border-b">
                                    <form onSubmit={handleSearchSubmit} className="relative">
                                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="search"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            className="w-full rounded-lg bg-muted pl-8 pr-3 py-2 h-9 text-sm"
                                            aria-label="Search"
                                        />
                                         {/* Optional: Add clear button for mobile search too */}
                                         {searchQuery && (
                                             <button
                                                 type="button"
                                                 onClick={() => setSearchQuery('')}
                                                 className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                                                 aria-label="Clear search"
                                             >
                                             <X className="size-4" />
                                             </button>
                                         )}
                                    </form>
                                </div>
                             )}
                             {/* Mobile Navigation */}
                             <nav className="flex-1 overflow-y-auto py-4 space-y-1">
                                {filteredNavItems.map((item) => {
                                    const isActive = pathname.startsWith(item.href);
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
                                            className={cn(
                                                "flex items-center gap-3 px-4 py-2.5 rounded-md text-base font-medium transition-colors",
                                                isActive ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-muted hover:text-foreground"
                                            )}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                             </nav>
                             {/* Optional Footer in Mobile Menu */}
                             {/* <div className="p-4 mt-auto border-t"> <Button variant="outline" className="w-full">Settings</Button> </div> */}
                        </div>
                    </SheetContent>
                </Sheet>
            </>
           ) : (
             <>
                {/* Login/Signup buttons (Visible on all screens when logged out) */}
               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                 <Button variant="ghost" size="sm" asChild className="text-xs px-1.5 sm:text-sm sm:px-3"> {/* Adjusted padding */}
                   <Link href="/login">
                     <LogIn className="mr-1 sm:mr-2 h-4 w-4" /> Login
                   </Link>
                 </Button>
               </motion.div>
               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                 <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-shadow text-xs px-1.5 sm:text-sm sm:px-3"> {/* Adjusted padding */}
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
