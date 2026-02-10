import { HelpCircle } from 'lucide-react';
import { useState } from 'react';

/**
 * Tooltip Component - Displays helpful information on hover
 * 
 * @param {ReactNode} children - Trigger element
 * @param {string} content - Tooltip text
 * @param {string} position - Position: 'top', 'bottom', 'left', 'right'
 */
export default function Tooltip({ children, content, position = 'top' }) {
    const [isVisible, setIsVisible] = useState(false);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}

            {isVisible && (
                <div className={`absolute z-50 ${positionClasses[position]} animate-in fade-in duration-200`}>
                    <div className="bg-gray-900 text-white text-sm rounded-lg px-3 py-2 max-w-xs shadow-xl">
                        {content}
                        {/* Arrow */}
                        <div className={`absolute w-2 h-2 bg-gray-900 rotate-45 ${position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' :
                                position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' :
                                    position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' :
                                        'left-[-4px] top-1/2 -translate-y-1/2'
                            }`}></div>
                    </div>
                </div>
            )}
        </div>
    );
}

/**
 * InfoTooltip - Icon with tooltip
 * Convenient wrapper for showing info icons with explanations
 */
export function InfoTooltip({ content, position = 'top' }) {
    return (
        <Tooltip content={content} position={position}>
            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help transition-colors" />
        </Tooltip>
    );
}
