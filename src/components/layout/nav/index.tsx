import { MoonStars, ArrowUpRight } from "phosphor-react";
import { Hamburger } from "./hamburger";
import { m, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";


const navItemVariants = {
  visible: { y: 0,   opacity: 1 },
  hidden:  { y: -25, opacity: 0 },
};


const navItemTransition = { duration: 0.3, ease: "easeInOut" } as const;

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);

 
 
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 50) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  return (

    <m.header className="fixed top-0 left-0 w-full px-10 py-5 md:py-6 flex items-center justify-between z-100 pointer-events-none">
      <m.div
        variants={navItemVariants}
        animate={isHidden ? "hidden" : "visible"}
        transition={navItemTransition}
        className="flex justify-end w-[80%] md:w-auto items-center gap-6 pointer-events-auto"
      >
        <MoonStars size={30} weight="bold" />
        <button className="flex items-center gap-2 border-2 border-black md:px-7 md:py-3 px-4 py-4 font-semibold text-xl tracking-wide rounded-full bg-white/10 backdrop-blur-md">
          <span className="hidden md:block">contact us</span>
          <ArrowUpRight size={24} weight="bold" />
        </button>
      </m.div>

      <div className="pointer-events-auto">
        <Hamburger />
      </div>
    </m.header>
  );
};