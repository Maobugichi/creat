import { useScroll, useSpring } from "motion/react";
import { useRef, useMemo } from "react";
import { Card } from "@/components/card";
import { Highlights } from "./highlights";
import idea from "../../../assets/3dicons-target-dynamic-premium.avif";
import pen from "../../../assets/3dicons-painting-brush-dynamic-premium.avif";
import setting from "../../../assets/3dicons-setting-dynamic-premium.avif";
import rocket from "../../../assets/3dicons-rocket-iso-premium.webp";
import { useBreakpoints } from "@/hooks/useBreakpoint";


const cards = [
  { title: "The Vision",  description: "Defining the core purpose.",      color: "#EDE9FE", icon: idea    },
  { title: "The Design",  description: "Crafting the visual language.",    color: "#FCE7F3", icon: pen     },
  { title: "The Build",   description: "Translating pixels to code.",      color: "#DBEAFE", icon: setting },
  { title: "The Launch",  description: "Deploying to the world.",          color: "#FED7AA", icon: rocket  },
];

const cardData = cards.map((card, i) => ({
  ...card,
  i,
  targetScale: 1 - (cards.length - i) * 0.05,
  range: [i * (1 / cards.length), 1] as [number, number],
}));

export const CardStack = () => {
  const container = useRef(null);

 
  const { isTablet, isTallNarrow, isMidHeight, isThinHeight, isShortHeight } = useBreakpoints();


  const multiplier = useMemo(() => {
    if (isThinHeight)  return 200;
    if (isTablet)      return 105;
    if (isTallNarrow)  return 95;
    if (isMidHeight)   return 100;
    if (isShortHeight) return 105;
    return 100;
  }, [isTablet, isTallNarrow, isMidHeight, isThinHeight, isShortHeight]);


  const sectionHeight = `${cardData.length * multiplier}vh`;

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
      ref={container}
      className="relative flex flex-col pt-20 md:flex-row md:gap-10 px-5 md:px-20"
      style={{ height: sectionHeight }}
    >
      <div className="md:w-1/2 md:sticky top-[10vh] h-fit">
        <h2 className="font-heading text-5xl font-bold mb-6 leading-tight">
          Guess <span className="text-gray-400">what we can do</span>
        </h2>
        <Highlights smoothProgress={smoothProgress} />
      </div>

      <div className="w-full md:w-1/2 relative">
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