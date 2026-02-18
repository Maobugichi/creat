import { m, useTransform, type MotionValue } from "motion/react";
import { useBreakpoints } from "@/hooks/useBreakpoint";

interface HighlightsProps {
  smoothProgress: MotionValue<number>;
}

const DESKTOP_RANGES = {
  opacity1: { input: [0, 0.2, 0.25],              output: [1, 1, 0.6] },
  opacity2: { input: [0.2, 0.25, 0.45, 0.5],      output: [0.6, 1, 1, 0.6] },
  opacity3: { input: [0.45, 0.5, 0.7, 0.75],      output: [0.6, 1, 1, 0.6] },
  opacity4: { input: [0.7, 0.75],                 output: [0.6, 1] },
};

const MOBILE_RANGES = {
  opacity1: { input: [0, 0.05, 0.08],             output: [1, 1, 0.6] },
  opacity2: { input: [0.08, 0.11, 0.14, 0.17],    output: [0.6, 1, 1, 0.6] },
  opacity3: { input: [0.17, 0.20, 0.23, 0.26],    output: [0.6, 1, 1, 0.6] },
  opacity4: { input: [0.26, 0.29],                output: [0.6, 1] },
};

const TEXT_CLASS =
  "font-body text-gray-800 border-b border-black/30 pb-6 mb-6";

export const Highlights = ({ smoothProgress }: HighlightsProps) => {
  const { isDesktop } = useBreakpoints();

  const dOpacity1 = useTransform(
    smoothProgress,
    DESKTOP_RANGES.opacity1.input,
    DESKTOP_RANGES.opacity1.output
  );
  const dOpacity2 = useTransform(
    smoothProgress,
    DESKTOP_RANGES.opacity2.input,
    DESKTOP_RANGES.opacity2.output
  );
  const dOpacity3 = useTransform(
    smoothProgress,
    DESKTOP_RANGES.opacity3.input,
    DESKTOP_RANGES.opacity3.output
  );
  const dOpacity4 = useTransform(
    smoothProgress,
    DESKTOP_RANGES.opacity4.input,
    DESKTOP_RANGES.opacity4.output
  );

  const mOpacity1 = useTransform(
    smoothProgress,
    MOBILE_RANGES.opacity1.input,
    MOBILE_RANGES.opacity1.output
  );
  const mOpacity2 = useTransform(
    smoothProgress,
    MOBILE_RANGES.opacity2.input,
    MOBILE_RANGES.opacity2.output
  );
  const mOpacity3 = useTransform(
    smoothProgress,
    MOBILE_RANGES.opacity3.input,
    MOBILE_RANGES.opacity3.output
  );
  const mOpacity4 = useTransform(
    smoothProgress,
    MOBILE_RANGES.opacity4.input,
    MOBILE_RANGES.opacity4.output
  );

  const opacity1 = isDesktop ? dOpacity1 : mOpacity1;
  const opacity2 = isDesktop ? dOpacity2 : mOpacity2;
  const opacity3 = isDesktop ? dOpacity3 : mOpacity3;
  const opacity4 = isDesktop ? dOpacity4 : mOpacity4;

  return (
    <div className="text-xl tracking-wide leading-relaxed max-w-md flex flex-col mb-20 md:mb-0">
      <m.p style={{ opacity: opacity1 }} className={TEXT_CLASS}>
        We're a bunch of creatives who love blending art and tech to build
        experiences that actually make people feel something.
      </m.p>

      <m.p style={{ opacity: opacity2 }} className={TEXT_CLASS}>
        From smooth animations to bold digital experiences, we bring ideas
        to life across the web.
      </m.p>

      <m.p style={{ opacity: opacity3 }} className={TEXT_CLASS}>
        Our goal? To dive into exciting projects, team up with amazing
        collaborators, and deliver top-tier services.
      </m.p>

      <m.p style={{ opacity: opacity4 }} className="text-gray-800 pb-6">
        We build for Web3 communities around the world so they can vibe
        with the future of the internet.
      </m.p>
    </div>
  );
};
