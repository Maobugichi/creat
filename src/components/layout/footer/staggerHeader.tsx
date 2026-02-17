import { m } from "motion/react";


const CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const WORD_VARIANTS = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0,  opacity: 1  },
};


const LINE_ONE = ["ready", "to", "level", "up"];
const LINE_TWO = ["your", "website?"];


const VIEWPORT = { once: false, amount: 0.3 } as const;

export const StaggerHeader = () => {
  return (
    <m.h4
      className="text-4xl font-heading sm:text-5xl md:text-6xl lg:text-8xl text-center font-bold leading-tight"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={CONTAINER_VARIANTS}
    >
      {LINE_ONE.map((word, _i) => (
        <m.span
          key={word}
          variants={WORD_VARIANTS}
          className="inline-block mr-2 md:mr-4"
        >
          {word}
        </m.span>
      ))}
      <br />
      {LINE_TWO.map((word, _i) => (
        <m.span
          key={word}
          variants={WORD_VARIANTS}
          className="inline-block mr-2 md:mr-4"
        >
          {word}
        </m.span>
      ))}
    </m.h4>
  );
};