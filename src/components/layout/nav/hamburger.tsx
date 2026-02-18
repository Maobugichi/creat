import {
  type Variants,
  m,
  AnimatePresence,
  type Transition,
} from "motion/react";
import { useState } from "react";
import { RollingText } from "./navItems";

// ✅ All static config hoisted to module level — none of these depend on
// component state so there's no reason to recreate them on any render.
const smoothTransition: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 30,
  mass: 1,
};

const menuVariants: Variants = {
  open: {
    width: "90vw",
    height: "90vh",
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

// ✅ The two possible iconTransition values only differ by delay.
// Rather than recreating the object every render based on isOpen,
// precompute both and select by reference — zero allocation on render.
const iconTransitionOpen: Transition   = { ...smoothTransition, delay: 0   };
const iconTransitionClosed: Transition = { ...smoothTransition, delay: 0.5 };

// ✅ Middle bar transition never changes — hoisted out
const midBarTransition: Transition = { duration: 0.1, delay: 0.5 };
// ✅ Middle bar open transition also static
const midBarTransitionOpen: Transition = { duration: 0.1, delay: 0 };

// ✅ Static animate objects for the icon bars — these were inline objects
// recreated every render, causing Motion to re-evaluate the animations
// even when isOpen hadn't changed.
const BAR_ONE_OPEN   = { rotate: 45,  y: 20, x: -30 } as const;
const BAR_ONE_CLOSED = { rotate: 0,   y: 0,  x: 0   } as const;
const BAR_TWO_OPEN   = { opacity: 0,  scale: 0       } as const;
const BAR_TWO_CLOSED = { opacity: 1,  scale: 1       } as const;
const BAR_THREE_OPEN   = { rotate: -45, y: 10, x: -30 } as const;
const BAR_THREE_CLOSED = { rotate: 0,   y: 0,  x: 0   } as const;

const MENU_STYLE = { originX: 1, originY: 0 } as const;


const words = ["works", "featured", "about", "contract"];

export const Hamburger = () => {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  // ✅ Select precomputed transition by reference — no object allocation
  const iconTransition = isOpen ? iconTransitionOpen : iconTransitionClosed;
  const midTransition  = isOpen ? midBarTransitionOpen : midBarTransition;

  return (
    <m.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      style={MENU_STYLE}
      onClick={toggle}
      className="fixed top-4 right-4 z-50 shadow-2xl overflow-hidden touch-none"
    >
      <button aria-label="Open menu" className="absolute top-0 right-0 w-15 h-15 flex flex-col items-center justify-center gap-1.5 focus:outline-none z-10">
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
            className="p-10 pt-20 text-white w-full h-full flex flex-col gap-8 text-5xl font-bold tracking-tighter"
          >
            {words.map((word) => (
              <RollingText word={word} key={word} />
            ))}
          </m.nav>
        )}
      </AnimatePresence>
    </m.div>
  );
};