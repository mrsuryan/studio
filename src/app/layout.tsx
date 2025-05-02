import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { FooterContent } from "@/components/layout/footer-content"; // Import the new component
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next"; // Import Speed Insights
import * as React from 'react'; // Import React

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduHub Portal - Your Learning Gateway",
  description: "Explore courses, track progress, and enhance your skills on the EduHub Learning Portal.",
  // Add Open Graph and other metadata as needed
  openGraph: {
    title: "EduHub Portal",
    description: "Your gateway to online learning and skill development.",
    // url: "https://your-eduhub-url.com", // Replace with your actual URL
    // siteName: "EduHub Portal",
    // images: [
    //   {
    //     url: "https://your-eduhub-url.com/og-image.png", // Replace with your OG image URL
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
    // locale: "en_US",
    type: "website",
  },
  icons: { // Correctly placed icons definition
     icon: "/favicon.ico", // Ensure favicon exists in /public
     // apple: "/apple-touch-icon.png", // Ensure apple touch icon exists in /public
   },
};

export const viewport: Viewport = {
  themeColor: [ // Add theme color for different modes
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  // Add other viewport settings if necessary
  // width: 'device-width',
  // initialScale: 1,
  // maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">{/* Removed suppressHydrationWarning */}
      {/* Add preconnect links for performance */}
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://picsum.photos" />
      </head>
      <body className={cn(
         GeistSans.variable, // Apply Geist Sans variable
         GeistMono.variable, // Apply Geist Mono variable
          "antialiased flex flex-col min-h-screen bg-gradient-to-br from-background to-blue-50/50 dark:from-background dark:to-blue-950/20" // Gradient background
        )}>
          {/* Header */}
          <Header />

          {/* Main Content Area */}
          {/* Responsive padding using Tailwind classes */}
          <main className="flex-grow container px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {children}
          </main>

          {/* Footer */}
          <footer className="mt-auto py-4 sm:py-6 border-t border-border/50 bg-background/50">
             {/* Use the new client component for the footer content */}
             <FooterContent />
          </footer>

          {/* Global Toaster for Notifications */}
          <Toaster />
           {/* Vercel Speed Insights */}
          <SpeedInsights />
        </body>
    </html>
  );
}
