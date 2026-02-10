import { InboxIcon } from 'lucide-react';

/**
 * EmptyState Component - Display when no data is available
 * 
 * @param {string} icon - Icon component (default: InboxIcon)
 * @param {string} title - Empty state title
 * @param {string} description - Empty state description
 * @param {ReactNode} action - Optional action button
 */
export default function EmptyState({
    icon: Icon = InboxIcon,
    title = 'Nenhum dado encontrado',
    description = 'Não há informações para exibir no momento.',
    action
}) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Icon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 text-center max-w-sm mb-6">{description}</p>
            {action && <div>{action}</div>}
        </div>
    );
}
