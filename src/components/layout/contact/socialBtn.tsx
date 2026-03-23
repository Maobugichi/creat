import type { ReactNode } from "react";

interface SocialButtonProps {
  href?: string;
  label: string;
  children: ReactNode;
}

export const SocialButton = ({ href = "#", label, children }: SocialButtonProps) => {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex items-center justify-center border border-black/15 dark:border-white/15 bg-white/70 dark:bg-white/5 backdrop-blur-sm rounded-full transition-all duration-200 hover:bg-[#0F0F0E] hover:border-[#0F0F0E] group"
      style={{ width: "2.5rem", height: "2.5rem" }}
    >
      <svg
        viewBox="0 0 24 24"
        width={15}
        height={15}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-[#0F0F0E] dark:stroke-[#FDFDFC] group-hover:stroke-[#FDFDFC] transition-colors"
      >
        {children}
      </svg>
    </a>
  );
};