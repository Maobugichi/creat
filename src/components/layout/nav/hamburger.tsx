import { type Variants, motion, AnimatePresence, type Transition } from "motion/react";
import { useState } from "react";
import { RollingText } from "./navItems";

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
    backgroundColor: '#1C1C1C',
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
    backgroundColor: 'black',
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
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.2 
    }
  },
  closed: {
    transition: { 
      staggerChildren: 0.05, 
      staggerDirection: -1 
    }
  }
};

const words = ['works', 'featured', 'about', 'contract'];

export const Hamburger = () => {
  const [isOpen, setOpen] = useState(false);
 
  const iconTransition = { 
    ...smoothTransition, 
    delay: isOpen ? 0 : 0.5 
  };

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      style={{ originX: 1, originY: 0 }}
      onClick={() => setOpen(!isOpen)}
      className="fixed top-4 right-4 z-50 shadow-2xl overflow-hidden touch-none"
    >
      <button
        
        className="absolute  top-0 right-0 w-15 h-15 flex flex-col items-center justify-center gap-1.5 focus:outline-none z-10"
      >
        <motion.span
          animate={{ 
            rotate: isOpen ? 45 : 0, 
            y: isOpen ? 20 : 0,
            x: isOpen ? -30 : 0,
          }}
          transition={iconTransition}
          className="block h-1 w-7 rounded-full bg-white"
        />
        <motion.span
          animate={{ 
            opacity: isOpen ? 0 : 1, 
            scale: isOpen ? 0 : 1 
          }}
          transition={{ duration: 0.1, delay: isOpen ? 0 : 0.5 }}
          className="block h-1 w-7 bg-white rounded-full"
        />
        <motion.span
          animate={{ 
            rotate: isOpen ? -45 : 0, 
            y: isOpen ? 10 : 0,
            x: isOpen ? -30 : 0,
          }}
          transition={iconTransition}
          className="block h-1 w-7 bg-white rounded-full"
        />
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.nav
            initial="closed" 
            animate="open" 
            exit="closed"
            variants={navListVariants}
            className="p-10 pt-20 text-white w-full h-full flex flex-col gap-8 text-5xl font-bold tracking-tighter"
          >
            {words.map((word) => (
              <RollingText word={word} key={word} />
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.div>
  );
};