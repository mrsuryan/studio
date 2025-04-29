
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'EduHub Portal - Your Learning Gateway', // Enhanced title
  description: 'Explore courses, track progress, and enhance your skills on the EduHub Learning Portal.', // Enhanced description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gradient-to-br from-background to-blue-50/50 dark:from-background dark:to-blue-950/20`} // Added subtle gradient
      >
        <Header />
         {/* Adjusted padding for different screen sizes */}
        <main className="flex-grow container px-4 sm:px-6 lg:px-8 py-8 md:py-12">{children}</main>
         <footer className="mt-auto py-4 sm:py-6 border-t border-border/50 bg-background/50">
            <div className="container text-center text-muted-foreground text-xs sm:text-sm">
                © {new Date().getFullYear()} EduHub Portal. All rights reserved.
            </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
