import { m, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import trophy from "../../../assets/3dicons-trophy-dynamic-color-optimized.avif";
import heart from "../../../assets/3dicons-notify-heart-dynamic-color-optimized.avif";
import clock from "../../../assets/3dicons-clock-dynamic-color-optimized.avif";
import rocket from "../../../assets/3dicons-rocket-dynamic-color-optimized.avif";
import { Btn } from "@/components/btn";
import { useBreakpoints } from "@/hooks/useBreakpoint";

interface GridBlockProps {
  title: string;
  color: string;
  glowColor: string;
  className?: string;
  targetNumber?: number;
  numberSuffix?: string;
  contextText?: string;
  position?: { x: number; y: number };
  icon?: string;
  iconPosition?: { x: string; y: string };
  iconWidth: string;
  showBtn?: boolean;
  btnPosition?: "left" | "right";
  delay?: number;
  accentColor?: string;
}



const GridBlock = ({
  title,
  color,
  glowColor,
  className = "",
  targetNumber,
  numberSuffix = "+",
  contextText,
  position = { x: 50, y: 50 },
  icon,
  iconPosition = { x: "50%", y: "20%" },
  iconWidth,
  showBtn = false,
  btnPosition = "left",
  delay = 0,
  accentColor = "rgba(0,0,0,0.06)",
}: GridBlockProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const iconX = useTransform(mouseX, [-1, 1], [-8, 8]);
  const iconY = useTransform(mouseY, [-1, 1], [-8, 8]);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 55, damping: 12 });
  const displayValue = useTransform(springValue, (latest) => Math.round(latest));

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isInView && targetNumber) {
      motionValue.set(targetNumber);
    }
  }, [isInView, motionValue, targetNumber]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 2);
    mouseY.set(y * 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const positionStyle = {
    left: `${position.x}%`,
    top: `${position.y}%`,
    transform: "translate(-50%, -50%)",
  };

  const iconStyle = {
    left: iconPosition.x,
    top: iconPosition.y,
  };

  return (
    <m.div
      ref={ref}
      className={`relative font-bold overflow-hidden flex items-end border ${
        btnPosition === "right" ? "justify-end" : "justify-start"
      } ${color} ${className}`}
      style={{
        padding: "2.5rem",
        borderRadius: "1.75rem",
        minHeight: "12rem",
        borderColor: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(12px)",
        boxShadow: isHovered
          ? `0 20px 60px -10px ${glowColor}, 0 4px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)`
          : `0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.85)`,
        transition: "box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
    
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Periodic shimmer sweep */}
      <m.div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%)",
          backgroundSize: "200% 100%",
        }}
        animate={
          isInView
            ? { backgroundPosition: ["200% 0", "-200% 0"] }
            : { backgroundPosition: "200% 0" }
        }
        transition={{
          duration: 1.2,
          ease: "easeInOut" as const,
          delay: delay + 0.45,
          repeat: Infinity,
          repeatDelay: 3.5,
        }}
      />

      {/* Accent shape */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: "60%",
          height: "60%",
          borderRadius: "1rem",
          background: accentColor,
          transform: "rotate(-18deg) translate(-10%, 30%)",
          bottom: 0,
          left: 0,
        }}
      />

      {/* Ghost watermark number */}
      {targetNumber && (
        <m.span
          className="absolute select-none pointer-events-none z-0 font-extrabold"
          style={{
            fontSize: "clamp(6rem, 14vw, 11rem)",
            lineHeight: 1,
            color: "rgba(0,0,0,0.04)",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            letterSpacing: "-0.04em",
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: delay + 0.3 }}
        >
          {targetNumber}
        </m.span>
      )}

      {/* Floating icon with parallax */}
      {icon && (
        <m.div
          className={`absolute pointer-events-none z-0 ${iconWidth}`}
          style={{ ...iconStyle, x: iconX, y: iconY }}
          initial={{ scale: 0.5, opacity: 0, x: "-50%", y: "-50%" }}
          animate={
            isInView
              ? { scale: 1, opacity: 1, x: "-50%", y: "-50%" }
              : { scale: 0.5, opacity: 0, x: "-50%", y: "-50%" }
          }
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: delay + 0.1 }}
        >
          <m.img
            src={icon}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-contain drop-shadow-xl"
            style={{ opacity: 0.72, mixBlendMode: "luminosity" as React.CSSProperties["mixBlendMode"] }}
          />
          {/* Soft radial wash — calms icon colour without killing the 3D feel */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 55% 40%, rgba(255,255,255,0.22) 0%, transparent 70%)",
              mixBlendMode: "screen" as React.CSSProperties["mixBlendMode"],
            }}
          />
        </m.div>
      )}

      {/* Counter + label + context */}
      {targetNumber ? (
        <div className="absolute flex flex-col z-10" style={positionStyle}>

          {/* Context pill — always visible */}
          {contextText && (
            <m.span
              className="self-start mb-2.5 px-2.5 py-1 rounded-full font-medium border bg-white/70 backdrop-blur-sm whitespace-nowrap"
              style={{
                fontSize: "clamp(0.6rem, 1vw, 0.72rem)",
                letterSpacing: "0.05em",
                color: "rgba(0,0,0,0.62)",
                borderColor: "rgba(0,0,0,0.18)",
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: delay + 0.55 }}
            >
              {contextText}
            </m.span>
          )}

          <div className="flex items-end gap-0.5 leading-none mb-2">
            <m.span
              className="font-extrabold text-gray-800 leading-none"
              style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", letterSpacing: "-0.04em" }}
            >
              {displayValue}
            </m.span>
            <span
              className="font-extrabold text-gray-400 leading-none pb-1"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}
            >
              {numberSuffix}
            </span>
          </div>

          <span
            className="font-light text-gray-500 tracking-widest uppercase whitespace-nowrap"
            style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)", letterSpacing: "0.15em" }}
          >
            {title}
          </span>
        </div>
      ) : (
        <div
          className="absolute flex items-center justify-center z-10 text-gray-800 font-semibold text-xl md:text-2xl max-w-[80%] text-center"
          style={positionStyle}
        >
          {title}
        </div>
      )}

      {showBtn && (
        <div className="relative z-10">
          <Btn>Check us</Btn>
        </div>
      )}
    </m.div>
  );
};

