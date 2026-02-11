import { useState } from 'react';
import {
    Calendar as CalendarIcon,
    Plus,
    Clock,
    User,
    Search,
    Filter
} from 'lucide-react';
import Calendar from '../../components/beauty/Calendar';
import TimeSlotPicker from '../../components/beauty/TimeSlotPicker';
import Modal from '../../components/ui/Modal';
import { AnimatedButton } from '../../components/ui/AnimatedCard';
import { useToast } from '../../components/ui/Toast';

export default function Appointments() {
    const { addToast } = useToast();
    const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    // Mock Events
    const [events, setEvents] = useState([
        { id: 1, title: 'Corte - Maria', start: '2024-02-12T10:00:00', end: '2024-02-12T11:00:00', backgroundColor: '#f43f5e' },
        { id: 2, title: 'Unha - Joana', start: '2024-02-12T14:00:00', end: '2024-02-12T15:00:00', backgroundColor: '#ec4899' },
    ]);

    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        setIsNewBookingOpen(true);
    };

    const handleEventClick = (info) => {
        addToast(`Agendamento: ${info.event.title}`, 'info');
    };

    const handleCreateBooking = () => {
        if (!selectedTime) {
            addToast('Selecione um horário!', 'warning');
            return;
        }

        const dateToUse = selectedDate || new Date().toISOString().split('T')[0];

        const newEvent = {
            id: Date.now().toString(),
            title: 'Novo Agendamento',
            start: `${dateToUse}T${selectedTime}:00`,
            end: `${dateToUse}T${parseInt(selectedTime.split(':')[0]) + 1}:00:00`,
            backgroundColor: '#8b5cf6'
        };

        setEvents([...events, newEvent]);
        setIsNewBookingOpen(false);
        addToast('Agendamento criado com sucesso!', 'success');
        setSelectedTime(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Agenda</h1>
                    <p className="text-gray-500 mt-1">Gerencie os agendamentos do salão</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-white border text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50">
                        <Filter className="w-4 h-4" />
                        Filtrar
                    </button>
                    <AnimatedButton
                        onClick={() => setIsNewBookingOpen(true)}
                        className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-rose-500/30"
                    >
                        <Plus className="w-5 h-5" />
                        Novo Agendamento
                    </AnimatedButton>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                    <Calendar
                        events={events}
                        onDateClick={handleDateClick}
                        onEventClick={handleEventClick}
                    />
                </div>
                <div className="space-y-6">
                    <div className="bg-white p-5 rounded-xl border shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-rose-500" />
                            Próximos
                        </h3>
                        <div className="space-y-3">
                            {events.slice(0, 3).map(evt => (
                                <div key={evt.id} className="p-3 bg-gray-50 rounded-lg border-l-4 border-rose-500">
                                    <div className="font-medium text-sm">{evt.title}</div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {new Date(evt.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isNewBookingOpen}
                onClose={() => setIsNewBookingOpen(false)}
                title="Novo Agendamento"
            >
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Selecione o Horário</label>
                        <TimeSlotPicker
                            selectedTime={selectedTime}
                            onSelect={setSelectedTime}
                            occupiedTimes={['10:00', '14:30']}
                        />
                    </div>

                    <button
                        onClick={handleCreateBooking}
                        className="w-full bg-rose-600 text-white py-3 rounded-xl font-semibold hover:bg-rose-700 transition-colors shadow-lg shadow-rose-500/30"
                    >
                        Confirmar Agendamento ({selectedDate || 'Hoje'} às {selectedTime || '--:--'})
                    </button>
                </div>
            </Modal>
        </div>
    );
}
