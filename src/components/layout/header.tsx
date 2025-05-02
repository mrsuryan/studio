
"use client"; // Mark as Client Component for hooks and interactivity

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Use App Router hooks
import { BookOpen, LogIn, LogOut, UserPlus, LayoutDashboard, ClipboardList, Activity, User, Search, Rocket, X, Menu, Mail } from 'lucide-react'; // Added Mail for Contact
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
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor } from "@/components/ui/popover"; // Import Popover components
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
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { allCourses, Course } from '@/data/courses'; // Import course data and type
import Image from 'next/image'; // Import Image for suggestions
// Correctly import the Command wrapper and its parts
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import * as React from "react"; // Import React

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
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null); // Ref for the search container

  // Routing and Path
  const router = useRouter();
  const pathname = usePathname(); // Get current path

  // Utilities
  const { toast } = useToast();

  // Config
  const hideSearchOnRoutes = ['/login', '/signup']; // Routes to hide search bar
  const shouldHideSearch = hideSearchOnRoutes.includes(pathname);

  // Updated navItems array
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, requiresLogin: true },
    { href: "/courses", label: "Courses", icon: BookOpen, requiresLogin: true },
    { href: "/assignments", label: "Assignments", icon: ClipboardList, requiresLogin: true },
    { href: "/activities", label: "Activities", icon: Activity, requiresLogin: true },
    { href: "/interactive-demo", label: "Demo", icon: Rocket, requiresLogin: true },
    { href: "/contact", label: "Contact", icon: Mail, requiresLogin: false },
  ];

  // --- Effects ---

  // Set hasMounted to true once the component mounts on the client
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Effect to check auth status and theme on mount and on storage change
  useEffect(() => {
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
      setAvatarUrl(isLoggedInNow
          ? (storedAvatarUrl || `https://picsum.photos/seed/${storedUserEmail || 'default'}/100`)
          : '');

      setIsLoadingAuth(false);
    };

    checkStatusAndTheme();
    window.addEventListener('storage', checkStatusAndTheme);
    return () => window.removeEventListener('storage', checkStatusAndTheme);
  }, [hasMounted]);

  // Filter nav items based on auth status
  const filteredNavItems = hasMounted && !isLoadingAuth
    ? navItems.filter(item => !item.requiresLogin || isLoggedIn)
    : [];

  // Close mobile menu and suggestions on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSuggestionsVisible(false);
    setSearchQuery(''); // Clear search on route change
  }, [pathname]);

  // Hide suggestions when clicking outside the search bar
   useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSuggestionsVisible(false);
        setIsSearchFocused(false); // Also unfocus when clicking outside
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  // --- Handlers ---

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userBio');
    localStorage.removeItem('userEmailNotifications');
    localStorage.removeItem('userAvatarUrl');
    window.dispatchEvent(new Event('storage'));
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    router.push('/login');
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  // Debounce function
  const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
      new Promise(resolve => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => resolve(func(...args)), waitFor);
      });
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim() === '') {
        setSearchResults([]);
        setIsSuggestionsVisible(false);
        return;
      }
      const lowerCaseQuery = query.toLowerCase();
      const results = allCourses.filter(course =>
        course.title.toLowerCase().includes(lowerCaseQuery) ||
        course.description.toLowerCase().includes(lowerCaseQuery)
      );
      setSearchResults(results);
      setIsSuggestionsVisible(results.length > 0);
    }, 300), // 300ms debounce delay
    [] // Dependencies for useCallback
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim() === '') {
        setSearchResults([]);
        setIsSuggestionsVisible(false);
    } else {
       debouncedSearch(query); // Use debounced search
       setIsSearchFocused(true); // Keep focused state while typing
       setIsSuggestionsVisible(true); // Show suggestions immediately while typing (debouncedSearch will update results)
    }
  };

   const handleSearchSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      if (searchQuery.trim()) {
         toast({
             title: "Search Submitted",
             description: `Searching for: "${searchQuery}" (Feature not fully implemented)`,
         });
         console.log('Submitting search for:', searchQuery);
         setIsSuggestionsVisible(false); // Hide suggestions on submit
      }
      setIsMobileMenuOpen(false); // Close mobile menu after search submit
      setIsSearchFocused(false); // Unfocus after submit
   };

   const handleSuggestionClick = () => {
      setIsSuggestionsVisible(false);
      setSearchQuery(''); // Clear search query after selecting a suggestion
      setIsSearchFocused(false); // Unfocus after clicking suggestion
   };

  // --- Animation Variants ---
  const searchContainerVariants = {
    unfocused: { width: '80%' }, // Start wider
    focused: { width: '100%' }, // Even wider when focused
  };

  const searchIconVariants = {
    unfocused: { x: 0, opacity: 0.5, scale: 1 },
    focused: { x: 5, opacity: 1, scale: 1.1, rotate: 5 },
  };

  const clearIconVariants = {
    hidden: { opacity: 0, scale: 0, x: 10 },
    visible: { opacity: 1, scale: 1, x: 0 },
  };

  // --- Render Logic ---

  // Conditionally render based on mount status to avoid hydration errors
  if (!hasMounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="mr-4 md:mr-6 flex items-center space-x-1.5 sm:space-x-2 group shrink-0">
             {/* Consistent SVG rendering */}
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 sm:h-8 sm:w-8 text-primary">
                 <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 0 0 1 0-5H20"/>
                 <path d="M12 11.5 6.5 8.5 12 5.5l5.5 3z"/>
                 <path d="m6.5 14 5.5 3 5.5-3"/><path d="M12 14.5V19"/>
             </svg>
             <span className="font-bold text-lg sm:text-xl inline-block text-primary">EduHub Portal</span>
          </Link>
          <div className="flex-1"></div> {/* Spacer */}
          <div className="flex items-center space-x-2 ml-auto">
            <Skeleton className="h-9 w-9 rounded-full md:hidden" />
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-8 w-16 hidden sm:block" />
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
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 0 0 1 0-5H20"/>
              <path d="M12 11.5 6.5 8.5 12 5.5l5.5 3z"/>
              <path d="m6.5 14 5.5 3 5.5-3"/>
              <path d="M12 14.5V19"/>
            </motion.svg>
          <span className="font-bold text-lg sm:text-xl inline-block text-primary group-hover:text-accent transition-colors duration-300">
             EduHub Portal
          </span>
        </Link>

        {/* Search Bar & Suggestions - Conditionally Rendered & Hidden on Mobile */}
         {!isLoadingAuth && !shouldHideSearch && isLoggedIn && (
            <div ref={searchRef} className="hidden md:flex flex-1 justify-center mx-4 md:mx-6 relative">
               <Popover open={isSuggestionsVisible && isSearchFocused} onOpenChange={(open) => {
                   setIsSuggestionsVisible(open);
                   if (!open) setIsSearchFocused(false); // Close suggestions if popover closes
               }}>
                  <PopoverAnchor asChild>
                      <motion.div
                         className="w-full max-w-xl lg:max-w-3xl" // Adjusted max-width for the container
                         variants={searchContainerVariants}
                         initial="unfocused"
                         animate={isSearchFocused ? 'focused' : 'unfocused'}
                         transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                      >
                         <form onSubmit={handleSearchSubmit} className="relative w-full">
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
                             placeholder="Search courses..." // Keep placeholder consistent
                             value={searchQuery}
                             onChange={handleSearchChange}
                             onFocus={() => {setIsSearchFocused(true); if(searchQuery.trim().length > 0) setIsSuggestionsVisible(true);}} // Show suggestions on focus if there's text
                             className={cn(
                               "w-full rounded-full bg-muted pl-8 sm:pl-9 pr-8 py-2 h-9 sm:h-10 text-sm sm:text-base focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1 transition-all duration-300 ease-in-out shadow-inner hover:shadow-md focus:shadow-lg focus:bg-background focus:ring-2",
                               isSearchFocused ? "pr-8" : "pr-4"
                             )}
                             aria-label="Search courses"
                           />
                           <AnimatePresence>
                             {searchQuery && isSearchFocused && (
                               <motion.button
                                 type="button"
                                 onClick={(e) => {
                                     e.stopPropagation(); // Prevent Popover from closing
                                     setSearchQuery("");
                                     setSearchResults([]);
                                     setIsSuggestionsVisible(false);
                                     setIsSearchFocused(false); // Unfocus on clear
                                 }}
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
                  </PopoverAnchor>

                  <PopoverContent
                      className="w-[--radix-popover-trigger-width] max-w-[1000px] max-h-[400px] overflow-y-auto p-0 mt-1" // Increase max-width to 1000px
                      align="start" // Align with start of the anchor
                      onOpenAutoFocus={(e) => e.preventDefault()} // Prevent stealing focus
                      onCloseAutoFocus={(e) => e.preventDefault()} // Prevent focus jump on close
                  >
                      {/* Use the Command component for the suggestions list */}
                     <Command shouldFilter={false}> {/* Disable internal filtering */}
                         <CommandList>
                           <CommandEmpty>{searchResults.length === 0 && searchQuery ? 'No courses found.' : 'Type to search...'}</CommandEmpty>
                           <CommandGroup heading="Suggested Courses">
                             {searchResults.map((course) => (
                                <CommandItem
                                   key={course.id}
                                   value={course.title} // Value for potential filtering/selection logic
                                   onSelect={() => {
                                        router.push(`/courses/${course.id}`);
                                        handleSuggestionClick();
                                   }}
                                   className="cursor-pointer"
                                 >
                                   <div className="flex items-center gap-3 py-1.5 px-2">
                                      <Image
                                         src={course.image}
                                         alt={course.title}
                                         width={40}
                                         height={30}
                                         className="rounded object-cover aspect-[4/3]"
                                         data-ai-hint={course.aiHint || "course thumbnail"}
                                       />
                                      <div className="flex-1 truncate">
                                         <p className="text-sm font-medium truncate">{course.title}</p>
                                         <p className="text-xs text-muted-foreground truncate">{course.description}</p>
                                      </div>
                                   </div>
                                </CommandItem>
                             ))}
                           </CommandGroup>
                         </CommandList>
                       </Command>
                  </PopoverContent>
               </Popover>
            </div>
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
                          "relative flex items-center gap-1.5 transition-colors hover:text-primary pb-1 group",
                          isActive ? "text-primary font-semibold" : "text-foreground/70",
                          "after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:origin-center after:transition-transform after:duration-300 after:ease-out",
                           isActive ? "after:scale-x-100" : "after:scale-x-0 group-hover:after:scale-x-50"
                       )}
                   >
                       <item.icon className="h-4 w-4 lg:h-5 lg:w-5" />
                       {item.label}
                   </Link>
               )
            })}
        </nav>

        {/* Auth Controls */}
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 ml-auto md:ml-0">
           {isLoadingAuth ? (
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-9 w-9 rounded-full md:hidden" />
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <Skeleton className="h-8 w-16 hidden sm:block" />
                </div>
              ) : isLoggedIn ? (
                // User Dropdown and Mobile Menu Trigger (Logged In)
                <>
                    <DropdownMenu>
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
                        <SheetTrigger asChild className="md:hidden">
                             <Button variant="ghost" size="icon" className="w-9 h-9 sm:w-10 sm:w-10">
                                    <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0 flex flex-col bg-background">
                             <SheetHeader className="p-4 border-b flex flex-row items-center justify-between">
                                <Link href="/" className="flex items-center space-x-2 group" onClick={() => setIsMobileMenuOpen(false)}>
                                     <motion.svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                          className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-[10deg]">
                                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 0 0 1 0-5H20"/>
                                          <path d="M12 11.5 6.5 8.5 12 5.5l5.5 3z"/>
                                          <path d="m6.5 14 5.5 3 5.5-3"/><path d="M12 14.5V19"/>
                                      </motion.svg>
                                     <span className="font-bold text-lg text-primary">EduHub Portal</span>
                                 </Link>
                                <SheetClose asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Close</span>
                                    </Button>
                                </SheetClose>
                             </SheetHeader>
                              <SheetTitle className="sr-only">Main Menu</SheetTitle>
                             <SheetDescription className="sr-only">Navigation links for the EduHub Portal.</SheetDescription>
                             {/* Mobile Search */}
                             {!shouldHideSearch && isLoggedIn && (
                                 <div className="p-4 border-b">
                                     <form onSubmit={handleSearchSubmit} className="relative">
                                         <motion.div
                                            className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none z-10"
                                             variants={searchIconVariants}
                                             animate={isSearchFocused ? 'focused' : 'unfocused'}
                                             transition={{ type: "spring", stiffness: 180, damping: 12 }}
                                         >
                                                <Search className="h-4 w-4 text-muted-foreground" />
                                            </motion.div>
                                            <Input
                                                type="search"
                                                placeholder="Search..." // Simpler placeholder for mobile
                                                value={searchQuery}
                                                onChange={handleSearchChange}
                                                onFocus={() => {setIsSearchFocused(true); if(searchQuery.trim().length > 0) setIsSuggestionsVisible(true);}}
                                                className={cn(
                                                    "w-full rounded-full bg-muted pl-8 sm:pl-9 pr-8 py-2 h-9 sm:h-10 text-sm sm:text-base focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1 transition-all duration-300 ease-in-out shadow-inner hover:shadow-md focus:shadow-lg focus:bg-background focus:ring-2",
                                                    isSearchFocused ? "pr-8" : "pr-4"
                                                )}
                                                aria-label="Search"
                                            />
                                          <AnimatePresence>
                                             {searchQuery && isSearchFocused && (
                                                  <motion.button
                                                      type="button"
                                                      onClick={() => { setSearchQuery(''); setSearchResults([]); setIsSuggestionsVisible(false); setIsSearchFocused(false); }}
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
                                      {/* Mobile Suggestions (simple list) */}
                                      {isSuggestionsVisible && searchResults.length > 0 && (
                                          <div className="mt-2 max-h-[300px] overflow-y-auto border rounded-md bg-background shadow-md">
                                              {searchResults.map((course) => (
                                                  <SheetClose asChild key={course.id}>
                                                      <Link href={`/courses/${course.id}`} onClick={handleSuggestionClick} className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted cursor-pointer border-b last:border-b-0">
                                                         <Image
                                                             src={course.image}
                                                             alt={course.title}
                                                             width={35}
                                                             height={26}
                                                             className="rounded object-cover aspect-[4/3]"
                                                             data-ai-hint={course.aiHint || "course thumbnail"}
                                                          />
                                                          <span className="truncate flex-1">{course.title}</span>
                                                      </Link>
                                                  </SheetClose>
                                              ))}
                                          </div>
                                      )}
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
                             <SheetFooter className="p-4 mt-auto border-t">
                                  <Button
                                     variant="outline"
                                     className="w-full flex items-center justify-center gap-2 text-destructive border-destructive hover:bg-destructive/10"
                                     onClick={() => {
                                         handleLogout();
                                         setIsMobileMenuOpen(false);
                                     }}
                                  >
                                     <LogOut className="mr-2 h-4 w-4" />
                                     <span>Log out</span>
                                 </Button>
                             </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </>
              ) : (
                // Login/Signup Buttons and Mobile Menu Trigger (Logged Out)
                <>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
                        <Button variant="ghost" size="sm" asChild className="text-xs px-1.5 sm:text-sm sm:px-3">
                          <Link href="/login">
                             <LogIn className="mr-1 sm:mr-2 h-4 w-4" /> Login
                          </Link>
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
                        <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-shadow text-xs px-1.5 sm:text-sm sm:px-3">
                          <Link href="/signup">
                            <UserPlus className="mr-1 sm:mr-2 h-4 w-4" /> Sign Up
                          </Link>
                        </Button>
                    </motion.div>
                     <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild className="md:hidden">
                             <Button variant="ghost" size="icon" className="w-9 h-9 sm:w-10 sm:w-10">
                                    <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0 flex flex-col bg-background">
                             <SheetHeader className="p-4 border-b flex flex-row items-center justify-between">
                                <Link href="/" className="flex items-center space-x-2 group" onClick={() => setIsMobileMenuOpen(false)}>
                                     <motion.svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                          className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-[10deg]">
                                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 0 0 1 0-5H20"/>
                                          <path d="M12 11.5 6.5 8.5 12 5.5l5.5 3z"/>
                                          <path d="m6.5 14 5.5 3 5.5-3"/><path d="M12 14.5V19"/>
                                      </motion.svg>
                                     <span className="font-bold text-lg text-primary">EduHub Portal</span>
                                 </Link>
                                 <SheetClose asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Close</span>
                                    </Button>
                                </SheetClose>
                             </SheetHeader>
                              <SheetTitle className="sr-only">Main Menu</SheetTitle>
                             <SheetDescription className="sr-only">Navigation links for the EduHub Portal.</SheetDescription>
                             <nav className="flex-1 overflow-y-auto py-4 space-y-1">
                                 {navItems.filter(item => !item.requiresLogin).map((item) => {
                                     const isActive = pathname === item.href;
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
                             <SheetFooter className="p-4 mt-auto border-t grid grid-cols-2 gap-2">
                                  <SheetClose asChild>
                                      <Button variant="outline" asChild>
                                          <Link href="/login">
                                            <LogIn className="mr-2 h-4 w-4" /> Login
                                          </Link>
                                       </Button>
                                   </SheetClose>
                                   <SheetClose asChild>
                                       <Button variant="default" asChild>
                                           <Link href="/signup">
                                             <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                                           </Link>
                                       </Button>
                                   </SheetClose>
                             </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </>
              )
           }
        </div>
      </div>
    </motion.header>
  );
}

    