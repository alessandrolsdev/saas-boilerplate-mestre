import { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';

/**
 * Toast Context - Sistema de notificações global
 */
const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info', duration = 5000) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            removeToast(id);
        }, duration);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
}

/**
 * Hook para usar Toast
 */
export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
}

/**
 * Toast Container - Renderiza os toasts
 */
function ToastContainer({ toasts, removeToast }) {
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
                ))}
            </AnimatePresence>
        </div>
    );
}

/**
 * Toast Component
 */
function Toast({ toast, onClose }) {
    const icons = {
        success: CheckCircle2,
        error: XCircle,
        warning: AlertCircle,
        info: Info,
    };

    const styles = {
        success: 'bg-green-500/90 border-green-400 text-white',
        error: 'bg-red-500/90 border-red-400 text-white',
        warning: 'bg-yellow-500/90 border-yellow-400 text-gray-900',
        info: 'bg-blue-500/90 border-blue-400 text-white',
    };

    const Icon = icons[toast.type];

    return (
        <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={`
        flex items-center gap-3 px-4 py-3 rounded-lg border-2 backdrop-blur-md
        shadow-lg pointer-events-auto min-w-[300px] max-w-md
        ${styles[toast.type]}
      `}
        >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <p className="flex-1 font-medium text-sm">{toast.message}</p>
            <button
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
}
