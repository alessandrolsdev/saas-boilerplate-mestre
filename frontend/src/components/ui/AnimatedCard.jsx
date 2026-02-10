import { motion } from 'framer-motion';

/**
 * AnimatedCard - Reusable card wrapper with premium hover animations
 * 
 * Usage:
 * <AnimatedCard>
 *   <YourCardContent />
 * </AnimatedCard>
 */
export default function AnimatedCard({
    children,
    className = '',
    delay = 0,
    hoverScale = 1.02,
    hoverY = -5
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay, ease: 'easeOut' }}
            whileHover={{
                scale: hoverScale,
                y: hoverY,
                transition: { duration: 0.2, ease: 'easeOut' }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * AnimatedButton - Button with press and hover animations
 */
export function AnimatedButton({
    children,
    className = '',
    onClick,
    ...props
}) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className={className}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.button>
    );
}

/**
 * AnimatedStatsCard - Stats card with number counter animation
 */
export function AnimatedStatsCard({
    children,
    className = '',
    delay = 0
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{
                y: -8,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.24)',
                transition: { duration: 0.2 }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
