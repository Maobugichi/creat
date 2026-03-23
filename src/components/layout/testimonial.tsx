import { m, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight } from "phosphor-react";

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

const testimonials = [
  {
    quote: "They took our vague brief and turned it into a product our users genuinely love. The attention to motion and detail is unlike anything we have seen from an agency.",
    name: "Sarah Chen",
    role: "CPO at Nexus",
    color: "#F5F0E8",
    initial: "SC",
  },
  {
    quote: "From the first call to launch, they were completely aligned with what we needed. Fast, precise, and they pushed back when our ideas were not good enough — which is exactly what you want.",
    name: "Marcus Webb",
    role: "Founder at Orbit",
    color: "#E8F0EC",
    initial: "MW",
  },
  {
    quote: "The 3D work gave us a visual identity we had been trying to find for two years. Our conversion rate went up 34% in the first month after the rebrand.",
    name: "Priya Nair",
    role: "Head of Brand at Flux",
    color: "#E8ECF5",
    initial: "PN",
  },
];

export const Testimonials = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

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

  return (
    <section
      id="testimonials"
      className="bg-[#FAF7F6] dark:bg-[#0F0F0E] py-20 md:py-28 px-5 lg:px-20"
    >
      <div ref={ref}>
        <div className="flex flex-col gap-4 mb-14">
          <m.div
            className="self-start px-3 py-1.5 rounded-full border bg-white/70 dark:bg-white/5 backdrop-blur-sm font-body font-medium"
            style={{ fontSize: "0.7rem", letterSpacing: "0.08em", color: "rgba(0,0,0,0.5)", borderColor: "rgba(0,0,0,0.15)" }}
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
            backgroundColor: active.color,
            borderRadius: "1.75rem",
            borderColor: "rgba(255,255,255,0.75)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.85)",
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
                  className="font-heading font-bold text-[#0F0F0E] leading-tight"
                  style={{
                    fontSize: "clamp(1.2rem, 4.5vw, 2.8rem)",
                    letterSpacing: "-0.02em",
                    maxWidth: "42ch",
                  }}
                >
                  "{active.quote}"
                </p>

                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "rgba(0,0,0,0.08)" }}
                    >
                      <span className="font-heading text-xs font-bold text-[#0F0F0E]/50">
                        {active.initial}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-heading text-base md:text-lg font-bold text-[#0F0F0E]">
                        {active.name}
                      </span>
                      <span className="font-body text-sm text-[#0F0F0E]/50">
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
                          backgroundColor: i === current ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.15)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10 border-t border-black/8">
            <div className="flex flex-col md:flex-row">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => goTo(i)}
                  className="flex items-center justify-between gap-3 px-7 py-4 md:flex-1 md:px-6 md:py-5 transition-all duration-300 group"
                  style={{
                    borderBottom: i < testimonials.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                    borderRight: "none",
                    backgroundColor: i === current ? "rgba(0,0,0,0.04)" : "transparent",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300"
                      style={{ backgroundColor: i === current ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.15)" }}
                    />
                    <div className="flex flex-col gap-0 text-left">
                      <span className="font-heading text-sm font-bold text-[#0F0F0E] group-hover:text-[#0F0F0E]/70 transition-colors">
                        {t.name}
                      </span>
                      <span className="font-body text-xs text-[#0F0F0E]/40">
                        {t.role}
                      </span>
                    </div>
                  </div>
                  <m.div
                    animate={{ rotate: i === current ? 0 : -45 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="opacity-30 group-hover:opacity-60 transition-opacity shrink-0"
                  >
                    <ArrowUpRight size={14} weight="bold" color="#0F0F0E" />
                  </m.div>
                </button>
              ))}
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
};