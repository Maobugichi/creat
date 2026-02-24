import { Hamburger } from "./hamburger";
import { m, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { ToggleSwitch } from "@/components/theme/toggle";

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState<boolean>(false);


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
     <ToggleSwitch isHidden={isHidden}/>

      <div className="pointer-events-auto">
        <Hamburger />
      </div>
    </m.header>
  );
};