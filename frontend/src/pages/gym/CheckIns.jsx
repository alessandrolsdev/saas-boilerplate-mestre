import { useState, useEffect } from 'react';
import {
    QrCode,
    Check,
    User,
    Clock,
    Calendar,
    Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import CheckInScanner from '../../components/gym/CheckInScanner';
import AnimatedCard, { AnimatedButton } from '../../components/ui/AnimatedCard';
import { useToast } from '../../components/ui/Toast';

export default function CheckIns() {
    const { addToast } = useToast();
    const [isScanning, setIsScanning] = useState(false);

    const [recentCheckIns, setRecentCheckIns] = useState([
        { id: 1, name: 'João Silva', plan: 'Gold', time: '10:45', status: 'Authorized' },
        { id: 2, name: 'Maria Souza', plan: 'Silver', time: '10:42', status: 'Authorized' },
        { id: 3, name: 'Pedro Santos', plan: 'Bronze', time: '10:38', status: 'Denied', reason: 'Pagamento Pendente' },
        { id: 4, name: 'Ana Costa', plan: 'Gold', time: '10:35', status: 'Authorized' },
    ]);

    const stats = {
        today: 42,
        current: 18,
        peak: '18:00 - 19:00'
    };

    const handleManualCheckIn = () => {
        // Simulating a check-in
        const newCheckIn = {
            id: Date.now(),
            name: 'Novo Visitante',
            plan: 'Day Pass',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'Authorized'
        };
        setRecentCheckIns([newCheckIn, ...recentCheckIns]);
        addToast('Check-in realizado com sucesso!', 'success');
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Check-ins</h1>
                    <p className="text-gray-500 mt-1">Controle de acesso em tempo real</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleManualCheckIn}
                        className="bg-white border text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium"
                    >
                        Check-in Manual
                    </button>
                    <AnimatedButton
                        onClick={() => setIsScanning(!isScanning)}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transition-colors text-white ${isScanning ? 'bg-red-500 hover:bg-red-600' : 'bg-orange-600 hover:bg-orange-700 shadow-orange-500/30'
                            }`}
                    >
                        <QrCode className="w-5 h-5" />
                        {isScanning ? 'Parar Scanner' : 'Abrir Scanner'}
                    </AnimatedButton>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Scanner / Stats Column */}
                <div className="space-y-6">
                    <AnimatePresence>
                        {isScanning && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <CheckInScanner />
                                <div className="text-center text-sm text-gray-500 mt-2">
                                    Aponte a câmera para o QR Code do aluno
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                            <div className="text-3xl font-bold text-gray-900">{stats.today}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Hoje Total</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                            <div className="text-3xl font-bold text-orange-600">{stats.current}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Agora na Academia</div>
                        </div>
                    </div>
                </div>

                {/* Feed Column */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 max-h-[600px] overflow-y-auto">
                    <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-400" />
                        Feed de Acesso
                    </h3>

                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {recentCheckIns.map((checkIn) => (
                                <motion.div
                                    key={checkIn.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`p-4 rounded-xl border flex items-center gap-4 ${checkIn.status === 'Authorized'
                                            ? 'border-green-100 bg-green-50/30'
                                            : 'border-red-100 bg-red-50/30'
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${checkIn.status === 'Authorized' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h4 className="font-semibold text-gray-900">{checkIn.name}</h4>
                                            <span className="text-sm font-medium text-gray-500">{checkIn.time}</span>
                                        </div>
                                        <div className="flex justify-between mt-1">
                                            <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-100">
                                                {checkIn.plan}
                                            </span>
                                            {checkIn.status === 'Denied' && (
                                                <span className="text-xs font-semibold text-red-600">
                                                    ⛔ {checkIn.reason}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
