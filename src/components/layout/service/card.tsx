import { useRef, useState } from "react";
import type { services } from "./constant";
import { m,useInView } from "motion/react";
import { useDarkMode } from "@/hooks/themes";
import { ArrowUpRight } from "phosphor-react";

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

export const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [hovered, setHovered] = useState(false);
  const isDark = useDarkMode();

  const bgColor = isDark ? service.darkColor : service.lightColor;
  const accent = isDark ? service.darkAccentColor : service.accentColor;
  const glow = isDark ? service.darkGlowColor : service.glowColor;

  return (
    <m.div
      ref={ref}
      className="relative overflow-hidden flex flex-col border cursor-pointer"
      style={{
        backgroundColor: bgColor,
        borderRadius: "1.75rem",
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.75)",
        minHeight: "360px",
        boxShadow: hovered
          ? `0 20px 60px -10px ${glow}, 0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 ${isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.9)"}`
          : `0 4px 24px rgba(0,0,0,0.08), inset 0 1px 0 ${isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.85)"}`,
        transition: "box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
        animate={isInView ? { backgroundPosition: ["200% 0", "-200% 0"] } : { backgroundPosition: "200% 0" }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: index * 0.08 + 0.45, repeat: Infinity, repeatDelay: 3.5 }}
      />

      <m.span
        className="absolute pointer-events-none select-none font-heading font-black leading-none"
        style={{
          fontSize: "clamp(8rem, 16vw, 14rem)",
          letterSpacing: "-0.04em",
          color: accent,
          opacity: isDark ? 0.12 : 0.06,
          right: "-0.05em",
          bottom: "-0.15em",
          lineHeight: 1,
        }}
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {service.number}
      </m.span>

      <div className="relative z-10 p-8 md:p-10 flex flex-col h-full gap-6">
        <div className="flex items-start justify-between">
          <span
            className="font-heading text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
            style={{
              color: accent,
              backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.6)",
              border: `1px solid ${accent}`,
              opacity: 0.85,
            }}
          >
            {service.number}
          </span>

          <m.div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.6)",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
            }}
            animate={{
              backgroundColor: hovered
                ? "#FDFDFC"
                : isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.6)",
              borderColor: hovered
                ? "#FDFDFC"
                : isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <m.div
              animate={{ rotate: hovered ? 0 : -45 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ArrowUpRight
                size={14}
                weight="bold"
                color={hovered ? "#0F0F0E" : isDark ? "rgba(255,255,255,0.7)" : "#0F0F0E"}
              />
            </m.div>
          </m.div>
        </div>

        <div className="flex flex-col gap-3 flex-1">
          <h3
            className="font-heading font-bold leading-tight"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              letterSpacing: "-0.02em",
              color: isDark ? "rgba(255,255,255,0.92)" : "#0F0F0E",
            }}
          >
            {service.title}
          </h3>
          <p
            className="font-body text-base leading-relaxed"
            style={{ color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)" }}
          >
            {service.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full font-body font-medium"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.05em",
                color: accent,
                backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.7)",
                border: `1px solid ${accent}`,
                opacity: 0.85,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </m.div>
  );
};