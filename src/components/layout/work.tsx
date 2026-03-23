import { m, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { Btn } from "@/components/btn";
import { ArrowUpRight, Plus } from "phosphor-react";

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

const projects = [
  {
    title: "Nexus Dashboard",
    category: "Product Design",
    year: "2024",
    description: "A data-dense SaaS dashboard rebuilt from scratch with a focus on clarity and speed.",
    color: "#F5F0E8",
    glowColor: "rgba(210,190,150,0.35)",
  },
  {
    title: "Orbit Brand",
    category: "Brand Identity",
    year: "2024",
    description: "Full visual identity for a Web3 startup — logo, type system, motion guidelines.",
    color: "#E8F0EC",
    glowColor: "rgba(120,190,150,0.35)",
  },
  {
    title: "Flux 3D",
    category: "3D & Motion",
    year: "2023",
    description: "Hero 3D scenes and animated product visuals for a hardware launch campaign.",
    color: "#E8ECF5",
    glowColor: "rgba(120,140,210,0.35)",
  },
  {
    title: "Stride Web",
    category: "Web Development",
    year: "2023",
    description: "Marketing site with scroll-driven animations and a sub-2s load time.",
    color: "#F5EBE8",
    glowColor: "rgba(210,130,110,0.35)",
  },
];

function useIsTouch() {
  const [isTouch] = useState(
    () => window.matchMedia("(hover: none) and (pointer: coarse)").matches
  );
  return isTouch;
}

const ProjectRow = ({
  project,
  index,
  expanded,
  onToggle,
  isTouch,
}: {
  project: (typeof projects)[0];
  index: number;
  expanded: boolean;
  onToggle: () => void;
  isTouch: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hovered, setHovered] = useState(false);

  const active = isTouch ? expanded : hovered;

  return (
    <m.div
      ref={ref}
      className="relative overflow-hidden border-b border-black/10 dark:border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      onMouseEnter={() => !isTouch && setHovered(true)}
      onMouseLeave={() => !isTouch && setHovered(false)}
    >
      <m.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{ backgroundColor: active ? project.color : "transparent" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{ backgroundImage: GRAIN, backgroundRepeat: "repeat", backgroundSize: "128px 128px" }}
      />

      <div className="relative z-10 py-7 md:py-10 flex flex-col gap-4">
        <button
          onClick={isTouch ? onToggle : undefined}
          className={`flex flex-row items-center gap-4 md:gap-0 w-full text-left ${isTouch ? "cursor-pointer" : "cursor-default"}`}
          aria-expanded={isTouch ? expanded : undefined}
          aria-label={isTouch ? `${expanded ? "Collapse" : "Expand"} ${project.title}` : undefined}
        >
          <span
            className="font-heading font-black text-[#0F0F0E]/10 dark:text-[#FDFDFC]/10 w-16 shrink-0 leading-none select-none"
            style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}
          >
            0{index + 1}
          </span>

          <m.h3
            className="font-heading font-bold text-[#0F0F0E] dark:text-[#FDFDFC] flex-1"
            style={{ fontSize: "clamp(1.6rem, 4vw, 3.2rem)", letterSpacing: "-0.03em" }}
            animate={{ x: active ? 8 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {project.title}
          </m.h3>

          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            <span
              className="px-3 py-1.5 rounded-full border bg-white/70 dark:bg-white/5 backdrop-blur-sm font-body font-medium hidden sm:inline-block"
              style={{ fontSize: "0.7rem", letterSpacing: "0.05em", color: "rgba(0,0,0,0.62)", borderColor: "rgba(0,0,0,0.18)" }}
            >
              {project.category}
            </span>
            <span className="font-body text-sm text-black/30 dark:text-white/30 hidden md:block">
              {project.year}
            </span>
            <m.div
              className="w-10 h-10 rounded-full border flex items-center justify-center shrink-0"
              animate={{
                backgroundColor: active ? "#0F0F0E" : "transparent",
                borderColor: active ? "#0F0F0E" : "rgba(0,0,0,0.2)",
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <m.div
                animate={{ rotate: isTouch && expanded ? 45 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Plus
                  size={16}
                  weight="bold"
                  color={active ? "#FDFDFC" : "#0F0F0E"}
                />
              </m.div>
            </m.div>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {(isTouch ? expanded : hovered) && (
            <m.div
              key="details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden pl-0 md:pl-16"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-2">
                <div className="flex flex-col gap-3">
                  <span
                    className="sm:hidden self-start px-3 py-1.5 rounded-full border bg-white/70 dark:bg-white/5 backdrop-blur-sm font-body font-medium"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.05em", color: "rgba(0,0,0,0.62)", borderColor: "rgba(0,0,0,0.18)" }}
                  >
                    {project.category}
                  </span>
                  <p className="font-body text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-md">
                    {project.description}
                  </p>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-[#0F0F0E] dark:text-[#FDFDFC] border border-black/20 dark:border-white/20 px-4 py-2.5 rounded-full shrink-0 hover:bg-[#0F0F0E] hover:text-[#FDFDFC] dark:hover:bg-[#FDFDFC] dark:hover:text-[#0F0F0E] transition-all duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Project <ArrowUpRight size={14} weight="bold" />
                </a>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.div>
  );
};

export const Work = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isTouch = useIsTouch();

  const handleToggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="work" className="bg-[#FAF7F6] dark:bg-[#0F0F0E] py-20 md:py-28 px-5 lg:px-20">
      <div ref={ref}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="flex flex-col gap-4">
            <m.div
              className="self-start px-3 py-1.5 rounded-full border bg-white/70 dark:bg-white/5 backdrop-blur-sm font-body font-medium"
              style={{ fontSize: "0.7rem", letterSpacing: "0.08em", color: "rgba(0,0,0,0.5)", borderColor: "rgba(0,0,0,0.15)" }}
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
            className="font-body text-sm text-black/30 dark:text-white/30 mb-6"
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