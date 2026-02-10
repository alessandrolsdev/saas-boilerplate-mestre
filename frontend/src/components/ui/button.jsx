import * as React from "react"
import { cn } from "@/lib/utils"
// Simplificação do CVA (Class Variance Authority) para manter o arquivo único mas poderoso
import { Loader2 } from "lucide-react"

const buttonVariants = ({ variant = "default", size = "default", className }) => {
    const base = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

    const variants = {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Legal Theme (Juridical)
        "legal-primary": "bg-[#C5A059] text-slate-900 hover:bg-[#E5D09D] shadow-lg font-serif",
        "legal-outline": "border-2 border-[#C5A059] text-[#C5A059] bg-transparent hover:bg-[#C5A059]/10 font-serif tracking-widest uppercase text-sm",
        // Engineering Theme (Construction)
        "eng-primary": "bg-yellow-500 text-black font-black uppercase hover:bg-yellow-400 shadow-xl border-2 border-black",
        "eng-secondary": "bg-zinc-900 text-white font-bold uppercase hover:bg-zinc-800 border-2 border-zinc-700",
        // Master Theme (Developer Portfolio)
        "master-primary": "bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] shadow-lg",
        "master-secondary": "border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm",
    }

    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
    }

    return cn(base, variants[variant], sizes[size], className)
}

const Button = React.forwardRef(({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
        <button
            className={buttonVariants({ variant, size, className })}
            ref={ref}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    )
})
Button.displayName = "Button"

export { Button }
