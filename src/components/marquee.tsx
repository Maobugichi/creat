import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "motion/react";
import { wrap } from "@/utils";

interface MarqueeProps {
  children: React.ReactNode;
  baseVelocity: number; // Negative for left, Positive for right
}

export const VelocityMarquee = ({ children, baseVelocity = 100 }: MarqueeProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    console.log(t)
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Apply scroll velocity to the speed
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex flex-nowrap gap-10" style={{ x }}>
        {/* Render children multiple times to cover the screen width + buffer */}
        {/* Adjust number of copies based on how wide your content is */}
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
};