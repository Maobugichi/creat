import { motion, useTransform, type MotionValue } from "motion/react";

interface HighlightsProps {
  smoothProgress: MotionValue<number>;
}

export const Highlights = ({ smoothProgress }: HighlightsProps) => {
  // CONFIGURATION:
  // We compress the entire sequence to finish by 0.35. 
  // This leaves a 0.05 buffer before the cards (at 0.4) take over,
  // ensuring the last sentence is fully visible before the layout shifts.

  // 1. Starts visible, holds till 0.05, fades out by 0.08
  const opacity1 = useTransform(smoothProgress, [0, 0.05, 0.08], [1, 1, 0.1]);

  // 2. Enters fast at 0.08, holds till 0.14, fades out by 0.17
  const opacity2 = useTransform(smoothProgress, [0.08, 0.11, 0.14, 0.17], [0.1, 1, 1, 0.1]);

  // 3. Enters fast at 0.17, holds till 0.23, fades out by 0.26
  const opacity3 = useTransform(smoothProgress, [0.17, 0.20, 0.23, 0.26], [0.1, 1, 1, 0.1]);

  // 4. Enters fast at 0.26, fully visible by 0.29. 
  // Stays visible until the cards cover it (0.4+).
  const opacity4 = useTransform(smoothProgress, [0.26, 0.29], [0.1, 1]);

  // Added transition-colors for a smoother (but still sharp) feel
  const textClass = "font-body border-b-2 border-black/20 pb-6 mb-6 transition-colors duration-200";

  return (
    <div className="text-xl tracking-wide leading-relaxed max-w-md flex flex-col mb-10 md:mb-0">
      <motion.p style={{ opacity: opacity1 }} className={textClass}>
        We're a bunch of creatives who love blending art and tech to build experiences that actually make people feel something.
      </motion.p>
      
      <motion.p style={{ opacity: opacity2 }} className={textClass}>
        From smooth animations to bold digital experiences, we bring ideas to life across the web.
      </motion.p>
      
      <motion.p style={{ opacity: opacity3 }} className={textClass}>
        Our goal? To dive into exciting projects, team up with amazing collaborators, and deliver top-tier services.
      </motion.p>
      
      <motion.p style={{ opacity: opacity4 }} className="pb-6">
        We build for Web3 communities around the world so they can vibe with the future of the internet.
      </motion.p>
    </div>
  );
};