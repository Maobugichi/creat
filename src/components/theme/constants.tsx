import { MoonStars, Sun, Desktop } from "phosphor-react";
import type { Theme } from "@/hooks/useTheme";

export const THEME_ICONS: Record<Theme, React.ReactNode> = {
  light:  <Sun       size={24} weight="bold" />,
  dark:   <MoonStars size={24} weight="bold" />,
  system: <Desktop   size={24} weight="bold" />,
};

export const THEME_LABELS: Record<Theme, string> = {
  light:  "Light",
  dark:   "Dark",
  system: "Auto",
};