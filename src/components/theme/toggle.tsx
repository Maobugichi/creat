import { ArrowUpRight } from "phosphor-react";
import { m } from "motion/react";
import { ThemeToggle } from "./themeToggle";

const navItemVariants = {
  visible: { y: 0,   opacity: 1 },
  hidden:  { y: -25, opacity: 0 },
};

const navItemTransition = { duration: 0.3, ease: "easeInOut" } as const;

export const ToggleSwitch = ({ isHidden }: { isHidden: boolean }) => {
  return (
    <m.div
      variants={navItemVariants}
      animate={isHidden ? "hidden" : "visible"}
      transition={navItemTransition}
      className="flex justify-end w-[80%] md:w-auto items-center gap-6 pointer-events-auto"
    >
      <ThemeToggle />

      <button
        aria-label="contact us"
        className="flex items-center gap-2 border-2 border-black dark:border-white
                   md:px-7 md:py-3 px-4 py-4
                   font-semibold text-xl tracking-wide rounded-full
                   bg-white/10 backdrop-blur-md
                   text-black dark:text-white
                   transition-colors duration-300"
      >
        <span className="hidden md:block">contact us</span>
        <ArrowUpRight size={24} weight="bold" />
      </button>
    </m.div>
  );
};
