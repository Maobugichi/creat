import { FeatureGrid } from "@/components/layout/featured/gridblocks"

export const Featured = () => {
    return (
        <section id="featured" className="bg-[#FAF7F6] dark:bg-[#0F0F0E] pt-10 md:[170vh] lg:h-[210vh] grid place-items-center">
            <div className="w-[90%] mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <h2 className="font-heading text-5xl w-full lg:w-1/2 font-bold mb-6 leading-tight text-[#0F0F0E] dark:text-[#FDFDFC]">
                        design with purpose <br/> build with precision.
                    </h2>
                    <p className="font-body text-3xl w-full lg:w-1/2 text-right text-[#0F0F0E]/70 dark:text-[#FDFDFC]/60">
                        Every detail, from strategy to code, is crafted to create digital experiences that are clear, refined, and built to perform.
                    </p>
                </div>
                <FeatureGrid/>
            </div>
        </section>
    )
}