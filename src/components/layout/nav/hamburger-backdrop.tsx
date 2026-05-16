import { m, AnimatePresence } from "motion/react";

interface HamburgerBackdropProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HamburgerBackdrop = ({ isOpen, onClose }: HamburgerBackdropProps) => (
  <AnimatePresence>
    {isOpen && (
      <m.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      />
    )}
  </AnimatePresence>
);