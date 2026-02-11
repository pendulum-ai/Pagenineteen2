import { useState, useLayoutEffect } from 'react';

/**
 * Centralized mobile detection hook using matchMedia.
 * Uses 'change' event listener (more efficient than window.resize).
 * 
 * @param {number} breakpoint - Max-width breakpoint in px (default: 768)
 * @returns {boolean} - Whether the viewport matches the breakpoint
 */
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  );

  useLayoutEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
