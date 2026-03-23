import { m, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Btn } from "@/components/btn";
import { ArrowUpRight } from "phosphor-react";

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

const services = [
  {
    number: "01",
    title: "Product Design",
    description: "End-to-end interface design from wireframes to polished UI. We build systems that scale, not one-off screens.",
    tags: ["UX Research", "UI Design", "Design Systems", "Prototyping"],
    color: "#F5F0E8",
    accentColor: "rgba(180,150,100,0.9)",
    glowColor: "rgba(210,190,150,0.4)",
  },
  {
    number: "02",
    title: "3D & Motion",
    description: "High-fidelity 3D assets and motion design that make your brand impossible to scroll past.",
    tags: ["3D Modelling", "Animation", "WebGL", "Lottie"],
    color: "#E8F0EC",
    accentColor: "rgba(60,140,90,0.9)",
    glowColor: "rgba(120,190,150,0.4)",
  },
  {
    number: "03",
    title: "Web Development",
    description: "Pixel-precise frontend development. Fast, accessible, and built to convert from day one.",
    tags: ["React", "TypeScript", "Framer Motion", "Three.js"],
    color: "#E8ECF5",
    accentColor: "rgba(80,100,190,0.9)",
    glowColor: "rgba(120,140,210,0.4)",
  },
  {
    number: "04",
    title: "Brand Identity",
    description: "Visual identities that hold up at every size and in every context, from favicon to billboard.",
    tags: ["Logo Design", "Typography", "Colour Systems", "Brand Guidelines"],
    color: "#F5EBE8",
    accentColor: "rgba(190,80,60,0.9)",
    glowColor: "rgba(210,130,110,0.4)",
  },
];

const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [hovered, setHovered] = useState(false);

  return (
    <m.div
      ref={ref}
      className="relative overflow-hidden flex flex-col border cursor-pointer"
      style={{
        backgroundColor: service.color,
        borderRadius: "1.75rem",
        borderColor: "rgba(255,255,255,0.75)",
        minHeight: "360px",
        boxShadow: hovered
          ? `0 20px 60px -10px ${service.glowColor}, 0 4px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)`
          : "0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.85)",
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
          color: service.accentColor,
          opacity: 0.06,
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
              color: service.accentColor,
              backgroundColor: "rgba(255,255,255,0.6)",
              border: `1px solid ${service.accentColor}`,
              opacity: 0.85,
            }}
          >
            {service.number}
          </span>

          <m.div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.6)", border: `1px solid rgba(0,0,0,0.1)` }}
            animate={{
              backgroundColor: hovered ? "#0F0F0E" : "rgba(255,255,255,0.6)",
              borderColor: hovered ? "#0F0F0E" : "rgba(0,0,0,0.1)",
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
                color={hovered ? "#FDFDFC" : "#0F0F0E"}
              />
            </m.div>
          </m.div>
        </div>

        <div className="flex flex-col gap-3 flex-1">
          <h3
            className="font-heading font-bold text-[#0F0F0E] leading-tight"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", letterSpacing: "-0.02em" }}
          >
            {service.title}
          </h3>
          <p className="font-body text-base text-gray-500 leading-relaxed">
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
                color: service.accentColor,
                backgroundColor: "rgba(255,255,255,0.7)",
                border: `1px solid ${service.accentColor}`,
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

export const Services = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="services" className="bg-[#FAF7F6] dark:bg-[#0F0F0E] py-20 md:py-28 px-5 lg:px-20">
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