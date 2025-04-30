
import type { Metadata } from 'next';
import { Geist } from 'next/font/google'; // Removed Geist_Mono if not needed
import './globals.css';
import { Header } from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from "@vercel/speed-insights/next" // Import Vercel Speed Insights

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // Use 'swap' for faster initial text render
});

// Removed geistMono if not essential for reducing font asset loading

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
       <head>
         {/* Preconnect to important origins */}
         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
         <link rel="preconnect" href="https://picsum.photos" />
         {/* Preload the main font */}
         {/* Note: Next/font handles preloading automatically, but this is an example if using link tags */}
         {/* <link rel="preload" href="/path/to/geist.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /> */}
       </head>
      <body
        // Use only necessary font variables
        className={`${geistSans.variable} antialiased flex flex-col min-h-screen bg-gradient-to-br from-background to-blue-50/50 dark:from-background dark:to-blue-950/20`}
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
         {/* Add Vercel Speed Insights */}
         <SpeedInsights />
      </body>
    </html>
  );
}
