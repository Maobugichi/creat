import { motion, useTransform, type MotionValue } from "motion/react";
import { useMediaQuery } from "react-responsive";

interface HighlightsProps {
  smoothProgress: MotionValue<number>;
}

export const Highlights = ({ smoothProgress }: HighlightsProps) => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  // Desktop ranges - aligned with card positions
  const desktopOpacity1 = useTransform(smoothProgress, [0, 0.2, 0.25], [1, 1, 0.3]);
  const desktopOpacity2 = useTransform(smoothProgress, [0.2, 0.25, 0.45, 0.5], [0.3, 1, 1, 0.3]);
  const desktopOpacity3 = useTransform(smoothProgress, [0.45, 0.5, 0.7, 0.75], [0.3, 1, 1, 0.3]);
  const desktopOpacity4 = useTransform(smoothProgress, [0.7, 0.75], [0.3, 1]);

  // Mobile ranges - faster transitions through the content
  const mobileOpacity1 = useTransform(smoothProgress, [0, 0.05, 0.08], [1, 1, 0.1]);
  const mobileOpacity2 = useTransform(smoothProgress, [0.08, 0.11, 0.14, 0.17], [0.1, 1, 1, 0.1]);
  const mobileOpacity3 = useTransform(smoothProgress, [0.17, 0.20, 0.23, 0.26], [0.1, 1, 1, 0.1]);
  const mobileOpacity4 = useTransform(smoothProgress, [0.26, 0.29], [0.1, 1]);

  // Select the appropriate opacity values based on screen size
  const opacity1 = isDesktop ? desktopOpacity1 : mobileOpacity1;
  const opacity2 = isDesktop ? desktopOpacity2 : mobileOpacity2;
  const opacity3 = isDesktop ? desktopOpacity3 : mobileOpacity3;
  const opacity4 = isDesktop ? desktopOpacity4 : mobileOpacity4;

  const textClass = "font-body border-b-2 border-black/20 pb-6 mb-6 transition-opacity";

  return (
    <div className="text-xl tracking-wide leading-relaxed max-w-md flex flex-col mb-20 md:mb-0">
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