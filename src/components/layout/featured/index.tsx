import { FeatureGrid } from "@/components/layout/featured/gridblocks"

export const Featured = () => {
    return (
        <section id="featured" className="bg-[#FAF7F6] pt-10 md:[170vh] lg:h-[210vh] grid place-items-center ">
            <div className="w-[90%] mx-auto">
                 <div className="grid  grid-cols-1 md:grid-cols-2 place-items-center">
                    <h2 className="font-heading text-5xl font-bold mb-6 leading-tight">design with purpose <br/> build with precision.</h2>
                    <p className="font-body text-2xl">Every detail, from strategy to code, is crafted to create digital experiences that are clear, refined, and built to perform.</p>
                </div>
                <FeatureGrid/>
            </div>
         
        </section>
    )
}