import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import trophy from "../../../assets/3dicons-trophy-iso-premium.png";
import heart from "../../../assets/3dicons-notify-heart-iso-premium.png";
import clock from "../../../assets/3dicons-clock-iso-premium.png";
import rocket from "../../../assets/3dicons-rocket-iso-premium.png";
import { Btn } from "@/components/btn";
import { useMediaQuery } from "react-responsive";


interface GridBlockProps {
  title: string;
  color: string;
  className?: string;
  targetNumber?: number;
  position?: { x: number; y: number };
  icon?: string;
  iconPosition?: { x: string; y: string };
  iconWidth: string;
  showBtn?: boolean;
  btnPosition?: 'left' | 'right';
}

const GridBlock = ({ 
  title, 
  color, 
  className = "", 
  targetNumber, 
  position = { x: 50, y: 50 }, 
  icon, 
  iconPosition = { x: '50%', y: '20%' }, 
  iconWidth,
  showBtn = false,
  btnPosition = 'left'
}: GridBlockProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
  });

  const displayValue = useTransform(springValue, (latest) => 
    Math.round(latest)
  );

  

  useEffect(() => {
    if (isInView && targetNumber) {
      motionValue.set(targetNumber);
    }
  }, [isInView, motionValue, targetNumber]);

  return (
    <div 
      ref={ref}
      className={`p-10 rounded-3xl relative font-bold shadow-lg ${color} ${className} overflow-hidden min-h-[200px] flex items-end ${btnPosition === 'right' ? 'justify-end' : 'justify-start'} border border-gray-200`}
    >
    
      {icon && (
        <motion.img
          src={icon}
          alt=""
          className={`absolute ${iconWidth} pointer-events-none z-0`}
          style={{
            left: iconPosition.x,
            top: iconPosition.y,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      )}

      {targetNumber ? (
        <>
          <div 
            className="absolute flex flex-col  max-w-[80%] z-10"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.span className="font-heading text-5xl md:text-7xl mb-3 font-extrabold text-gray-800">
              {displayValue}
            </motion.span>
            <span className="font-body text-sm md:text-lg font-light text-gray-700 whitespace-nowrap text-center">{title}</span>
          </div>
        </>
      ) : (
        <div 
          className="absolute flex items-center justify-center text-xl md:text-2xl max-w-[80%] z-10 text-gray-800 font-semibold"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {title}
        </div>
      )}

      {showBtn && (
        <Btn>
          Check us
        </Btn>
      )}
      
    </div>
  );
};

export const FeatureGrid = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const getPos = <T,>(mobile: T, tablet: T, desktop: T): T => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };
  return (
    <div className="w-full md:h-[80vh] lg:h-[150vh] max-w-6xl mx-auto px-6 py-20">
      <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 auto-rows-fr gap-6">
        
       
        <GridBlock 
          title="Projects Completed" 
          className="lg:col-span-2 row-span-2 lg:row-span-1"
          color="bg-purple-100/40"
          targetNumber={150}
          position={getPos({ x: 70, y: 75 }, { x: 60, y: 75 }, { x: 70, y: 75 })}
          icon={trophy}
          iconPosition={{ x: '2%', y: '10%' }}
          iconWidth="w-32 h-32 md:w-32 md:h-32 lg:w-62 lg:h-62"
          showBtn={false}
        />

       
        <GridBlock 
          title="Happy Clients" 
          color="bg-pink-100/40" 
          className="lg:col-span-3 row-span-3 lg:row-span-1"
          targetNumber={200}
          position={{ x: 70, y: 50 }}
          icon={heart}
          iconPosition={{ x: '4%', y: '4%' }}
          iconWidth="w-32 h-32 md:w-32 md:h-32 lg:w-72 lg:h-72"
          showBtn={true}
          btnPosition="right"
        />

      
        <GridBlock 
          title="Years Experience" 
          color="bg-blue-100/40" 
          className="lg:col-span-3 row-span-3 lg:row-span-1"
          targetNumber={8}
          position={getPos({ x: 35, y: 50 }, { x: 40, y: 50 }, { x: 20, y: 50 })}
          icon={clock}
          iconPosition={{ x: '55%', y: '5%' }}
          iconWidth="w-32 h-32 md:w-32 md:h-32 lg:w-72 lg:h-72"
          showBtn={true}
          btnPosition="left"
        />

       
        <GridBlock 
          title="Team Members" 
          className="lg:col-span-2 row-span-2 lg:row-span-1"
          color="bg-orange-100/40"
          targetNumber={25}
          position={{ x: 28, y: 75 }}
          icon={rocket}
          iconPosition={getPos({ x: '55%', y: '25%' }, { x: '45%', y: '15%' }, { x: '40%', y: '5%' })}
          iconWidth="w-32 h-32 md:w-32 md:h-32 lg:w-62 lg:h-62"
          showBtn={false}
        />
        
      </div>
    </div>
  );
};