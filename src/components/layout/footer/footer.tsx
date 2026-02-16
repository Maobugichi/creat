import { Btn } from "../../btn"
import { StaggerHeader } from "./staggerHeader";

export const Footer = () => {
    const items = [ 'FAQS', 'privacy policy', 'terms of service'];
    return (
        <footer className="font-body grid place-items-center min-h-screen py-10 bg-linear-to-b from-gray-50 to-gray-100" id="footer">
            <div className="min-h-[90vh] md:h-[90%] bg-linear-to-br from-[#2a2527] to-[#1a1718] text-white rounded-3xl w-[90%] mx-auto grid grid-rows-[auto_1fr_auto_auto] md:grid-rows-[auto_auto_auto_auto] place-items-center gap-8 md:gap-0 py-10 md:py-0 shadow-2xl border border-white/10 relative overflow-hidden">
               
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
                
                <div className="w-[90%] grid place-items-center md:place-items-end z-10">
                    <span className="text-xs md:text-sm bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent font-medium text-center md:text-right">
                        Available to take on new projects
                    </span>
                </div>
                
                <div className="z-10 px-4">
                    <StaggerHeader/>
                </div>

                <div className="z-10">
                    <Btn>
                        Book a call
                    </Btn>
                </div>
                
                <div className="flex flex-col md:flex-row w-[90%] items-center justify-between z-10 border-t border-white/10 pt-8 gap-6 md:gap-0">
                    <p className="font-semibold text-center md:text-left">Maobugichi</p>
                    
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 w-full md:w-auto">
                       {
                        items.map((item, i) => (
                            <a 
                                key={i}
                                className="px-4 md:px-5 border border-white/20 rounded-full py-1.5 hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm text-sm md:text-base whitespace-nowrap"
                            >
                                {item}
                            </a>
                        ))
                       }
                    </div>
                   
                    <p className="text-white/60 text-xs md:text-sm text-center md:text-right">©2025 - All Rights Reserved</p>
                </div>
            </div>
        </footer>
    )
}