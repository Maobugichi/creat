import { m, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";

import { useDarkMode } from "@/hooks/themes";
import { GRAIN, testimonials } from "./constants";
import { TabList } from "./tablist";



export const Testimonials = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const isDark = useDarkMode();

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused]);

  const goTo = (index: number) => {
    if (index === current) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    setPaused(true);
    setTimeout(() => setPaused(false), 10000);
  };

  const active = testimonials[current];
  const activeBg = isDark ? active.darkColor : active.lightColor;

 
  const textPrimary = isDark ? "rgba(255,255,255,0.92)" : "#0F0F0E";
  const textSecondary = isDark ? "rgba(255,255,255,0.45)" : "rgba(15,15,14,0.5)";
  const textTertiary = isDark ? "rgba(255,255,255,0.3)" : "rgba(15,15,14,0.4)";
  const dividerColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const dotActive = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)";
  const dotInactive = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
  const avatarBg = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const rowActiveBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";
  const pillBadgeBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)";
  const pillBadgeBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.15)";
  const pillBadgeColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.5)";

  return (
    <section
      id="testimonials"
      className="bg-[#FAF7F6] dark:bg-[#0F0F0E] py-20 md:py-28 px-5 lg:px-20"
    >
      <div ref={ref}>
        <div className="flex flex-col gap-4 mb-14">
          <m.div
            className="self-start px-3 py-1.5 rounded-full border backdrop-blur-sm font-body font-medium"
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
              color: pillBadgeColor,
              borderColor: pillBadgeBorder,
              backgroundColor: pillBadgeBg,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            CLIENT STORIES
          </m.div>
          <m.h2
            className="font-heading text-5xl md:text-6xl font-bold leading-tight text-[#0F0F0E] dark:text-[#FDFDFC]"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            Clients who trusted us{" "}
            <span className="text-[#0F0F0E]/30 dark:text-[#FDFDFC]/30">and came back.</span>
          </m.h2>
        </div>

        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative overflow-hidden border"
          style={{
            backgroundColor: activeBg,
            borderRadius: "1.75rem",
            borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.75)",
            boxShadow: isDark
              ? "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)"
              : "0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.85)",
            transition: "background-color 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]"
            style={{ backgroundImage: GRAIN, backgroundRepeat: "repeat", backgroundSize: "128px 128px" }}
          />

          <m.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.45, repeat: Infinity, repeatDelay: 3.5 }}
          />

          <div className="relative z-10 p-7 md:p-16" style={{ minHeight: "300px" }}>
            <AnimatePresence mode="popLayout" custom={direction}>
              <m.div
                key={current}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, y: d * 20, filter: "blur(4px)" }),
                  center: { opacity: 1, y: 0, filter: "blur(0px)" },
                  exit: (d: number) => ({ opacity: 0, y: d * -20, filter: "blur(4px)" }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-8"
              >
                <p
                  className="font-heading font-bold leading-tight"
                  style={{
                    fontSize: "clamp(1.2rem, 4.5vw, 2.8rem)",
                    letterSpacing: "-0.02em",
                    maxWidth: "42ch",
                    color: textPrimary,
                  }}
                >
                  "{active.quote}"
                </p>

                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: avatarBg }}
                    >
                      <span
                        className="font-heading text-xs font-bold"
                        style={{ color: textSecondary }}
                      >
                        {active.initial}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span
                        className="font-heading text-base md:text-lg font-bold"
                        style={{ color: textPrimary }}
                      >
                        {active.name}
                      </span>
                      <span
                        className="font-body text-sm"
                        style={{ color: textSecondary }}
                      >
                        {active.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Go to testimonial ${i + 1}`}
                        className="rounded-full transition-all duration-500"
                        style={{
                          width: i === current ? "2rem" : "0.5rem",
                          height: "0.5rem",
                          backgroundColor: i === current ? dotActive : dotInactive,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>

         
          <TabList
           dividerColor={dividerColor}
           goTo={goTo}
           current={current}
           rowActiveBg={rowActiveBg}
           dotActive={dotActive}
           dotInactive={dotInactive}
           textPrimary={textPrimary}
           textSecondary={textSecondary}
           textTertiary={textTertiary}
           isDark={isDark}
          />
        </m.div>
      </div>
    </section>
  );
};