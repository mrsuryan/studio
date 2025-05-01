'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function CursorGlowEffect() {
  const [position, setPosition] = useState({ x: -200, y: -200 }); // Start off-screen
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Make visible on first move
      if (!isVisible) {
        setIsVisible(true);
      }
      setPosition({ x: event.clientX, y: event.clientY });
    };

    // Only add listener on client-side
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible]); // Re-run if isVisible changes (though it only changes once)

  // Don't render the glow until the component has mounted and mouse has moved
  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      className={cn(
        'pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute' // Use fixed positioning
        // Use lg:absolute if you only want it within a specific container on larger screens
      )}
      style={{
        background: `radial-gradient(circle at ${position.x}px ${position.y}px, hsla(var(--primary)/0.15), transparent 50%)`, // Adjusted opacity and size
      }}
      animate={{
        x: position.x - 500, // Center the large gradient (adjust offset as needed)
        y: position.y - 500, // Center the large gradient (adjust offset as needed)
      }}
      transition={{
        type: 'tween', // Use tween for smoother following
        ease: 'backOut', // Use backOut for a slight overshoot effect
        duration: 0.6, // Slower duration for smoother movement
      }}
    >
      {/* Optional: Add a smaller, more defined inner glow */}
       <div
         className="absolute w-48 h-48 rounded-full blur-3xl opacity-50" // Smaller, more defined blur
         style={{
           left: position.x,
           top: position.y,
           transform: 'translate(-50%, -50%)', // Center precisely on cursor
           background: `radial-gradient(circle, hsla(var(--accent)/0.3), transparent 70%)`,
         }}
       />
    </motion.div>
  );
}