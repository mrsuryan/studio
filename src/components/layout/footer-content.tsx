'use client';

import { useState, useEffect } from 'react';

export function FooterContent() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    // This code runs only on the client after the initial render/hydration.
    setCurrentYear(new Date().getFullYear());
  }, []); // Empty dependency array ensures this runs once on mount

  // Provide a fallback for the initial server render or if JS is disabled.
  // Using the current year directly here is fine as a fallback,
  // but the client-side update will correct it if necessary.
  const displayYear = currentYear ?? new Date().getFullYear();

  return (
    <div className="container text-center text-muted-foreground text-xs sm:text-sm">
      © {displayYear} EduHub Portal. All rights reserved.
    </div>
  );
}
