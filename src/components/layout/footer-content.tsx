
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Phone, Twitter, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';

export function FooterContent() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    // This code runs only on the client after the initial render/hydration.
    setCurrentYear(new Date().getFullYear());
  }, []); // Empty dependency array ensures this runs once on mount

  const displayYear = currentYear ?? new Date().getFullYear();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-foreground">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
        {/* Company Info */}
        <div className="lg:col-span-1 md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2 group justify-center md:justify-start">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary transition-transform duration-300 group-hover:rotate-[10deg]">
                     <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 0 0 1 0-5H20"/>
                     <path d="M12 11.5 6.5 8.5 12 5.5l5.5 3z"/>
                     <path d="m6.5 14 5.5 3 5.5-3"/><path d="M12 14.5V19"/>
                 </svg>
                 <span className="font-bold text-xl text-primary group-hover:text-accent transition-colors">EduHub Portal</span>
            </Link>
            <p className="text-sm text-muted-foreground">
                Your gateway to knowledge. Explore, learn, and grow with our interactive platform.
            </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="text-base font-semibold uppercase tracking-wider text-muted-foreground">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/courses" className="text-foreground/80 hover:text-primary transition-colors">Courses</Link></li>
            <li><Link href="/dashboard" className="text-foreground/80 hover:text-primary transition-colors">Dashboard</Link></li>
            <li><Link href="/profile" className="text-foreground/80 hover:text-primary transition-colors">Profile</Link></li>
            <li><Link href="/contact" className="text-foreground/80 hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
            <h3 className="text-base font-semibold uppercase tracking-wider text-muted-foreground">Contact Us</h3>
            <ul className="space-y-2">
                <li className="flex items-center gap-2 justify-center md:justify-start">
                    <Mail className="h-4 w-4 text-primary" />
                    <a href="mailto:contact@eduhub.com" className="text-foreground/80 hover:text-primary transition-colors">contact@eduhub.com</a>
                </li>
                <li className="flex items-center gap-2 justify-center md:justify-start">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-foreground/80">(123) 456-7890</span>
                </li>
            </ul>
        </div>

        {/* Social Media */}
        <div className="space-y-2">
            <h3 className="text-base font-semibold uppercase tracking-wider text-muted-foreground">Follow Us</h3>
            <div className="flex items-center space-x-4 justify-center md:justify-start">
                <motion.a href="#" whileHover={{ scale: 1.2, rotate: 10 }} className="text-muted-foreground hover:text-primary">
                    <Twitter className="h-5 w-5" />
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2, rotate: 10 }} className="text-muted-foreground hover:text-primary">
                    <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2, rotate: 10 }} className="text-muted-foreground hover:text-primary">
                    <Github className="h-5 w-5" />
                </motion.a>
            </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        © {displayYear} EduHub Portal. All rights reserved.
      </div>
    </div>
  );
}
