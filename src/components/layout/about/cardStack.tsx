import { useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Card } from "@/components/card";
import { Highlights } from "./highlights";
import idea from "../../../assets/3dicons-target-dynamic-premium.png"
import pen from "../../../assets/3dicons-painting-brush-dynamic-premium.png"
import setting from "../../../assets/3dicons-setting-dynamic-premium.png";
import rocket from "../../../assets/3dicons-rocket-iso-premium.png";
import { useMediaQuery } from "react-responsive";


const cards = [
  { 
    title: "The Vision", 
    description: "Defining the core purpose.", 
    color: "#EDE9FE", 
    icon: idea
  },
  { 
    title: "The Design", 
    description: "Crafting the visual language.", 
    color: "#FCE7F3", 
    icon: pen
  },
  { 
    title: "The Build", 
    description: "Translating pixels to code.", 
    color: "#DBEAFE", 
    icon: setting
  },
  { 
    title: "The Launch", 
    description: "Deploying to the world.", 
    color: "#FED7AA", // Light orange
    icon: rocket
  },
];

export const CardStack = () => {
  const container = useRef(null);
  
  // Detect mobile for the hybrid logic
  const isMobile = useMediaQuery({ maxWidth: 767 });
  
  // Your existing iPad/Height logic
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isTallNarrow = useMediaQuery({ minHeight: 890, maxWidth: 500 });
  const isMidHeight = useMediaQuery({ minHeight: 790, maxHeight: 889 });
  const isThinHeight = useMediaQuery({ maxHeight: 882, maxWidth: 344 });
  const isShortHeight = useMediaQuery({ maxHeight: 789 });

  const getMultiplier = () => {
    if (isThinHeight) return 200;
    if (isTablet) return 105;
    if (isTallNarrow) return 95;
    if (isMidHeight) return 100;
    if (isShortHeight) return 105;
    return 100; 
  };

  const multiplier = getMultiplier();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section 
      ref={container} 
      className="relative flex flex-col pt-20 md:flex-row md:gap-10 px-5"
      style={{ height: `${cards.length * multiplier}vh` }}
    >
     
      <div className="md:w-1/2 md:sticky top-[10vh] h-fit ">
        <h2 className="font-heading text-5xl font-bold mb-6 leading-tight">
          Guess <span className="text-gray-400">what we can do</span>
        </h2>
       
        <Highlights smoothProgress={smoothProgress}  />
      </div>

      <div className="w-full md:w-1/2 relative">
        {cards.map((card, i) => {
          const targetScale = 1 - (cards.length - i) * 0.05;
          const start = i * (1 / cards.length);
          
          return (
            <Card 
              key={i} 
              i={i} 
              {...card} 
              progress={smoothProgress} 
              range={[start, 1]} 
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
};