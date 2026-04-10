import { m, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Plus } from "phosphor-react";
import { FAQ_ITEMS } from "@/faq.constant";

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark") || mq.matches);
    check();
    mq.addEventListener("change", check);
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      mq.removeEventListener("change", check);
      observer.disconnect();
    };
  }, []);
  return isDark;
}

const FAQItem = ({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isDark = useDarkMode();

  const openBg = isDark ? "#2A2520" : "#F5F0E8";
  const openShadow = isDark
    ? "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)"
    : "0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.85)";

  // Plus button
  const btnBg = isOpen
    ? isDark ? "#FDFDFC" : "#0F0F0E"
    : "transparent";
  const btnBorder = isOpen
    ? isDark ? "#FDFDFC" : "#0F0F0E"
    : isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
  const iconColor = isOpen
    ? isDark ? "#0F0F0E" : "#FDFDFC"
    : isDark ? "rgba(255,255,255,0.7)" : "#0F0F0E";

  return (
    <m.div
      ref={ref}
      className="relative overflow-hidden border border-black/10 dark:border-white/10"
      style={{
        borderRadius: "1.75rem",
        backgroundColor: isOpen ? openBg : "transparent",
        boxShadow: isOpen ? openShadow : "none",
        transition: "background-color 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
    >
      {isOpen && (
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]"
          style={{ backgroundImage: GRAIN, backgroundRepeat: "repeat", backgroundSize: "128px 128px" }}
        />
      )}

      <button
        onClick={onToggle}
        className="relative z-10 w-full flex items-center justify-between gap-4 px-5 md:px-10 py-5 md:py-7 text-left"
        aria-expanded={isOpen}
      >
        <span
          className="font-heading font-bold text-[#0F0F0E] dark:text-[#FDFDFC] leading-snug tracking-tight pr-2"
          style={{ fontSize: "clamp(1rem, 3.5vw, 1.5rem)" }}
        >
          {question}
        </span>
        <m.div
          className="w-10 h-10 rounded-full border flex items-center justify-center shrink-0"
          animate={{
            backgroundColor: btnBg,
            borderColor: btnBorder,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <m.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Plus size={16} weight="bold" color={iconColor} />
          </m.div>
        </m.div>
      </button>

      <m.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden relative z-10"
      >
        <p
          className="font-body text-[#0F0F0E]/60 dark:text-[#FDFDFC]/50 leading-relaxed px-5 md:px-10 pb-6 md:pb-8 max-w-3xl"
          style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.125rem)" }}
        >
          {answer}
        </p>
      </m.div>
    </m.div>
  );
};

export const FAQAccordion = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isDark = useDarkMode();

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const pillColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.5)";
  const pillBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.15)";
  const pillBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)";

  return (
    <section id="faq" className="bg-[#FAF7F6] dark:bg-[#0F0F0E] py-20 md:py-28 px-5 lg:px-20">
      <div ref={ref}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="flex flex-col gap-4">
            <m.div
              className="self-start px-3 py-1.5 rounded-full border backdrop-blur-sm font-body font-medium"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                color: pillColor,
                borderColor: pillBorder,
                backgroundColor: pillBg,
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              FAQ
            </m.div>
            <m.h2
              className="font-heading text-5xl md:text-6xl font-bold leading-tight text-[#0F0F0E] dark:text-[#FDFDFC]"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              Questions we get{" "}
              <span className="text-[#0F0F0E]/30 dark:text-[#FDFDFC]/30">asked a lot.</span>
            </m.h2>
          </div>

          <m.p
            className="font-body text-lg md:text-3xl text-[#0F0F0E]/50 dark:text-[#FDFDFC]/40 max-w-sm lg:text-right leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            Still have questions? Reach out and we will get back to you within 24 hours.
          </m.p>
        </div>

        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((faq, index) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};