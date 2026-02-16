import { Btn } from "@/components/btn"
import { FAQAccordion } from "./faqAccordion"

export const FAQ = () => {
    return(
        <section className="h-auto  w-full" id="faq">
            <div className="w-[90%] mx-auto  py-20 grid gap-8">
            
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <h2 className="font-heading text-5xl font-bold mb-6 leading-tight max-w-lg">
                        Your questions answered
                    </h2>
                    
                  
                    <div className="hidden md:block">
                        <Btn>Book a call</Btn>
                    </div>
                </div>
                
                <FAQAccordion/>

                
                <div className="block md:hidden mt-4">
                    <Btn className="w-[60%] mx-auto">Book a call</Btn>
                </div>
                
            </div>
        </section>
    )
}