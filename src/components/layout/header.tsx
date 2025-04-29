
'use client'; // Add this directive for client components

import Link from 'next/link';
import { BookOpen, LogIn, UserPlus, LayoutDashboard, ClipboardList, Activity, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function Header() {
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
              // Removed Profile link from here
           ].map((item, index) => (
              <motion.div
                key={item.href}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 transition-colors hover:text-primary text-foreground/70"
                >
                  <item.icon className="h-5 w-5" /> {/* Increased icon size */}
                  {item.label}
                </Link>
              </motion.div>
            ))}
        </nav>
        <div className="flex items-center space-x-3"> {/* Increased spacing */}
           {/* Added Profile link here */}
           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
             <Button variant="ghost" size="sm" asChild>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" /> Profile
              </Link>
            </Button>
           </motion.div>
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
        </div>
      </div>
    </motion.header>
  );
}
