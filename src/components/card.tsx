import { motion, useTransform, MotionValue } from "framer-motion";

interface CardProps {
  i: number;
  title: string;
  description: string;
  color: string;
  icon: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card = ({ i, title, description, color, icon, progress, range, targetScale }: CardProps) => {

  const scale = useTransform(progress, range, [1, targetScale]);
  
  const cardEntryY = useTransform(progress, [range[0] - 0.1, range[0]], [50, 0]);
  const cardOpacity = useTransform(progress, [range[0] - 0.1, range[0]], [0, 1]);

  return (
    <div className="h-[70vh]  md:h-screen flex items-center justify-center sticky top-[15vh] md:top-0">
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          y: cardEntryY,
          opacity: cardOpacity,
          top: `calc(-2vh + ${i * 25}px)`, 
          zIndex: i, 
        }}
        className="relative h-100 w-full md:w-[90%] max-w-175 rounded-3xl p-10 shadow-2xl origin-top border border-gray-200 overflow-hidden"
      >
      
        <motion.img
          src={icon}
          alt=""
          className="absolute w-48 h-48 md:w-96 md:h-96 pointer-events-none z-0 opacity-80"
          style={{
            right: '-5%',
            top: '40%',
            transform: 'translateY(-50%)',
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gray-800">{title}</h2>
          <p className="text-lg md:text-xl text-gray-700 font-body max-w-md">{description}</p>
        </div>
        
        <div className="absolute bottom-10 font-heading left-10 text-6xl md:text-7xl font-black opacity-10 text-gray-800">
          0{i + 1}
        </div>
      </motion.div>
    </div>
  );
};