// hooks/useBreakpoints.ts
import { useState, useEffect } from "react";

// ✅ matchMedia is evaluated once, listeners are passive, zero reflow
const queries = {
  isTablet:     "(min-width: 768px) and (max-width: 1024px)",
  isTallNarrow: "(min-height: 890px) and (max-width: 500px)",
  isMidHeight:  "(min-height: 790px) and (max-height: 889px)",
  isThinHeight: "(max-height: 882px) and (max-width: 344px)",
  isShortHeight:"(max-height: 789px)",
} as const;

type BreakpointKey = keyof typeof queries;

const getMatches = (): Record<BreakpointKey, boolean> => {
  // SSR guard
  if (typeof window === "undefined") {
    return Object.fromEntries(
      Object.keys(queries).map((k) => [k, false])
    ) as Record<BreakpointKey, boolean>;
  }
  return Object.fromEntries(
    Object.entries(queries).map(([k, q]) => [k, window.matchMedia(q).matches])
  ) as Record<BreakpointKey, boolean>;
};

export const useBreakpoints = () => {
  const [matches, setMatches] = useState<Record<BreakpointKey, boolean>>(getMatches);

  useEffect(() => {
    const mediaQueryLists = Object.entries(queries).map(([key, query]) => {
      const mql = window.matchMedia(query);
      const handler = (e: MediaQueryListEvent) => {
        setMatches((prev) => ({ ...prev, [key]: e.matches }));
      };
      // ✅ addEventListener is passive by nature on MQL — no reflow
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