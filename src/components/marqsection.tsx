import { VelocityMarquee } from "./marquee";

export const MarqueeSection = () => {
  return (
    <section className=" bg-black/80 pb-2 md:mb-32 text-white overflow-hidden">
    
       <VelocityMarquee baseVelocity={-5}>
          <span className="text-9xl font-black uppercase tracking-tighter mr-10 opacity-70">
          
          </span>
        </VelocityMarquee>
      
      <div className="">
        <VelocityMarquee baseVelocity={3}>
           <span className="text-9xl font-black uppercase tracking-tighter mr-10 text-transparent stroke-white stroke-2" style={{ WebkitTextStroke: "2px white" }}>
             User Experience • Creative Direction •
           </span>
        </VelocityMarquee>
      </div>
      
    </section>
  );
};