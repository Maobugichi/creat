import type { FC } from "react";
import { colorVariants } from "../sections/about/constants/color-variants";

interface StackCardProps<T> {
  item: T;
  index: number;
  getIcon: (item: T) => FC<React.SVGProps<SVGSVGElement>>;
  getColor: (item: T) => keyof typeof colorVariants;  
  getTitle: (item: T) => string;
  getDesc: (item: T) => string;
  getMetric?: (item: T) => string;
  getUnit?: (item: T) => string;
  gridClass?: string;
  innerRef?: (el: HTMLDivElement | null) => void;
  totalCards: number; // Add this
  height:string
}

export function CustomCard<T>({
  item,
  getIcon,
  getColor,
  getTitle,
  getDesc,
  getMetric,
  getUnit,
  gridClass,
  innerRef,
  height='h-[360px]'
}: StackCardProps<T>) {
  const Icon = getIcon(item);
  const colors = colorVariants[getColor(item)];
  //const topPosition = 120 ;
  
  return (
    <div
      ref={innerRef}
      
      className={`${height}  ${gridClass} top-[120px] md:top-0 mb-8 md:mb-0 bg-white border-2 rounded-3xl p-8 w-full  sticky md:relative flex  items-center justify-center`}
    >
      <div
        className={`
         
          overflow-hidden relative flex flex-col
          cursor-pointer 
        `}
      >
        <div className="relative mb-4">
          <div className="flex items-start justify-between">
            <div
              className={`w-14 h-14 ${colors.iconBg} rounded-xl flex items-center justify-center transition-all duration-300 shrink-0`}
            >
              <Icon className={`w-7 h-7 ${colors.iconColor} transition-colors duration-300`} />
            </div>

            {(getMetric || getUnit) && (
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900 leading-none">
                  {getMetric?.(item)}
                </div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getUnit?.(item)}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="text-xl text-left font-bold text-gray-900 mb-2 leading-tight">
            {getTitle(item)}
          </h3>

          <p className="text-lg tracking-wider font-roboto text-left text-gray-600 leading-relaxed mb-4 font-light flex-1">
            {getDesc(item)}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div
              className={`h-1 w-10 ${colors.accent} rounded-full opacity-60 group-hover:opacity-100 group-hover:w-14 transition-all duration-300`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}