import { useState } from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const timeSlots = [
    { id: 'morning', label: 'Manhã', times: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'] },
    { id: 'afternoon', label: 'Tarde', times: ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'] },
    { id: 'evening', label: 'Noite', times: ['17:00', '17:30', '18:00', '18:30', '19:00'] }
];

export default function TimeSlotPicker({ selectedTime, onSelect, occupiedTimes = [] }) {
    const [selectedTab, setSelectedTab] = useState('morning');

    return (
        <div className="space-y-4">
            {/* Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-lg">
                {timeSlots.map((slot) => (
                    <button
                        key={slot.id}
                        onClick={() => setSelectedTab(slot.id)}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${selectedTab === slot.id
                                ? 'bg-white text-rose-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {slot.label}
                    </button>
                ))}
            </div>

            {/* Slots Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots
                    .find(t => t.id === selectedTab)
                    ?.times.map((time) => {
                        const isOccupied = occupiedTimes.includes(time);
                        const isSelected = selectedTime === time;

                        return (
                            <motion.button
                                key={time}
                                disabled={isOccupied}
                                onClick={() => onSelect(time)}
                                whileHover={!isOccupied ? { scale: 1.05 } : {}}
                                whileTap={!isOccupied ? { scale: 0.95 } : {}}
                                className={`
                                    relative flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-sm font-medium transition-all
                                    ${isOccupied
                                        ? 'bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed'
                                        : isSelected
                                            ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-sm'
                                            : 'bg-white border-gray-200 text-gray-700 hover:border-rose-300 hover:text-rose-600'
                                    }
                                `}
                            >
                                <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-rose-500' : 'text-gray-400'}`} />
                                {time}
                            </motion.button>
                        );
                    })}
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 mt-2 px-1">
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full border border-rose-500 bg-rose-50"></div>
                    Selecionado
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full border border-gray-200 bg-white"></div>
                    Disponível
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full border border-gray-200 bg-gray-50"></div>
                    Ocupado
                </div>
            </div>
        </div>
    );
}
