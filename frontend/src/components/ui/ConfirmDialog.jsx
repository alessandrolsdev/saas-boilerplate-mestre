import { AlertTriangle } from 'lucide-react';

/**
 * ConfirmDialog Component - Confirmation dialog for destructive actions
 * 
 * @param {boolean} isOpen - Controls dialog visibility
 * @param {function} onClose - Callback when dialog closes
 * @param {function} onConfirm - Callback when user confirms
 * @param {string} title - Dialog title
 * @param {string} message - Dialog message
 * @param {string} confirmText - Confirm button text (default: "Confirmar")
 * @param {string} variant - Variant: 'danger', 'warning', 'info'
 */
export default function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirmar ação',
    message,
    confirmText = 'Confirmar',
    variant = 'danger'
}) {
    if (!isOpen) return null;

    const variants = {
        danger: {
            icon: 'bg-red-100 text-red-600',
            button: 'bg-red-600 hover:bg-red-700'
        },
        warning: {
            icon: 'bg-yellow-100 text-yellow-600',
            button: 'bg-yellow-600 hover:bg-yellow-700'
        },
        info: {
            icon: 'bg-blue-100 text-blue-600',
            button: 'bg-blue-600 hover:bg-blue-700'
        }
    };

    const style = variants[variant];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-in fade-in zoom-in duration-200">
                <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${style.icon}`}>
                        <AlertTriangle className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                        <p className="text-gray-600 leading-relaxed">{message}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`flex-1 px-4 py-2.5 text-white font-semibold rounded-xl transition-colors ${style.button}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
