
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
        // Reduced spread (40% instead of 50%), slightly lower opacity
        background: `radial-gradient(circle at ${position.x}px ${position.y}px, hsla(var(--primary)/0.1), transparent 40%)`,
      }}
      animate={{
        // Adjust offset based on new gradient size (300px radius approx)
        x: position.x - 300,
        y: position.y - 300,
      }}
      transition={{
        type: 'tween', // Use tween for smoother following
        ease: 'easeOut', // Keep easeOut for smooth ending
        duration: 0.4, // Faster duration for more sensitivity
      }}
    >
      {/* Smaller, more defined inner glow */}
       <div
         className="absolute w-32 h-32 rounded-full blur-2xl opacity-60" // Reduced size, slightly less blur, increased opacity
         style={{
           left: position.x,
           top: position.y,
           transform: 'translate(-50%, -50%)', // Center precisely on cursor
           // More visible accent color glow
           background: `radial-gradient(circle, hsla(var(--accent)/0.4), transparent 65%)`,
         }}
       />
    </motion.div>
  );
}
