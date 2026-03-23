import { m, useInView } from "motion/react";
import { useRef } from "react";
import { Btn } from "@/components/btn";

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

export const CTABand = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="bg-[#FAF7F6] dark:bg-[#0F0F0E] py-10 md:py-14 px-5 lg:px-20">
      <m.div
        ref={ref}
        className="relative overflow-hidden bg-[#0F0F0E] dark:bg-[#FDFDFC] rounded-[2rem] px-10 md:px-16 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8"
        style={{
          boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
          style={{ backgroundImage: GRAIN, backgroundRepeat: "repeat", backgroundSize: "128px 128px" }}
        />

        <m.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.12) 50%, transparent 65%)",
            backgroundSize: "200% 100%",
          }}
          animate={isInView ? { backgroundPosition: ["200% 0", "-200% 0"] } : { backgroundPosition: "200% 0" }}
          transition={{ duration: 1.4, ease: "easeInOut", delay: 0.5, repeat: Infinity, repeatDelay: 4 }}
        />

        <span
          className="absolute pointer-events-none select-none font-heading font-black text-white/[0.03] dark:text-black/[0.03] leading-none"
          style={{ fontSize: "clamp(6rem, 20vw, 16rem)", right: "-0.05em", bottom: "-0.2em", letterSpacing: "-0.04em" }}
        >
          GO
        </span>

        <div className="relative z-10 flex flex-col gap-4 max-w-xl">
          <m.div
            className="self-start px-3 py-1.5 rounded-full border font-body font-medium"
            style={{ fontSize: "0.7rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.15)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            NEXT STEPS
          </m.div>
          <m.h2
            className="font-heading font-bold text-[#FDFDFC] dark:text-[#0F0F0E] leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            Your next project deserves{" "}
            <span className="text-[#FDFDFC]/30 dark:text-[#0F0F0E]/30">better than average.</span>
          </m.h2>
        </div>

        <m.div
          className="relative z-10 shrink-0"
          initial={{ opacity: 0, x: 16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <Btn>Start a Project</Btn>
        </m.div>
      </m.div>
    </section>
  );
};