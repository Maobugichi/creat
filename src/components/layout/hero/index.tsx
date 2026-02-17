import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, Suspense, useState, useEffect } from "react";
import { Btn } from "@/components/btn";
import { SphereBg } from "@/components/spherebg";




export const Hero = () => {
  const containerRef = useRef(null);
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);

 
  useEffect(() => {
   
    const timer = setTimeout(() => {
      setShouldLoadSpline(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Scroll-linked fade out logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);

  // Entrance animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const},
    },
  };

  return (
    <motion.section
      id="hero"
      ref={containerRef}
      style={{ opacity, scale }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-[90vh] md:min-h-[80vh] pt-32 pb-20 mt-24 grid place-items-center px-6 relative overflow-hidden"
    >
     
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {shouldLoadSpline ?
       
        <Suspense 
          fallback={
            <div className="absolute inset-0 bg-linear-to-br from-zinc-900 via-zinc-800 to-black animate-pulse" />
          }
        >
          <SphereBg />
        </Suspense>  : <div className="absolute inset-0 bg-linear-to-br from-zinc-900 via-zinc-800 to-black" />}
      </div>

     
     
      <div className="w-full max-w-6xl text-center mx-auto flex flex-col items-center justify-center gap-6 md:gap-10 relative z-10">
        
        <motion.h1 
          variants={itemVariants}
          className="text-6xl font-heading sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] font-bold"
        >
          Product and 3D <br className="hidden md:block" /> design studio
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-xl font-body md:text-xl text-gray-400 max-w-2xl w-full leading-relaxed"
        >
          Creating innovative products, and 3D designs that bring ideas to life. 
          Our focus is on quality, creativity, and delivering exceptional visual experiences.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-4">
          <Btn>
            Get in Touch
          </Btn>
        </motion.div>
      </div>
    </motion.section>
  );
};