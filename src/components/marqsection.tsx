import { VelocityMarquee } from "./marquee";

export const MarqueeSection = () => {
  return (
    <section className=" bg-black/80 text-white overflow-hidden">
      <VelocityMarquee baseVelocity={-5}>
        <span className="text-9xl font-black uppercase tracking-tighter mr-10 opacity-70">
          User Experience • Creative Direction •
        </span>
      </VelocityMarquee>

      
      <div className="mt-5">
        <VelocityMarquee baseVelocity={3}>
           <span className="text-9xl font-black uppercase tracking-tighter mr-10 text-transparent stroke-white stroke-2" style={{ WebkitTextStroke: "2px white" }}>
             React • TypeScript • Framer Motion •
           </span>
        </VelocityMarquee>
      </div>
      
    </section>
  );
};