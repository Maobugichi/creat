import { m, useInView } from "motion/react";
import {  useRef, useState } from "react";
import { Btn } from "@/components/btn";
import { useDarkMode } from "@/hooks/themes";
import { projects } from "./constant";
import { useIsTouch } from "./useTouch";
import { ProjectRow } from "./projectRow";

export const Work = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isTouch = useIsTouch();
  const isDark = useDarkMode();

  const handleToggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  
  const pillColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.5)";
  const pillBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.15)";
  const pillBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)";

  return (
    <section id="work" className="bg-[#FAF7F6] dark:bg-[#0F0F0E] py-20 md:py-28 px-5 lg:px-20">
      <div ref={ref}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="flex flex-col gap-4">
            <m.div
              className="self-start px-3 py-1.5 rounded-full border backdrop-blur-sm font-body font-medium"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                color: pillColor,
                borderColor: pillBorder,
                backgroundColor: pillBg,
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              SELECTED WORK
            </m.div>
            <m.h2
              className="font-heading text-5xl md:text-6xl font-bold leading-tight text-[#0F0F0E] dark:text-[#FDFDFC]"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              Work that speaks{" "}
              <span className="text-[#0F0F0E]/30 dark:text-[#FDFDFC]/30">for itself.</span>
            </m.h2>
          </div>

          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="shrink-0"
          >
            <Btn>View All Work</Btn>
          </m.div>
        </div>

        {isTouch && (
          <m.p
            className="font-body text-sm mb-6"
            style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Tap any project to learn more
          </m.p>
        )}

        <div className="flex flex-col border-t border-black/10 dark:border-white/10">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.title}
              project={project}
              index={index}
              expanded={expandedIndex === index}
              onToggle={() => handleToggle(index)}
              isTouch={isTouch}
            />
          ))}
        </div>
      </div>
    </section>
  );
};