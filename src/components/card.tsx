import { m, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";

interface CardProps {
  i: number;
  title: string;
  description: string;
  color: string;
  icon: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}


const IMG_INITIAL = { scale: 0.8, opacity: 0, y: "50%" } as const;
const IMG_ANIMATE = { scale: 1, opacity: 0.8, y: "-50%" } as const;
const IMG_TRANSITION = { duration: 0.6, delay: 0.2 } as const;


const IMG_STYLE = { right: "-10%", top: "80%" } as const;

export const Card = ({
  i, title, description, color, icon,
  progress, range, targetScale,
}: CardProps) => {

  
  const entryStart  = Math.max(0, range[0] - 0.1);

  
  const scale       = useTransform(progress, range, [1, targetScale]);
  const cardEntryY  = useTransform(progress, [entryStart, range[0]], [50, 0]);
  const cardOpacity = useTransform(progress, [entryStart, range[0]], [0, 1]);

 
  const stackOffset = `calc(-2vh + ${i * 25}px)`;


  return (
    <div className="h-[70vh] md:h-screen flex items-center justify-center sticky top-[15vh] md:top-0">
      <m.div
        style={{
          backgroundColor: color,
          scale,
          y: cardEntryY,
          opacity: cardOpacity,
          top: stackOffset,
          zIndex: i,
        }}
        className="relative h-100 w-full md:w-[90%] max-w-175 rounded-3xl p-10 shadow-2xl will-change-transform origin-top border border-gray-200 overflow-hidden"
      >
        <m.img
          src={icon}
          alt="3d icons"
          aria-hidden="true"
          className="absolute w-48 h-48 md:w-96 md:h-96 pointer-events-none z-0"
          style={IMG_STYLE}
          initial={IMG_INITIAL}
          animate={IMG_ANIMATE}
          transition={IMG_TRANSITION}
        />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gray-800">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 font-body max-w-md">
            {description}
          </p>
        </div>

        <div 
         aria-hidden="true"
         className="absolute bottom-10 font-heading left-10 text-6xl md:text-7xl font-black  text-gray-800/20">
          0{i + 1}
        </div>
      </m.div>
    </div>
  );
};