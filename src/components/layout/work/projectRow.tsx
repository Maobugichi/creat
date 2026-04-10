import { useRef, useState } from "react";
import { GRAIN, type projects } from "./constant";
import { AnimatePresence, useInView, m } from "motion/react";
import { useDarkMode } from "@/hooks/themes";
import { ArrowUpRight, Plus } from "phosphor-react";

export const ProjectRow = ({
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
  const [hovered, setHovered] = useState<boolean>(false);
  const isDark = useDarkMode();

  const active = isTouch ? expanded : hovered;
  const activeBg = isDark ? project.darkColor : project.lightColor;


  const iconCircleBg = active
    ? isDark ? "#FDFDFC" : "#0F0F0E"
    : "transparent";
  const iconCircleBorder = active
    ? isDark ? "#FDFDFC" : "#0F0F0E"
    : isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
  const iconColor = active
    ? isDark ? "#0F0F0E" : "#FDFDFC"
    : isDark ? "rgba(255,255,255,0.7)" : "#0F0F0E";

 
  const pillColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.62)";
  const pillBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.18)";
  const pillBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.7)";

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
      {/* Hover/active background */}
      <m.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{ backgroundColor: active ? activeBg : "transparent" }}
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
            className="font-heading font-black w-16 shrink-0 leading-none select-none"
            style={{
              fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
              color: isDark ? "rgba(255,255,255,0.1)" : "rgba(15,15,14,0.1)",
            }}
          >
            0{index + 1}
          </span>

          <m.h3
            className="font-heading font-bold flex-1"
            style={{
              fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
              letterSpacing: "-0.03em",
              color: isDark ? "rgba(255,255,255,0.92)" : "#0F0F0E",
            }}
            animate={{ x: active ? 8 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {project.title}
          </m.h3>

          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            <span
              className="px-3 py-1.5 rounded-full border backdrop-blur-sm font-body font-medium hidden sm:inline-block"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.05em",
                color: pillColor,
                borderColor: pillBorder,
                backgroundColor: pillBg,
              }}
            >
              {project.category}
            </span>
            <span
              className="font-body text-sm hidden md:block"
              style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}
            >
              {project.year}
            </span>
            <m.div
              className="w-10 h-10 rounded-full border flex items-center justify-center shrink-0"
              animate={{
                backgroundColor: iconCircleBg,
                borderColor: iconCircleBorder,
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <m.div
                animate={{ rotate: isTouch && expanded ? 45 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Plus size={16} weight="bold" color={iconColor} />
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
                    className="sm:hidden self-start px-3 py-1.5 rounded-full border backdrop-blur-sm font-body font-medium"
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.05em",
                      color: pillColor,
                      borderColor: pillBorder,
                      backgroundColor: pillBg,
                    }}
                  >
                    {project.category}
                  </span>
                  <p
                    className="font-body text-base md:text-lg max-w-md"
                    style={{ color: isDark ? "rgba(255,255,255,0.45)" : "rgba(107,114,128,1)" }}
                  >
                    {project.description}
                  </p>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 font-heading text-sm font-semibold px-4 py-2.5 rounded-full shrink-0 transition-all duration-200"
                  style={{
                    color: isDark ? "rgba(255,255,255,0.85)" : "#0F0F0E",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}`,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = isDark ? "#FDFDFC" : "#0F0F0E";
                    el.style.color = isDark ? "#0F0F0E" : "#FDFDFC";
                    el.style.borderColor = isDark ? "#FDFDFC" : "#0F0F0E";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = "transparent";
                    el.style.color = isDark ? "rgba(255,255,255,0.85)" : "#0F0F0E";
                    el.style.borderColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
                  }}
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