import { Btn } from "@/components/btn";
import { FocusInput } from "./inputForm";
import { InfoPanel } from "./infoPanel";
import type { FormState } from "../contact";



type FormSubmitHandler = React.ComponentProps<"form">["onSubmit"];

interface MobileContentProps {
    mobileTab:string;
    handleSubmit: FormSubmitHandler
    handleChange: (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;
    submitting:boolean;
    submitted:boolean
    form:FormState
}

export const MobileContent = ({
    mobileTab,
    handleSubmit,
    handleChange,
    submitting,
    submitted,
    form
}:MobileContentProps) => {
    return (
        <div className="lg:hidden px-8 pb-10">
            {mobileTab === "form" ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <FocusInput label="Your Name" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
                <FocusInput label="Email Address" name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
                <FocusInput label="Your Message" name="message" placeholder="Tell me about your project..." value={form.message} onChange={handleChange} multiline required />
                <Btn type="submit" disabled={submitting} className="w-full justify-center mt-1">
                {submitting ? "Sending…" : submitted ? "Sent ✓" : "Send Message"}
                </Btn>
            </form>
            ) : (
            <InfoPanel showIllustration />
            )}
        </div>
    )
}