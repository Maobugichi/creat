import { ArrowUpRight } from "phosphor-react"
import { testimonials } from "./constants"
import { m } from "motion/react";

interface TabListProps {
    dividerColor:string;
    goTo:(i:number) => void, 
    current:number;
    rowActiveBg:string;
    dotActive:string;
    dotInactive:string;
    textPrimary:string,
    textSecondary:string;
    textTertiary:string;
    isDark:boolean
}

export const TabList = ({
    dividerColor,
    goTo, 
    current, 
    rowActiveBg,
    dotActive,
    dotInactive,
    textPrimary,
    textSecondary,
    textTertiary,
    isDark}:TabListProps) => {
    return(
        <div
            className="relative z-10"
            style={{ borderTop: `1px solid ${dividerColor}` }}
          >
            <div className="flex flex-col md:flex-row">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => goTo(i)}
                  className="flex items-center justify-between gap-3 px-7 py-4 md:flex-1 md:px-6 md:py-5 transition-all duration-300 group"
                  style={{
                    borderBottom: i < testimonials.length - 1 ? `1px solid ${dividerColor}` : "none",
                    borderRight: "none",
                    backgroundColor: i === current ? rowActiveBg : "transparent",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300"
                      style={{ backgroundColor: i === current ? dotActive : dotInactive }}
                    />
                    <div className="flex flex-col gap-0 text-left">
                      <span
                        className="font-heading text-sm font-bold transition-colors"
                        style={{ color: i === current ? textPrimary : textSecondary }}
                      >
                        {t.name}
                      </span>
                      <span
                        className="font-body text-xs"
                        style={{ color: textTertiary }}
                      >
                        {t.role}
                      </span>
                    </div>
                  </div>
                  <m.div
                    animate={{ rotate: i === current ? 0 : -45 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ opacity: i === current ? 0.6 : 0.3 }}
                  >
                    <ArrowUpRight
                      size={14}
                      weight="bold"
                      color={isDark ? "#FDFDFC" : "#0F0F0E"}
                    />
                  </m.div>
                </button>
              ))}
            </div>
          </div>
    )
}