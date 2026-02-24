import { useState, type ChangeEvent } from "react";
import type React from "react";
import { m, useInView } from "motion/react";
import { useRef } from "react";
import { DesktopContent } from "./contact/desktopContent";
import { MobileContent } from "./contact/mobileContent";

export interface FormState {
  name: string;
  email: string;
  message: string;
}

type MobileTab = "form" | "info";

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>("form");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise<void>((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section 
    id="contact"
    className="font-body min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <m.div
        ref={ref}
        className="relative w-full max-w-5xl"
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
      
        <div
          className="relative rounded-[2rem] overflow-hidden border border-black/10 dark:border-white/10"
          style={{
            background: "var(--card-bg)",
            backdropFilter: "blur(20px)",
            boxShadow: "var(--card-shadow)",
          }}
        >
         
          <style>{`
            :root {
              --card-bg: rgba(253,253,252,0.85);
              --card-shadow: 0 32px 80px rgba(30,26,28,0.14), inset 0 1px 0 rgba(255,255,255,0.9);
            }
            .dark {
              --card-bg: rgba(15,15,14,0.80);
              --card-shadow: 0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06);
            }
          `}</style>

         
          <div
            className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
            style={{ backgroundImage: GRAIN, backgroundRepeat: "repeat", backgroundSize: "128px 128px" }}
          />

         
          <div
            className="absolute pointer-events-none z-0"
            style={{
              width: "40%",
              height: "55%",
              borderRadius: "1.5rem",
              background: "rgba(30,26,28,0.035)",
              transform: "rotate(-18deg)",
              bottom: "-10%",
              left: "-5%",
            }}
          />

         
          <m.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.45) 50%, transparent 65%)",
              backgroundSize: "200% 100%",
            }}
            animate={isInView ? { backgroundPosition: ["200% 0", "-200% 0"] } : {}}
            transition={{ duration: 1.4, ease: "easeInOut", delay: 0.5, repeat: Infinity, repeatDelay: 5 }}
          />

          <div className="relative z-10">
            <div className="px-8 lg:px-12 pt-10">
            
              <m.div
                className="inline-block mb-4 px-3 py-1 rounded-full border 
                           bg-white/70 dark:bg-white/5
                           backdrop-blur-sm
                           text-[#1E1A1C]/50 dark:text-[#FDFDFC]/40
                           border-[#1E1A1C]/12 dark:border-[#FDFDFC]/10"
                style={{ fontSize: "0.68rem", letterSpacing: "0.1em" }}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                GET IN TOUCH
              </m.div>

           
              <m.h2
                className="font-heading text-[clamp(2rem,5vw,3rem)] font-extrabold leading-tight 
                           text-[#1E1A1C] dark:text-[#FDFDFC]"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                Let&apos;s{" "}
                <span className="text-[#1E1A1C]/25 dark:text-[#FDFDFC]/20">talk.</span>
              </m.h2>

             
              <m.p
                className="mt-2 text-base font-light leading-relaxed 
                           text-[#1E1A1C]/45 dark:text-[#FDFDFC]/40 max-w-md"
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.32 }}
              >
                Got a project in mind? I&apos;ll get back to you within 24 hours.
              </m.p>
            </div>

          
            <div className="lg:hidden flex mx-8 mb-5 rounded-xl bg-[#1E1A1C]/5 dark:bg-[#FDFDFC]/5 p-1">
              {(["form", "info"] as MobileTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMobileTab(tab)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200 font-heading tracking-wide uppercase
                    ${mobileTab === tab
                      ? "bg-[#1E1A1C] dark:bg-[#FDFDFC] text-[#FDFDFC] dark:text-[#0F0F0E] shadow-sm"
                      : "text-[#1E1A1C]/35 dark:text-[#FDFDFC]/35 hover:text-[#1E1A1C]/60 dark:hover:text-[#FDFDFC]/60"
                    }`}
                >
                  {tab === "form" ? "Message" : "Info"}
                </button>
              ))}
            </div>

          
            <MobileContent
              mobileTab={mobileTab}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              submitting={submitting}
              submitted={submitted}
              form={form}
            />

           
            <DesktopContent
              submitting={submitting}
              submitted={submitted}
              form={form}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </m.div>
    </section>
  );
};

export default ContactSection;