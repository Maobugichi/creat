import type { FormEvent, ChangeEvent } from "react";
import { Btn } from "@/components/btn";
import { FocusInput } from "./inputForm";
import { InfoPanel } from "./infoPanel";
import { EnvelopeIllustration } from "./envelop";

type FormState = {
  name: string;
  email: string;
  message: string;
};

interface DesktopContentProps {
  submitting: boolean;
  submitted: boolean;
  form: FormState;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const DesktopContent = ({
  submitting,
  submitted,
  form,
  handleChange,
  handleSubmit,
}: DesktopContentProps) => {
  return (
    <div className="hidden lg:grid grid-cols-5  gap-0 px-12 pb-12 ">
      <form
        onSubmit={handleSubmit}
        className="col-span-3 self-end  flex flex-col  gap-6 pr-10 border-r border-[#1E1A1C]/8"
      >
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

        <FocusInput
          label="Your Message"
          name="message"
          placeholder="Tell me about your project..."
          value={form.message}
          onChange={handleChange}
          multiline
          required
        />

        <Btn
          type="submit"
          className="w-1/2"
          disabled={submitting}
        >
          {submitting
            ? "Sending…"
            : submitted
            ? "Message Sent ✓"
            : "Send Message"}
        </Btn>
      </form>

      <div className="col-span-2  md:pl-8 flex flex-col justify-between  space-y-20">
        <div className="flex justify-center mb-8">
          <EnvelopeIllustration size={150} />
        </div>
        <InfoPanel />
      </div>
    </div>
  );
};

