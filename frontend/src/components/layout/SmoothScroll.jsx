import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

/**
 * SmoothScroll - Configura Lenis para scroll ultra-suave
 * 
 * Uso: Adicione no App.jsx ou componente raiz
 * <SmoothScroll />
 */
export default function SmoothScroll() {
    useEffect(() => {
        // Inicializar Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        // Request animation frame loop
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup
        return () => {
            lenis.destroy();
        };
    }, []);

    return null;
}
