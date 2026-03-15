import { useEffect, useState } from 'react';

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
} as const;

export function useBreakpoint() {
  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const onChange = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onChange);
    setWidth(window.innerWidth);
    return () => window.removeEventListener('resize', onChange);
  }, []);

  return {
    isMobile: (width ?? 0) < BREAKPOINTS.mobile,
    isTablet:
      (width ?? 0) >= BREAKPOINTS.mobile && (width ?? 0) < BREAKPOINTS.tablet,
    isDesktop: (width ?? 0) >= BREAKPOINTS.tablet,
  };
}
