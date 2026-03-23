import { m, useTransform, type MotionValue } from "motion/react";

interface StepProps {
  label: string;
  i: number;
  stepStart: number;
  stepEnd: number;
  progress: MotionValue<number>;
}

const Step = ({ label, i, stepStart, stepEnd, progress }: StepProps) => {
  const opacity      = useTransform(progress, [stepStart, stepStart + 0.01, stepEnd - 0.01, stepEnd], [0.25, 1, 1, 0.25]);
  const lineScale    = useTransform(progress, [stepStart, stepEnd], [0, 1]);
  const labelX       = useTransform(progress, [stepStart, stepStart + 0.05], [-6, 0]);
  const labelOpacity = useTransform(progress, [stepStart, stepStart + 0.05], [0, 1]);

  return (
    <m.div style={{ opacity }} className="flex items-start gap-5 flex-1 min-h-0">
      <div className="flex flex-col items-center h-full">
        <div className="relative w-px bg-black/10 dark:bg-white/10 flex-1">
          <m.div
            className="absolute top-0 left-0 w-full bg-[#0F0F0E] dark:bg-[#FDFDFC] origin-top"
            style={{ scaleY: lineScale, height: "100%" }}
          />
        </div>
      </div>
      <div className="pt-1">
        <span className="block font-heading text-sm tracking-widest text-black/40 dark:text-white/40 mb-2 uppercase">
          0{i + 1}
        </span>
        <m.span
          style={{ x: labelX, opacity: labelOpacity }}
          className="block font-heading text-4xl md:text-5xl font-bold text-[#0F0F0E] dark:text-[#FDFDFC]"
        >
          {label}
        </m.span>
      </div>
    </m.div>
  );
};

interface StepIndicatorProps {
  steps: string[];
  progress: MotionValue<number>;
  totalCards: number;
}

export const StepIndicator = ({ steps, progress, totalCards }: StepIndicatorProps) => {
  const stepSize = 1 / totalCards;

  return (
    <div className="flex flex-col gap-8" style={{ height: "calc(100vh - 20vh)" }}>
      {steps.map((label, i) => (
        <Step
          key={label}
          label={label}
          i={i}
          stepStart={i * stepSize}
          stepEnd={i * stepSize + stepSize}
          progress={progress}
        />
      ))}
    </div>
  );
};