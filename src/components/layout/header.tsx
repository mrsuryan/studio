import Link from 'next/link';
import { BookOpen, LogIn, UserPlus, LayoutDashboard, ClipboardList, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          {/* Placeholder Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M6.5 2H20v20H6.5C4 22 4 19.5 4 19.5zM12 7h-1v7.5"/><path d="m11 11 1 1 1-1"/></svg>
          <span className="font-bold inline-block text-primary">
            EduHub Portal
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
           <Link
            href="/dashboard"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
             <LayoutDashboard className="inline-block h-4 w-4 mr-1" />
            Dashboard
          </Link>
          <Link
            href="/courses"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            <BookOpen className="inline-block h-4 w-4 mr-1" />
            Courses
          </Link>
           <Link
            href="/assignments"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
             <ClipboardList className="inline-block h-4 w-4 mr-1" />
            Assignments
          </Link>
           <Link
            href="/activities"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
             <Activity className="inline-block h-4 w-4 mr-1" />
            Activities
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
           <Button variant="ghost" size="sm" asChild>
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Link>
          </Button>
           <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/signup">
              <UserPlus className="mr-2 h-4 w-4" /> Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
