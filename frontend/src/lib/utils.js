import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utilitário para combinar classes do Tailwind de forma inteligente (Shadcn/UI pattern).
 * Resolve conflitos como 'px-2 px-4' -> 'px-4'.
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs))
}
