import { FeatureGrid } from "@/components/layout/featured/gridblocks"

export const Featured = () => {
  return (
    <section
      id="featured"
      className="bg-[#FAF7F6] dark:bg-[#0F0F0E] py-20 md:py-28"
    >
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
          <h2 className="font-heading text-5xl md:text-6xl w-full lg:w-1/2 font-bold leading-tight text-[#0F0F0E] dark:text-[#FDFDFC]">
            Design with purpose, <br className="hidden md:block" /> build with precision.
          </h2>
          <p className="font-body text-lg md:text-3xl w-full lg:w-5/12 lg:text-right text-[#0F0F0E]/60 dark:text-[#FDFDFC]/50 leading-relaxed lg:pt-3">
            Every detail, from strategy to code, is crafted to create digital
            experiences that are clear, refined, and built to perform.
          </p>
        </div>
        <FeatureGrid />
      </div>
    </section>
  )
}