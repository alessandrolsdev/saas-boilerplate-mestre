import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ParallaxSection - Seção com efeito parallax suave
 * 
 * Uso:
 * <ParallaxSection speed={0.5}>
 *   <YourContent />
 * </ParallaxSection>
 */
export function ParallaxSection({ children, speed = 0.5, className = '' }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

    return (
        <div ref={ref} className={className}>
            <motion.div style={{ y }}>
                {children}
            </motion.div>
        </div>
    );
}

/**
 * ParallaxImage - Imagem com parallax
 */
export function ParallaxImage({ src, alt, speed = 0.3, className = '' }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.img
                src={src}
                alt={alt}
                style={{ y }}
                className="w-full h-full object-cover scale-110"
            />
        </div>
    );
}

/**
 * ParallaxText - Texto com movimento parallax
 */
export function ParallaxText({ children, speed = 0.2, className = '' }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 50}%`, `${speed * 50}%`]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

    return (
        <div ref={ref} className={className}>
            <motion.div style={{ y, opacity }}>
                {children}
            </motion.div>
        </div>
    );
}
