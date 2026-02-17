import { useState, useEffect } from "react";

const queries = {
  // Used by Highlights, SphereBg
  isDesktop:    "(min-width: 768px)",
  // Used by FeatureGrid
  isMobile:     "(max-width: 767px)",
  // Used by CardStack
  isTablet:     "(min-width: 768px) and (max-width: 1024px)",
  isTallNarrow: "(min-height: 890px) and (max-width: 500px)",
  isMidHeight:  "(min-height: 790px) and (max-height: 889px)",
  isThinHeight: "(max-height: 882px) and (max-width: 344px)",
  isShortHeight:"(max-height: 789px)",
} as const;

type BreakpointKey = keyof typeof queries;
type Breakpoints = Record<BreakpointKey, boolean>;

const getMatches = (): Breakpoints => {
  if (typeof window === "undefined") {
    return Object.fromEntries(
      Object.keys(queries).map((k) => [k, false])
    ) as Breakpoints;
  }
  return Object.fromEntries(
    Object.entries(queries).map(([k, q]) => [k, window.matchMedia(q).matches])
  ) as Breakpoints;
};

export const useBreakpoints = (): Breakpoints => {
  const [matches, setMatches] = useState<Breakpoints>(getMatches);

  useEffect(() => {
    const mediaQueryLists = Object.entries(queries).map(([key, query]) => {
      const mql = window.matchMedia(query);
      const handler = (e: MediaQueryListEvent) => {
        setMatches((prev) => ({ ...prev, [key]: e.matches }));
      };
      mql.addEventListener("change", handler);
      return { mql, handler };
    });

    return () => {
      mediaQueryLists.forEach(({ mql, handler }) => {
        mql.removeEventListener("change", handler);
      });
    };
  }, []);

  return matches;
};