import type { ReactNode } from "react";

interface InfoRowProps {
  icon: ReactNode;
  text: string;
  sub?: string;
}

export const InfoRow = ({ icon, text, sub }: InfoRowProps) => {
  return (
    <div className="flex items-start gap-3.5">
      <div className="mt-0.5 flex items-center justify-center w-9 h-9 rounded-xl bg-[#1E1A1C]/6 dark:bg-[#FDFDFC]/6 shrink-0">
        <svg
          viewBox="0 0 24 24"
          width={14}
          height={14}
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-[#1E1A1C]/50 dark:stroke-[#FDFDFC]/50"
        >
          {icon}
        </svg>
      </div>
      <div>
        {sub && (
          <p className="text-[10px] tracking-widest uppercase text-[#1E1A1C]/35 dark:text-[#FDFDFC]/35 mb-0.5">
            {sub}
          </p>
        )}
        <p className="text-sm text-[#1E1A1C]/65 dark:text-[#FDFDFC]/60 leading-snug">
          {text}
        </p>
      </div>
    </div>
  );
};