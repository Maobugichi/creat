import { useScroll, useSpring } from "motion/react";
import { useRef, useMemo } from "react";
import { Card } from "@/components/card";
import { StepIndicator } from "./stepIndicator";
import { cards } from "./cardData";
import { useBreakpoints } from "@/hooks/useBreakpoint";

const cardData = cards.map((card, i) => ({
  ...card,
  i,
  targetScale: 1 - (cards.length - i) * 0.05,
  range: [i * (1 / cards.length), 1] as [number, number],
}));

export const CardStack = () => {
  const container = useRef(null);

  const { isTablet, isTallNarrow, isMidHeight, isThinHeight, isShortHeight, isMobile } = useBreakpoints();

  const multiplier = useMemo(() => {
    if (isThinHeight)  return 200;
    if (isTablet)      return 90;
    if (isTallNarrow)  return 95;
    if (isMidHeight)   return 100;
    if (isShortHeight) return 105;
    return 100;
  }, [isTablet, isTallNarrow, isMidHeight, isThinHeight, isShortHeight]);

  const sectionHeight = isMobile ? "auto" : `${cardData.length * multiplier}vh`;

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="about"
      ref={container}
      className="relative flex flex-col lg:flex-row lg:gap-10 px-5 lg:px-20"
      style={{ height: sectionHeight }}
    >
      <h2 className="lg:hidden font-heading text-4xl font-bold mb-8 leading-tight pt-10">
        How we take a project{" "}
        <span className="text-gray-400">from brief to live</span>
      </h2>

      <div className="hidden lg:flex lg:w-1/2 flex-col">
        <h2 className="font-heading text-5xl font-bold mb-10 leading-tight pt-[10vh]">
          How we take a project{" "}
          <span className="text-gray-400">from brief to live</span>
        </h2>
        <div className="sticky top-0 h-screen flex items-center">
          <StepIndicator
            steps={cards.map((c) => c.title)}
            progress={smoothProgress}
            totalCards={cards.length}
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 relative">
        {cardData.map((card) => (
          <Card
            key={card.title}
            {...card}
            progress={smoothProgress}
          />
        ))}
      </div>
    </section>
  );
};