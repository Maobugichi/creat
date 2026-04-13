import { m, useInView } from "motion/react";
import { useRef } from "react";
import { Btn } from "@/components/btn";
import { services } from "./constant";
import { useDarkMode } from "@/hooks/themes";
import { ServiceCard } from "./card";

export const Services = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const isDark = useDarkMode();

  return (
    <section id="services" className="bg-[#FAF7F6] dark:bg-[#0F0F0E] py-20 md:py-28 px-5 lg:px-20">
      <div ref={ref}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="flex flex-col gap-4">
            <m.div
              className="self-start px-3 py-1.5 rounded-full border backdrop-blur-sm font-body font-medium"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.5)",
                borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.15)",
                backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)",
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              WHAT WE OFFER
            </m.div>
            <m.h2
              className="font-heading text-5xl md:text-6xl font-bold leading-tight text-[#0F0F0E] dark:text-[#FDFDFC]"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              Built for brands that{" "}
              <span className="text-[#0F0F0E]/30 dark:text-[#FDFDFC]/30">refuse to blend in.</span>
            </m.h2>
          </div>

          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="shrink-0"
          >
            <Btn>Start a Project</Btn>
          </m.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <ServiceCard key={service.number} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};