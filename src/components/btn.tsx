import { ArrowUpRight } from "phosphor-react"


export const Btn = ({
  children,
  size = "md",
  className,
  type,
  disabled
}: {
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
  className?: string
  type?:"submit" | "reset" | "button" | undefined
  disabled?:boolean
}) => {
  const sizeStyles = {
    sm: "py-1 text-sm",
    md: "py-3 text-xl",
    lg: "py-5 text-2xl",
  }

  return (
    <button
    disabled={disabled}
    type={type}
      aria-label="call to actionn"
      className={`flex font-heading items-center gap-2 border-2 border-black px-7 bg-white tracking-wide rounded-full text-black backdrop-blur-md font-semibold ${sizeStyles[size]} ${className ?? ""}`}
    >
      {children}   <ArrowUpRight size={24} weight="bold" />
    </button>
  )
}
