import { useState, type ChangeEvent } from "react";
import type React from "react";
import { m, useInView } from "motion/react";
import { useRef } from "react";
import { FocusInput } from "./contact/inputForm";
import { InfoPanel } from "./contact/infoPanel";
import { Btn } from "@/components/btn";

export interface FormState {
  name: string;
  email: string;
  message: string;
}

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
      className="font-body bg-[#FAF7F6] dark:bg-[#0F0F0E] py-20 md:py-28 px-5 lg:px-20"
    >
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
              GET IN TOUCH
            </m.div>
            <m.h2
              className="font-heading text-5xl md:text-6xl font-bold leading-tight text-[#0F0F0E] dark:text-[#FDFDFC]"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              Let&apos;s build{" "}
              <span className="text-[#0F0F0E]/30 dark:text-[#FDFDFC]/30">something great.</span>
            </m.h2>
          </div>

          <m.p
            className="font-body text-lg md:text-3xl text-[#0F0F0E]/50 dark:text-[#FDFDFC]/40 max-w-sm lg:text-right leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            Tell us about your project and we will get back to you within 24 hours.
          </m.p>
        </div>

        <m.div
          className="relative overflow-hidden border border-black/10 dark:border-white/10"
          style={{
            borderRadius: "1.75rem",
            backgroundColor: "#F5F0E8",
            boxShadow: "0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.85)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
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
            animate={isInView ? { backgroundPosition: ["200% 0", "-200% 0"] } : {}}
            transition={{ duration: 1.4, ease: "easeInOut", delay: 0.5, repeat: Infinity, repeatDelay: 5 }}
          />

          <div className="relative z-10 p-8 lg:p-14 flex flex-col lg:flex-row lg:gap-16">
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FocusInput
                  label="Your Name"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <FocusInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <FocusInput
                label="Your Message"
                name="message"
                placeholder="Tell us about your project..."
                value={form.message}
                onChange={handleChange}
                multiline
                rows={5}
                required
              />

              <div className="flex items-center gap-4">
                <Btn type="submit" disabled={submitting}>
                  {submitting ? "Sending..." : submitted ? "Project Started" : "Start a Project"}
                </Btn>
                {submitted && (
                  <m.span
                    className="text-sm text-[#0F0F0E]/50 dark:text-[#FDFDFC]/40"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    We will be in touch soon.
                  </m.span>
                )}
              </div>
            </form>

            <div className="hidden lg:flex flex-col justify-between w-72 shrink-0 border-l border-black/10 pl-14">
              <InfoPanel />
            </div>
          </div>

          <div className="lg:hidden relative z-10 border-t border-black/10 p-8">
            <InfoPanel />
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default ContactSection;