import { motion } from "motion/react"

export const StaggerHeader = () => {
    return(
        <motion.h4 
        className="text-4xl font-heading sm:text-5xl md:text-6xl lg:text-8xl text-center font-bold leading-tight"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
            hidden: {},
            visible: {
            transition: {
                staggerChildren: 0.15
            }
            }
        }}
        >
        {["ready", "to", "level", "up"].map((word, i) => (
            <motion.span
            key={i}
            variants={{
                hidden: { y: -50, opacity: 0 },
                visible: { y: 0, opacity: 1 }
            }}
            className="inline-block mr-2 md:mr-4"
            >
            {word}
            </motion.span>
        ))}
        <br />
        {["your", "website?"].map((word, i) => (
            <motion.span
            key={i}
            variants={{
                hidden: { y: -50, opacity: 0 },
                visible: { y: 0, opacity: 1 }
            }}
            className="inline-block mr-2 md:mr-4"
            >
            {word}
            </motion.span>
        ))}
        </motion.h4>
    )
}