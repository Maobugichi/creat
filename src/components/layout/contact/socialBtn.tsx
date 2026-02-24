import type { ReactNode } from "react";

interface SocialButtonProps {
  href?: string;
  label: string;
  children: ReactNode;
}



export const SocialButton = ({ href = "#", label, children }: SocialButtonProps) => {
  return (
    <a className="flex font-heading items-center gap-2 border-2 border-black px-6 md:px-7  bg-white tracking-wide rounded-full text-black backdrop-blur-md font-semibold py-3" href={href} aria-label={label} >
      <svg
        viewBox="0 0 24 24"
        width={18}
        height={18}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-current"
      >
        {children}
      </svg>
    </a>
  );
}
