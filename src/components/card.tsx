import { m, useTransform, useInView } from "motion/react";
import type { MotionValue } from "motion/react";
import { useRef } from "react";

interface CardProps {
  i: number;
  title: string;
  description: string;
  color: string;
  glowColor?: string;
  contextText?: string;
  icon: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const IMG_STYLE = { right: "-30%", top: "30%" } as const;

export const Card = ({
  i, title, description, color, glowColor, contextText, icon,
  progress, range, targetScale,
}: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const entryStart  = Math.max(0, range[0] - 0.1);
  const scale       = useTransform(progress, range, [1, targetScale]);
  const cardEntryY  = useTransform(progress, [entryStart, range[0]], [50, 0]);
  const cardOpacity = useTransform(progress, [entryStart, range[0]], [0, 1]);
  const stackOffset = `calc(-2vh + ${i * 25}px)`;

  return (
    <div className="h-[70vh] lg:h-screen flex items-center justify-center sticky top-[15vh] lg:top-0">
      <m.div
        ref={ref}
        style={{
          backgroundColor: color,
          scale,
          y: cardEntryY,
          opacity: cardOpacity,
          top: stackOffset,
          zIndex: i,
          boxShadow: `0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.85)`,
        }}
        className="relative h-100 w-full md:w-[90%] max-w-175 rounded-3xl p-10 shadow-2xl will-change-transform origin-top border border-white/75 overflow-hidden"
        whileHover={{
          boxShadow: `0 20px 60px -10px ${glowColor}, 0 4px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)`,
        }}
      >
       
       
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />

        {/* ── Periodic shimmer ────────────────────────────────────── */}
        <m.div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%)",
            backgroundSize: "200% 100%",
          }}
          animate={
            isInView
              ? { backgroundPosition: ["200% 0", "-200% 0"] }
              : { backgroundPosition: "200% 0" }
          }
          transition={{
            duration: 1.2,
            ease: "easeInOut" as const,
            delay: i * 0.1 + 0.45,
            repeat: Infinity,
            repeatDelay: 3.5,
          }}
        />

        {/* ── Icon — luminosity + radial wash ─────────────────────── */}
        <div className="absolute  pointer-events-none z-0" style={IMG_STYLE}>
          <m.img
            src={icon}
            alt="3d icon"
            aria-hidden="true"
            className="w-48 h-48 md:w-96 md:h-96 object-contain"
            style={{
              opacity: 0.72,
              mixBlendMode: "luminosity" as React.CSSProperties["mixBlendMode"],
              transform: "translateY(-50%)",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.72 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 55% 40%, rgba(255,255,255,0.22) 0%, transparent 70%)",
              mixBlendMode: "screen" as React.CSSProperties["mixBlendMode"],
              transform: "translateY(-50%)",
            }}
          />
        </div>

      
        <div className="relative z-10">

        
          {contextText && (
            <m.span
              className="inline-block mb-4 px-2.5 py-1 rounded-full font-medium border bg-white/70 backdrop-blur-sm whitespace-nowrap"
              style={{
                fontSize: "clamp(0.6rem, 1vw, 0.72rem)",
                letterSpacing: "0.05em",
                color: "rgba(0,0,0,0.62)",
                borderColor: "rgba(0,0,0,0.18)",
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 + 0.3 }}
            >
              {contextText}
            </m.span>
          )}

          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gray-800">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 font-body max-w-md">
            {description}
          </p>
        </div>

      
        <m.div
          aria-hidden="true"
          className="absolute select-none pointer-events-none font-heading font-black"
          style={{
            fontSize: "clamp(8rem, 22vw, 18rem)",
            lineHeight: 1,
            color: "rgba(0,0,0,0.045)",
            left: "50%",
            top: "80%",
            transform: "translate(-50%, -50%)",
            letterSpacing: "-0.04em",
            zIndex: 0,
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
        >
          0{i + 1}
        </m.div>

        
        <div
          aria-hidden="true"
          className="absolute bottom-10 font-heading left-10 text-6xl md:text-7xl font-black text-gray-800/20"
        >
          0{i + 1}
        </div>

      </m.div>
    </div>
  );
};