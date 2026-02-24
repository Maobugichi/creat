import { m } from "motion/react";
import { lazy, Suspense, useState, useEffect } from "react";
import { Btn } from "@/components/btn";

const SphereBg = lazy(() => import('@/components/spherebg'));

export const Hero = () => {
  const [shouldLoad3d, setShouldLoad3d] = useState<boolean>(false);
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => setShouldLoad3d(true), { timeout: 2000 });
      return () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(() => setShouldLoad3d(true), 2000);
      return () => clearTimeout(id);
    }
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setShouldAnimate(true);
      });
    });
  }, []);

  return (
    <section
      id="hero"
      className="min-h-[90vh] md:min-h-[80vh] pt-32 pb-20 mt-24 grid place-items-center px-6 relative overflow-hidden"
    >
      <div className="absolute bg-[#FAF7F6] dark:bg-[#0F0F0E] inset-0 opacity-30 dark:opacity-40 pointer-events-none">
        {shouldLoad3d ? (
          <Suspense
            fallback={
              <div className="absolute inset-0 bg-linear-to-br from-zinc-100 via-zinc-200 to-white dark:from-zinc-900 dark:via-zinc-800 dark:to-black" />
            }
          >
            <SphereBg />
          </Suspense>
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-zinc-100 via-zinc-200 to-white dark:from-zinc-900 dark:via-zinc-800 dark:to-black" />
        )}
      </div>

      <div className="w-full max-w-6xl text-center mx-auto flex flex-col items-center justify-center gap-6 md:gap-10 relative z-10">

        <h1 className="text-6xl font-heading sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] font-bold text-[#0F0F0E] dark:text-[#FDFDFC]">
          Product and 3D <br className="hidden md:block" /> design studio
        </h1>

        <m.p
          initial={false}
          animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl font-body md:text-2xl text-gray-500 dark:text-[#A8A8A3] max-w-2xl w-full leading-relaxed"
        >
          Creating innovative products, and 3D designs that bring ideas to life.
          Our focus is on quality, creativity, and delivering exceptional visual
          experiences.
        </m.p>

        <m.div
          initial={false}
          animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mt-4"
        >
          <Btn>Get in Touch</Btn>
        </m.div>
      </div>
    </section>
  );
};