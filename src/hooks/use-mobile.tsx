
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Initialize with undefined or a default based on initial guess if needed
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
      // Initial check only if window is defined (client-side)
      if (typeof window !== 'undefined') {
          return window.innerWidth < MOBILE_BREAKPOINT;
      }
      return false; // Default to false on server or if window is undefined
  });

  React.useEffect(() => {
    // Ensure this effect runs only on the client
    if (typeof window === 'undefined') {
        return;
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Initial check after mount
    onChange();

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []); // Empty dependency array ensures it runs once on mount

  return isMobile;
}
