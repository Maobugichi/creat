import { m, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import trophy from "../../../assets/3dicons-trophy-dynamic-color-optimized.avif";
import heart from "../../../assets/3dicons-notify-heart-dynamic-color-optimized.avif";
import clock from "../../../assets/3dicons-clock-dynamic-color-optimized.avif";
import rocket from "../../../assets/3dicons-rocket-dynamic-color-optimized.avif";
import { Btn } from "@/components/btn";

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

interface StatCardProps {
  title: string;
  shortTitle?: string;
  color: string;
  glowColor: string;
  className?: string;
  targetNumber?: number;
  numberSuffix?: string;
  contextText?: string;
  shortContextText?: string;
  icon?: string;
  delay?: number;
}

const StatCard = ({
  title,
  shortTitle,
  color,
  glowColor,
  className = "",
  targetNumber,
  numberSuffix = "+",
  contextText,
  shortContextText,
  icon,
  delay = 0,
}: StatCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [isHovered, setIsHovered] = useState(false);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 55, damping: 12 });
  const displayValue = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView && targetNumber) {
      motionValue.set(targetNumber);
    }
  }, [isInView, motionValue, targetNumber]);

  return (
    <m.div
      ref={ref}
      className={`relative overflow-hidden flex flex-col justify-between border ${className}`}
      style={{
        backgroundColor: color,
        borderRadius: "1.75rem",
        borderColor: "rgba(255,255,255,0.75)",
        boxShadow: isHovered
          ? `0 20px 60px -10px ${glowColor}, 0 4px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)`
          : `0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.85)`,
        transition: "box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{ backgroundImage: GRAIN, backgroundRepeat: "repeat", backgroundSize: "128px 128px" }}
      />

      <m.div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%)",
          backgroundSize: "200% 100%",
        }}
        animate={isInView ? { backgroundPosition: ["200% 0", "-200% 0"] } : { backgroundPosition: "200% 0" }}
        transition={{
          duration: 1.2,
          ease: "easeInOut" as const,
          delay: delay + 0.45,
          repeat: Infinity,
          repeatDelay: 3.5,
        }}
      />

      {icon && (
        <m.img
          src={icon}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none z-0 object-contain hidden lg:block"
          style={{
            width: "180px",
            height: "180px",
            bottom: "-12px",
            right: "-12px",
            mixBlendMode: "luminosity" as React.CSSProperties["mixBlendMode"],
            opacity: 0.75,
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.75 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: delay + 0.15 }}
        />
      )}

      <div className="relative z-10 p-5 lg:p-8 flex flex-col justify-between h-full gap-3 lg:gap-0">
        {contextText && (
          <span
            className="self-start px-2.5 py-1 rounded-full font-medium border bg-white/70 backdrop-blur-sm whitespace-nowrap"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.04em",
              color: "rgba(0,0,0,0.55)",
              borderColor: "rgba(0,0,0,0.15)",
            }}
          >
            <span className="lg:hidden">{shortContextText ?? contextText}</span>
            <span className="hidden lg:inline">{contextText}</span>
          </span>
        )}

        <div className="flex flex-col gap-0.5 lg:mt-auto">
          {targetNumber && (
            <div className="flex items-end gap-0.5 leading-none">
              <m.span
                className="font-extrabold text-[#0F0F0E] dark:text-[#FDFDFC] leading-none"
                style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)", letterSpacing: "-0.04em" }}
              >
                {displayValue}
              </m.span>
              <span
                className="font-extrabold text-[#0F0F0E]/40 dark:text-[#FDFDFC]/40 leading-none pb-1"
                style={{ fontSize: "clamp(1.2rem, 3.5vw, 2.8rem)" }}
              >
                {numberSuffix}
              </span>
            </div>
          )}
          <span
            className="font-body font-medium text-[#0F0F0E]/50 dark:text-[#FDFDFC]/50 uppercase tracking-widest"
            style={{ fontSize: "0.65rem", letterSpacing: "0.12em" }}
          >
            <span className="lg:hidden">{shortTitle ?? title}</span>
            <span className="hidden lg:inline">{title}</span>
          </span>
        </div>
      </div>
    </m.div>
  );
};

export const FeatureGrid = () => {
  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-4"
      style={{ gridAutoRows: "minmax(150px, auto)" }}
    >
      <StatCard
        title="Projects completed"
        shortTitle="Projects"
        className="col-span-1 lg:col-span-3 lg:min-h-[300px]"
        color="#F5F0E8"
        glowColor="rgba(210,190,150,0.35)"
        targetNumber={150}
        numberSuffix="+"
        contextText="Across 18 industries"
        shortContextText="18 industries"
        icon={trophy}
        delay={0}
      />

      <StatCard
        title="Happy clients"
        shortTitle="Clients"
        color="#E8F0EC"
        glowColor="rgba(120,190,150,0.35)"
        className="col-span-1 lg:col-span-6 lg:min-h-[300px]"
        targetNumber={200}
        numberSuffix="+"
        contextText="Across 12 countries"
        shortContextText="12 countries"
        icon={heart}
        delay={0.1}
      />

      <StatCard
        title="Team members"
        shortTitle="Team"
        className="col-span-1 lg:col-span-3 lg:min-h-[300px]"
        color="#F5EBE8"
        glowColor="rgba(210,130,110,0.35)"
        targetNumber={25}
        numberSuffix="+"
        contextText="Growing fast"
        icon={rocket}
        delay={0.15}
      />

      <StatCard
        title="Years experience"
        shortTitle="Experience"
        color="#E8ECF5"
        glowColor="rgba(120,140,210,0.35)"
        className="col-span-1 lg:col-span-5 lg:min-h-[300px]"
        targetNumber={8}
        numberSuffix="yrs"
        contextText="Since 2016"
        icon={clock}
        delay={0.2}
      />

      <m.div
        className="col-span-2 lg:col-span-7 relative overflow-hidden flex flex-col justify-between border bg-[#0F0F0E] dark:bg-[#FDFDFC]"
        style={{
          padding: "1.5rem",
          borderRadius: "1.75rem",
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          minHeight: "180px",
        }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      >
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
          style={{ backgroundImage: GRAIN, backgroundRepeat: "repeat", backgroundSize: "128px 128px" }}
        />
        <span
          className="absolute pointer-events-none select-none font-heading font-black text-white/[0.04] dark:text-black/[0.04] leading-none"
          style={{
            fontSize: "clamp(4rem, 18vw, 14rem)",
            bottom: "-0.15em",
            right: "-0.05em",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          WE
        </span>

        <div className="relative z-10 flex flex-col justify-between h-full gap-6">
          <p
            className="font-heading font-bold text-[#FDFDFC] dark:text-[#0F0F0E] leading-[1.05]"
            style={{ fontSize: "clamp(1.3rem, 4vw, 2.8rem)" }}
          >
            Ready to build
            <br />
            <span className="text-white/40 dark:text-black/40">something worth</span>
            <br />
            remembering?
          </p>

          <div className="flex items-center justify-between gap-4">
            <span className="font-body text-sm text-white/30 dark:text-black/30 leading-relaxed">
              We reply within 24 hours.
            </span>
            <Btn size="sm">Start a Project</Btn>
          </div>
        </div>
      </m.div>
    </div>
  );
};