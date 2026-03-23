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
      className="min-h-svh pt-20 pb-20 grid place-items-center px-6 relative mt-24 overflow-hidden"
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

      <div className="w-full max-w-6xl text-center mx-auto flex flex-col items-center justify-center relative z-10">
       
        <h1
          className="font-heading font-bold tracking-tight leading-[1.1] text-[#0F0F0E] dark:text-[#FDFDFC] mb-6"
          style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)" }}
        >
          Designs that turn{" "}
          <br className="hidden md:block" />
          visitors into customers
        </h1>

        <m.p
          className="text-lg md:text-xl font-body text-gray-500 dark:text-[#A8A8A3] max-w-xl w-full leading-relaxed mb-10"
        >
          We build product interfaces and 3D visuals that earn attention, drive action, and make your brand worth remembering.
        </m.p>

        <m.div
          initial={false}
          animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <Btn>Start a Project</Btn>
        </m.div>
      </div>
    </section>
  );
};