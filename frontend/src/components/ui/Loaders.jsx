import { motion } from 'framer-motion';

/**
 * PulseLoader - 3 dots pulsando
 */
export function PulseLoader({ size = 'md', color = 'purple' }) {
    const sizes = {
        sm: 'w-1.5 h-1.5',
        md: 'w-2.5 h-2.5',
        lg: 'w-4 h-4',
    };

    const colors = {
        purple: 'bg-purple-500',
        blue: 'bg-blue-500',
        white: 'bg-white',
        gray: 'bg-gray-500',
    };

    return (
        <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className={`${sizes[size]} ${colors[color]} rounded-full`}
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.15,
                    }}
                />
            ))}
        </div>
    );
}

/**
 * SpinnerLoader - Circle com gradient girando
 */
export function SpinnerLoader({ size = 'md' }) {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-10 h-10',
    };

    return (
        <motion.div
            className={`${sizes[size]} border-2 border-purple-200 border-t-purple-600 rounded-full`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
    );
}

/**
 * BarLoader - Barra animada
 */
export function BarLoader() {
    return (
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
                className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
        </div>
    );
}

/**
 * ButtonSpinner - Spinner para usar dentro de botões
 */
export function ButtonSpinner({ className = '' }) {
    return (
        <motion.div
            className={`inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full ${className}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
    );
}
