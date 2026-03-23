import { m, useTransform, type MotionValue } from "motion/react";
import { useBreakpoints } from "@/hooks/useBreakpoint";

interface HighlightsProps {
  smoothProgress: MotionValue<number>;
}

const DESKTOP_RANGES = {
  y1: { input: [0, 0.25],  output: [0, -20]  },
  y2: { input: [0.2, 0.5], output: [20, -20] },
  y3: { input: [0.45, 0.75], output: [20, -20] },
  y4: { input: [0.7, 1],   output: [20, 0]   },
};

const MOBILE_RANGES = {
  y1: { input: [0, 0.08],    output: [0, -10]  },
  y2: { input: [0.08, 0.17], output: [10, -10] },
  y3: { input: [0.17, 0.26], output: [10, -10] },
  y4: { input: [0.26, 0.35], output: [10, 0]   },
};

const BASE = "font-body text-[#0F0F0E] dark:text-[#FDFDFC] border-b border-black/20 dark:border-white/20 pb-6 md:pb-10 md:mb-10 mb-6";

export const Highlights = ({ smoothProgress }: HighlightsProps) => {
  const { isDesktop } = useBreakpoints();

  const dY1 = useTransform(smoothProgress, DESKTOP_RANGES.y1.input, DESKTOP_RANGES.y1.output);
  const dY2 = useTransform(smoothProgress, DESKTOP_RANGES.y2.input, DESKTOP_RANGES.y2.output);
  const dY3 = useTransform(smoothProgress, DESKTOP_RANGES.y3.input, DESKTOP_RANGES.y3.output);
  const dY4 = useTransform(smoothProgress, DESKTOP_RANGES.y4.input, DESKTOP_RANGES.y4.output);

  const mY1 = useTransform(smoothProgress, MOBILE_RANGES.y1.input, MOBILE_RANGES.y1.output);
  const mY2 = useTransform(smoothProgress, MOBILE_RANGES.y2.input, MOBILE_RANGES.y2.output);
  const mY3 = useTransform(smoothProgress, MOBILE_RANGES.y3.input, MOBILE_RANGES.y3.output);
  const mY4 = useTransform(smoothProgress, MOBILE_RANGES.y4.input, MOBILE_RANGES.y4.output);

  const y1 = isDesktop ? dY1 : mY1;
  const y2 = isDesktop ? dY2 : mY2;
  const y3 = isDesktop ? dY3 : mY3;
  const y4 = isDesktop ? dY4 : mY4;

  return (
    <div className="text-xl md:text-2xl lg:text-xl tracking-wide leading-relaxed lg:max-w-md flex flex-col mb-20 md:mb-0">
      <m.p style={{ y: y1 }} className={BASE}>
        Every project starts with a question: what does this product actually need to do for the people using it?
      </m.p>

      <m.p style={{ y: y2 }} className={BASE}>
        From that answer we build a visual language, one that feels native to the brand and makes the interface self-explanatory.
      </m.p>

      <m.p style={{ y: y3 }} className={BASE}>
        Then we write the code. Pixel-precise, performant, and built to scale without accruing the kind of debt that slows teams down later.
      </m.p>

      <m.p style={{ y: y4 }} className={BASE}>
        We ship, measure, and stay close. A launch is a starting point, not a handoff.
      </m.p>
    </div>
  );
};