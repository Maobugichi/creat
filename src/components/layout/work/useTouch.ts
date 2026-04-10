import { useState } from "react";

export const useIsTouch = () => {
  const [isTouch] = useState(
    () => window.matchMedia("(hover: none) and (pointer: coarse)").matches
  );
  return isTouch;
}