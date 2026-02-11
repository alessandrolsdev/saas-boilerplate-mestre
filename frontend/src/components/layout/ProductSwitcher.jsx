import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    CreditCard,
    Scissors,
    Dumbbell,
    ChevronDown,
    Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const products = [
    {
        id: 'finance',
        name: 'FinanceFlow',
        icon: CreditCard,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        path: '/finance-dashboard'
    },
    {
        id: 'beauty',
        name: 'BeautyFlow',
        icon: Scissors,
        color: 'text-pink-500',
        bg: 'bg-pink-500/10',
        path: '/beauty/dashboard'
    },
    {
        id: 'gym',
        name: 'GymFlow',
        icon: Dumbbell,
        color: 'text-orange-500',
        bg: 'bg-orange-500/10',
        path: '/gym/dashboard'
    }
];

export default function ProductSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [activeProduct, setActiveProduct] = useState(products[0]);

    useEffect(() => {
        if (location.pathname.includes('/beauty')) {
            setActiveProduct(products[1]);
        } else if (location.pathname.includes('/gym')) {
            setActiveProduct(products[2]);
        } else {
            setActiveProduct(products[0]);
        }
    }, [location]);

    const handleSwitch = (product) => {
        setActiveProduct(product);
        setIsOpen(false);
        navigate(product.path);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
            >
                <div className={`p-2 rounded-md ${activeProduct.bg}`}>
                    <activeProduct.icon className={`w-5 h-5 ${activeProduct.color}`} />
                </div>
                <div className="text-left hidden md:block">
                    <div className="text-xs text-zinc-400">Produto Atual</div>
                    <div className="text-sm font-semibold text-white flex items-center gap-1">
                        {activeProduct.name}
                        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute top-full left-0 mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden"
                        >
                            <div className="p-2">
                                <div className="text-xs font-semibold text-zinc-500 px-3 py-2 uppercase tracking-wider">
                                    Meus Produtos
                                </div>
                                {products.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleSwitch(product)}
                                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 transition-all group"
                                    >
                                        <div className={`p-2 rounded-md ${product.bg} group-hover:scale-110 transition-transform`}>
                                            <product.icon className={`w-5 h-5 ${product.color}`} />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="font-medium text-white">{product.name}</div>
                                            <div className="text-xs text-zinc-400">SaaS Management</div>
                                        </div>
                                        {activeProduct.id === product.id && (
                                            <Check className="w-4 h-4 text-emerald-500" />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="bg-zinc-950/50 p-3 border-t border-zinc-800">
                                <button
                                    onClick={() => navigate('/')}
                                    className="w-full py-2 text-xs text-center text-zinc-400 hover:text-white transition-colors"
                                >
                                    Voltar para Home
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
