import { motion, useScroll } from 'framer-motion';

/**
 * ScrollProgress - Premium scroll progress indicator
 * 
 * Barra de progresso elegante que preenche conforme o usuário rola a página.
 * Aparece no topo com gradient purple → blue.
 */
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 origin-left z-50"
            style={{ scaleX: scrollYProgress }}
        />
    );
}
