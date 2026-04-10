import {
  type Variants,
  m,
  AnimatePresence,
  type Transition,
} from "motion/react";
import { useState } from "react";
import { RollingText } from "./navItems";
import { NAV_ITEMS } from "./constants";
import { scrollToSection } from "@/utils";

const smoothTransition: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 30,
  mass: 1,
};

const ITEM_HEIGHT = 96;
const ROWS = Math.ceil(NAV_ITEMS.length / 2);
const PADDING_TOP = 80;
const PADDING_BOTTOM = 32;
const CONTENT_HEIGHT = ROWS * ITEM_HEIGHT + PADDING_TOP + PADDING_BOTTOM;
const OPEN_HEIGHT =
  typeof window !== "undefined"
    ? Math.min(CONTENT_HEIGHT, window.innerHeight * 0.9)
    : CONTENT_HEIGHT;

const menuVariants: Variants = {
  open: {
    width: "90vw",
    height: OPEN_HEIGHT,
    backgroundColor: "#1C1C1C",
    borderRadius: "65px",
    transition: {
      ...smoothTransition,
      ease: [0.76, 0, 0.24, 1],
      when: "afterChildren" as const,
      backgroundColor: { delay: 0 },
    },
  },
  closed: {
    width: "60px",
    height: "60px",
    backgroundColor: "black",
    borderRadius: "30px",
    transition: {
      ...smoothTransition,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.7,
      backgroundColor: { delay: 1.2 },
    },
  },
};

const navListVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const iconTransitionOpen: Transition   = { ...smoothTransition, delay: 0   };
const iconTransitionClosed: Transition = { ...smoothTransition, delay: 0.5 };

const midBarTransition: Transition     = { duration: 0.1, delay: 0.5 };
const midBarTransitionOpen: Transition = { duration: 0.1, delay: 0   };

const BAR_ONE_OPEN     = { rotate: 45,  y: 20, x: -30 } as const;
const BAR_ONE_CLOSED   = { rotate: 0,   y: 0,  x: 0   } as const;
const BAR_TWO_OPEN     = { opacity: 0,  scale: 0       } as const;
const BAR_TWO_CLOSED   = { opacity: 1,  scale: 1       } as const;
const BAR_THREE_OPEN   = { rotate: -45, y: 10, x: -30 } as const;
const BAR_THREE_CLOSED = { rotate: 0,   y: 0,  x: 0   } as const;

const MENU_STYLE = { originX: 1, originY: 0 } as const;

export const Hamburger = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggle = () => setOpen((prev) => !prev);

  const iconTransition = isOpen ? iconTransitionOpen : iconTransitionClosed;
  const midTransition  = isOpen ? midBarTransitionOpen : midBarTransition;

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.stopPropagation();
    setOpen(false);
    setTimeout(() => scrollToSection(sectionId), 400);
  };

  return (
    <m.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      style={MENU_STYLE}
      onClick={toggle}
      className="fixed top-4 right-4 z-50 shadow-2xl overflow-hidden touch-none"
    >
      <button
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="absolute top-0 right-0 w-15 h-15 flex flex-col items-center justify-center gap-1.5 focus:outline-none z-10"
      >
        <m.span
          animate={isOpen ? BAR_ONE_OPEN : BAR_ONE_CLOSED}
          transition={iconTransition}
          className="block h-1 w-7 rounded-full bg-white"
        />
        <m.span
          animate={isOpen ? BAR_TWO_OPEN : BAR_TWO_CLOSED}
          transition={midTransition}
          className="block h-1 w-7 bg-white rounded-full"
        />
        <m.span
          animate={isOpen ? BAR_THREE_OPEN : BAR_THREE_CLOSED}
          transition={iconTransition}
          className="block h-1 w-7 bg-white rounded-full"
        />
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <m.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={navListVariants}
            className="p-10 pt-20 pb-8 text-white w-full h-full grid grid-cols-2 content-center gap-x-6 gap-y-8 text-5xl font-bold tracking-tighter overflow-y-auto"
          >
            {NAV_ITEMS.map(({ label, id }) => (
              <div
                key={id}
                onClick={(e) => handleNavClick(e, id)}
                className="cursor-pointer"
              >
                <RollingText word={label} />
              </div>
            ))}
          </m.nav>
        )}
      </AnimatePresence>
    </m.div>
  );
};