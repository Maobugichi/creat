import {
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

type FormState = {
  name: string;
  email:string
  message: string;
};

interface FocusInputProps {
  name: keyof FormState & string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  multiline?: boolean;
  required?: boolean;
  label: string;
  rows?: number;
}

export const FocusInput = ({
  multiline = false,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required,
  label,
  rows = 4,
}: FocusInputProps) => {
  const [focused, setFocused] = useState<boolean>(false);
  const filled = value.length > 0;

  const base =
    "w-full bg-white/60 backdrop-blur-sm border rounded-2xl px-5 pt-6 pb-3 font-body text-sm text-[#1E1A1C] outline-none transition-all duration-300 placeholder:text-transparent resize-none";

  const focusCls = focused
    ? "border-[#1E1A1C]/40 bg-white/90 shadow-[0_0_0_4px_rgba(30,26,28,0.06)]"
    : "border-[#1E1A1C]/12 hover:border-[#1E1A1C]/22";

  const sharedProps = {
    id: name,
    name,
    placeholder,
    value,
    required,
    onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };

  const labelCls = `absolute left-5 transition-all duration-200 pointer-events-none font-body select-none ${
    focused || filled
      ? "top-2.5 text-[10px] tracking-widest uppercase text-[#1E1A1C]/40"
      : "top-4 text-sm text-[#1E1A1C]/35"
  }`;

  return (
    <div className="relative">
      <label htmlFor={name} className={labelCls}>
        {label}
      </label>

      {multiline ? (
        <textarea
          {...(sharedProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          rows={rows}
          className={`${base} ${focusCls}`}
        />
      ) : (
        <input
          {...(sharedProps as InputHTMLAttributes<HTMLInputElement>)}
          type={type}
          className={`${base} ${focusCls}`}
        />
      )}
    </div>
  );
};