export const FeatureGrid = () => {
  const { isMobile, isTablet } = useBreakpoints();

  const getPos = <T,>(mobile: T, tablet: T, desktop: T): T => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  return (
    <div className="w-full h-[200vh] md:h-[80vh] lg:h-[150vh] max-w-6xl mx-auto px-6 py-20">
      <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 auto-rows-fr gap-5">

        <GridBlock
          title="Projects Completed"
          className="lg:col-span-2 row-span-2 lg:row-span-1"
          color="bg-[#F5F0E8]/60"
          glowColor="rgba(210,190,150,0.35)"
          accentColor="rgba(200,170,110,0.08)"
          targetNumber={150}
          numberSuffix="+"
          contextText="Across 18 industries"
          delay={0}
          position={getPos({ x: 70, y: 75 }, { x: 60, y: 75 }, { x: 70, y: 75 })}
          icon={trophy}
          iconPosition={getPos({ x: '28%', y: '38%' }, { x: '20%', y: '30%' }, { x: '-25%', y: '-10%' })}
          iconWidth="w-52 h-52 md:w-42 md:h-42 lg:w-80 lg:h-80"
          showBtn={false}
        />

        <GridBlock
          title="Happy Clients"
          color="bg-[#E8F0EC]/60"
          glowColor="rgba(120,190,150,0.35)"
          accentColor="rgba(100,180,130,0.08)"
          className="lg:col-span-3 row-span-3 lg:row-span-1"
          targetNumber={200}
          numberSuffix="+"
          contextText="Across 12 countries"
          delay={0.1}
          position={getPos({ x: 65, y: 65 }, { x: 60, y: 55 }, { x: 70, y: 50 })}
          icon={heart}
          iconPosition={getPos({ x: '25%', y: '30%' }, { x: '28%', y: '25%' }, { x: '-15%', y: '26%' })}
          iconWidth="w-60 h-60 md:w-42 md:h-42 lg:w-80 lg:h-80"
          showBtn={true}
          btnPosition="right"
        />

        <GridBlock
          title="Years Experience"
          color="bg-[#E8ECF5]/60"
          glowColor="rgba(120,140,210,0.35)"
          accentColor="rgba(100,120,200,0.07)"
          className="lg:col-span-3 row-span-3 lg:row-span-1"
          targetNumber={8}
          numberSuffix="yrs"
          contextText="Since 2016"
          delay={0.2}
          position={getPos({ x: 35, y: 65 }, { x: 40, y: 55 }, { x: 20, y: 50 })}
          icon={clock}
          iconPosition={getPos({ x: '72%', y: '35%' }, { x: '68%', y: '28%' }, { x: '65%', y: '30%' })}
          iconWidth="w-60 h-60 md:w-42 md:h-42 lg:w-80 lg:h-80"
          showBtn={true}
          btnPosition="left"
        />

        <GridBlock
          title="Team Members"
          className="lg:col-span-2 row-span-2 lg:row-span-1"
          color="bg-[#F5EBE8]/60"
          glowColor="rgba(210,130,110,0.35)"
          accentColor="rgba(210,120,100,0.07)"
          targetNumber={25}
          numberSuffix="+"
          contextText="& growing fast"
          delay={0.3}
          position={{ x: 28, y: 75 }}
          icon={rocket}
          iconPosition={getPos({ x: "68%", y: "32%" }, { x: "65%", y: "28%" }, { x: "45%", y: "25%" })}
          iconWidth="w-60 h-60 md:w-42 md:h-42 lg:w-72 lg:h-72"
          showBtn={false}
        />

      </div>
    </div>
  );
};