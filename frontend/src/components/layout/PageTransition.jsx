import { motion } from 'framer-motion';

/**
 * PageTransition - Wrapper para transições suaves entre páginas
 * 
 * Uso:
 * <PageTransition>
 *   <YourPageContent />
 * </PageTransition>
 */
export default function PageTransition({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.4,
                ease: [0.43, 0.13, 0.23, 0.96] // Custom easing curve
            }}
        >
            {children}
        </motion.div>
    );
}

/**
 * FadeInWhenVisible - Fade in quando elemento entra no viewport
 * 
 * Uso:
 * <FadeInWhenVisible>
 *   <YourContent />
 * </FadeInWhenVisible>
 */
export function FadeInWhenVisible({ children, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.6,
                delay,
                ease: "easeOut"
            }}
        >
            {children}
        </motion.div>
    );
}

/**
 * StaggerContainer - Container para animar children em sequência
 */
export function StaggerContainer({ children, staggerDelay = 0.1 }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: staggerDelay
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
}

/**
 * StaggerItem - Item que anima dentro de StaggerContainer
 */
export function StaggerItem({ children }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" }
                }
            }}
        >
            {children}
        </motion.div>
    );
}
