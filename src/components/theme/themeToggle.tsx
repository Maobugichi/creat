import { m, AnimatePresence } from "motion/react";
import { useTheme, nextTheme } from "../../hooks/themes"
import { THEME_ICONS, THEME_LABELS } from "./constants";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <m.button
      onClick={() => setTheme(nextTheme(theme))}
      aria-label={`Theme: ${THEME_LABELS[theme]} — click to switch`}
      whileTap={{ scale: 0.9 }}
      className="relative flex items-center gap-2  md:py-3 px-4 py-4 rounded-full
                 border-2 border-black dark:border-white
                 bg-white/10 backdrop-blur-md
                 text-black dark:text-white
                 font-semibold text-sm tracking-wide
                 transition-colors duration-300"
    >
      <span className="relative w-6 h-6 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={theme}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1   }}
            exit={{    rotate:  90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {THEME_ICONS[theme]}
          </m.span>
        </AnimatePresence>
      </span>
      <span className="hidden md:block">{THEME_LABELS[theme]}</span>
    </m.button>
  );
};