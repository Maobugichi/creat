import { motion , type Variants, type Transition } from "motion/react";

const letterTransition:Transition = {
    type:'spring',
    stiffness:250,
    damping:25
};


const containerVariants:Variants = {
    initial: {}, 
    hovered:{}
}

const letterVariants:Variants = {
    initial:{ y: 0}, 
    hovered: {y: '-100%'}
}

const wordWrapperVariant: Variants = {
    closed: {
        y:"-110%",
        opacity:0,
        transition: {
            duration:0.4,
            ease:'easeInOut'
        }
    },
    open: {
        y:0,
        opacity:1,
        transition: {
           duration: 0.6, 
            ease: [0.6, 0.01, -0.05, 0.95], 
            type: "spring",
            bounce: 0,
            stiffness: 150,
            damping: 25
        }
    },
    exit: {
        y: "-110%", 
        opacity: 0,
        transition: { duration: 0.4, ease: "easeInOut" }
    }
}

export const RollingText = ({word}:{ word:string}) => {
        return (
           <motion.div
            variants={wordWrapperVariant}
            className="relative block whitespace-nowrap cursor-pointer"
            style={{ lineHeight: 1}}
           >
                <motion.span
                initial='initial'
                whileHover='hovered'
                variants={containerVariants}
                className="relative block  overflow-hidden whitespace-nowrap cursor-pointer"
                style={{ lineHeight: 1 }}
                >

                    <div className="flex">
                        {
                            word.split("").map((char,i) => (
                                <span key={i} className="relative inline-block overflow-hidden">
                                <motion.a
                                variants={letterVariants}
                                transition={{...letterTransition, delay:i * 0.04}}
                                className="inline-block"
                                > 
                                    { char === " " ? "\u00A0" : char}
                                </motion.a>

                                <motion.a
                                    variants={letterVariants}
                                    transition={{...letterTransition, delay:i * 0.04}}
                                    className="absolute left-0 top-full inline-block silver-gradient"
                                    > 
                                        { char === " " ? "\u00A0" : char}
                                    </motion.a>
                                </span>
                            ))
                        }
                    </div>
                </motion.span>
            </motion.div>
        )
}