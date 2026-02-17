import { useRef } from "react";
import {
  m,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "motion/react";
import { wrap } from "@/utils";

interface MarqueeProps {
  children: React.ReactNode;
  baseVelocity: number;
}

const SPRING_CONFIG = { damping: 50, stiffness: 400 } as const;


const VELOCITY_INPUT  = [0, 1000];
const VELOCITY_OUTPUT = [0, 5];
const VELOCITY_OPTIONS = { clamp: false } as const;

export const VelocityMarquee = ({ children, baseVelocity = 100 }: MarqueeProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, SPRING_CONFIG);

  const velocityFactor = useTransform(
    smoothVelocity,
    VELOCITY_INPUT,
    VELOCITY_OUTPUT,
    VELOCITY_OPTIONS
  );

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((_t, delta) => {
   
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

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
    
      <m.div className="flex flex-nowrap gap-10" style={{ x }}>
        {children}
        {children}
        {children}
        {children}
      </m.div>
    </div>
  );
};