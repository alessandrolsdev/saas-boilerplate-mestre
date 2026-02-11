import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    Calendar as CalendarIcon,
    Plus,
    Clock,
    User,
    Search,
    Filter,
    CheckCircle2,
    XCircle,
    MoreVertical,
    MapPin,
    Scissors,
    Sparkles,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    ArrowRight
} from 'lucide-react';
import FileFullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { AnimatePresence, motion } from 'framer-motion';

import Modal from '../../components/ui/Modal';
import { AnimatedButton } from '../../components/ui/AnimatedCard';
import { useToast } from '../../components/ui/Toast';
import TimeSlotPicker from '../../components/beauty/TimeSlotPicker';
import EmptyState from '../../components/ui/EmptyState';
import { InfoTooltip } from '../../components/ui/Tooltip';
import SkeletonCard from '../../components/ui/SkeletonCard';

// Custom Calendar wrapper to style it
import styled from 'styled-components';

const CalendarWrapper = styled.div`
  .fc {
    font-family: inherit;
    --fc-border-color: rgba(255, 255, 255, 0.1);
    --fc-page-bg-color: transparent;
    --fc-neutral-bg-color: rgba(255, 255, 255, 0.05);
    --fc-list-event-hover-bg-color: rgba(255, 255, 255, 0.1);
    --fc-today-bg-color: rgba(244, 63, 94, 0.05);
  }

  .fc-theme-standard td, .fc-theme-standard th {
    border-color: var(--fc-border-color);
  }

  .fc-col-header-cell-cushion {
    color: #cbd5e1; /* slate-300 */
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.85rem;
    padding: 12px 0;
  }

  .fc-timegrid-slot-label-cushion {
    color: #94a3b8; /* slate-400 */
    font-weight: 600;
    font-size: 0.85rem;
  }

  .fc-event {
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    cursor: pointer;
    
    &:hover {
      transform: scale(1.02);
      z-index: 50;
    }
  }

  .fc-daygrid-day-number {
    color: #cbd5e1;
    font-weight: 600;
  }
  
  .fc-button-primary {
    background-color: #be123c !important; /* rose-700 */
    border-color: #be123c !important;
    font-weight: 700;
    text-transform: capitalize;
    
    &:hover {
      background-color: #9f1239 !important; /* rose-800 */
      border-color: #9f1239 !important;
    }
    
    &:disabled {
      background-color: #881337 !important;
      border-color: #881337 !important;
    }
  }

  .fc-toolbar-title {
    color: white;
    font-weight: 900;
    font-size: 1.5rem;
  }
`;

export default function Appointments() {
    const { addToast } = useToast();
    const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('calendar'); // 'calendar' | 'list'

    // Mock Events
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Simulate fetch
        const loadEvents = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setEvents([
                { id: '1', title: 'Corte - Maria Silva', start: new Date().toISOString().split('T')[0] + 'T10:00:00', end: new Date().toISOString().split('T')[0] + 'T11:00:00', backgroundColor: '#e11d48', borderColor: '#e11d48', extendedProps: { service: 'Corte de Cabelo', professional: 'Ana' } },
                { id: '2', title: 'Unha - Joana Santos', start: new Date().toISOString().split('T')[0] + 'T14:00:00', end: new Date().toISOString().split('T')[0] + 'T15:00:00', backgroundColor: '#db2777', borderColor: '#db2777', extendedProps: { service: 'Manicure', professional: 'Beatriz' } },
                { id: '3', title: 'Hidratação - Carla', start: new Date(Date.now() + 86400000).toISOString().split('T')[0] + 'T09:00:00', end: new Date(Date.now() + 86400000).toISOString().split('T')[0] + 'T10:30:00', backgroundColor: '#9333ea', borderColor: '#9333ea', extendedProps: { service: 'Hidratação', professional: 'Ana' } },
            ]);
            setLoading(false);
        };
        loadEvents();
    }, []);

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

        // Creating a new event
        const start = `${dateToUse}T${selectedTime}:00`;
        // Simple logic to add 1 hour
        const [hours, minutes] = selectedTime.split(':').map(Number);
        const endDate = new Date(dateToUse);
        endDate.setHours(hours + 1, minutes, 0);
        const end = endDate.toISOString(); // This is a bit rough but works for demo

        const newEvent = {
            id: Date.now().toString(),
            title: 'Novo Agendamento',
            start: start,
            end: end,
            backgroundColor: '#059669', // emerald
            borderColor: '#059669',
            extendedProps: { service: 'Serviço Rápido', professional: 'Disp.' }
        };

        setEvents([...events, newEvent]);
        setIsNewBookingOpen(false);
        addToast('Agendamento criado com sucesso!', 'success');
        setSelectedTime(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-rose-950/20 to-slate-950 text-white relative overflow-hidden p-8">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-rose-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight uppercase italic relative inline-block">
                        Agenda
                        <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full" />
                    </h1>
                    <p className="text-slate-400 mt-2 font-medium">Gerencie os horários do salão com precisão</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setView(view === 'calendar' ? 'list' : 'calendar')}
                        className="px-4 py-2 bg-slate-900 border border-white/10 rounded-xl text-slate-300 hover:text-white hover:border-rose-500/50 transition-all font-bold flex items-center gap-2"
                    >
                        {view === 'calendar' ? <MoreVertical className="w-4 h-4" /> : <CalendarIcon className="w-4 h-4" />}
                        {view === 'calendar' ? 'Vista Lista' : 'Vista Calendário'}
                    </button>

                    <AnimatedButton
                        onClick={() => { setSelectedDate(new Date().toISOString().split('T')[0]); setIsNewBookingOpen(true); }}
                        className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white px-6 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-rose-500/30 border border-white/10 font-bold uppercase tracking-wide group"
                    >
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                        Novo Agendamento
                    </AnimatedButton>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
                {/* Main Calendar Area */}
                <div className="lg:col-span-3">
                    <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl p-6 overflow-hidden">
                        {loading ? (
                            <div className="h-[600px] flex items-center justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
                            </div>
                        ) : view === 'calendar' ? (
                            <CalendarWrapper>
                                <FileFullCalendar
                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                    initialView="timeGridWeek"
                                    headerToolbar={{
                                        left: 'prev,next today',
                                        center: 'title',
                                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                    }}
                                    locale={ptBrLocale}
                                    events={events}
                                    dateClick={handleDateClick}
                                    eventClick={handleEventClick}
                                    height="auto" // allows container to control height
                                    contentHeight="600px"
                                    slotMinTime="08:00:00"
                                    slotMaxTime="20:00:00"
                                    allDaySlot={false}
                                    nowIndicator={true}
                                    eventContent={(eventInfo) => (
                                        <div className="p-1overflow-hidden">
                                            <div className="font-bold text-xs truncate">{eventInfo.timeText}</div>
                                            <div className="font-bold text-sm truncate">{eventInfo.event.title}</div>
                                            {eventInfo.event.extendedProps.service && (
                                                <div className="text-xs opacity-75 truncate">{eventInfo.event.extendedProps.service}</div>
                                            )}
                                        </div>
                                    )}
                                />
                            </CalendarWrapper>
                        ) : (
                            <div className="space-y-4">
                                {events.length === 0 ? (
                                    <EmptyState icon={CalendarIcon} title="Sem agendamentos" description="Nenhum agendamento encontrado." />
                                ) : (
                                    events.map(evt => (
                                        <div key={evt.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/50 border border-white/5 hover:border-rose-500/30 transition-all group">
                                            <div className="w-16 flex flex-col items-center justify-center bg-slate-900 rounded-lg p-2 border border-white/5">
                                                <span className="text-xs text-slate-500 font-bold uppercase">{new Date(evt.start).toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')}</span>
                                                <span className="text-xl font-black text-white">{new Date(evt.start).getDate()}</span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">{evt.title}</h3>
                                                <div className="flex items-center gap-3 text-sm text-slate-400 mt-1">
                                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(evt.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(evt.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    {evt.extendedProps.service && <span className="flex items-center gap-1"><Scissors className="w-3 h-3" /> {evt.extendedProps.service}</span>}
                                                </div>
                                            </div>
                                            <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-rose-500 transition-colors">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/5 shadow-xl p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-5 h-5 text-rose-500" />
                            <h3 className="font-bold text-white text-lg">Próximos</h3>
                        </div>

                        <div className="space-y-4">
                            {loading ? (
                                <SkeletonCard count={3} height="h-20" />
                            ) : events.slice(0, 3).map(evt => (
                                <div key={evt.id} className="relative pl-4 py-1">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full group-hover:bg-rose-500 transition-colors" style={{ backgroundColor: evt.backgroundColor }}></div>
                                    <div className="text-sm font-bold text-white">{evt.title}</div>
                                    <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {new Date(evt.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    {evt.extendedProps.professional && (
                                        <div className="text-xs text-rose-400 mt-1 font-medium">
                                            {evt.extendedProps.professional}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {events.length === 0 && !loading && <span className="text-slate-500 text-sm">Nada agendado.</span>}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-rose-900/20 to-pink-900/20 rounded-2xl border border-rose-500/20 p-5">
                        <div className="flex items-center gap-2 mb-2 text-rose-400">
                            <Sparkles className="w-5 h-5" />
                            <h3 className="font-bold">Dica do Dia</h3>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            Organize os agendamentos por cor para identificar rapidamente o tipo de serviço (Corte, Química, Manicure).
                        </p>
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
                        <label className="block text-sm font-bold text-slate-700 mb-2">Selecione o Horário</label>
                        <TimeSlotPicker
                            selectedTime={selectedTime}
                            onSelect={setSelectedTime}
                            occupiedTimes={['10:00', '14:30']}
                        />
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="text-xs font-bold text-slate-500 uppercase mb-1">Resumo</div>
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-800">{selectedDate ? new Date(selectedDate).toLocaleDateString('pt-BR') : 'Hoje'}</span>
                            <span className="font-black text-rose-600 text-lg">{selectedTime || '--:--'}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleCreateBooking}
                        disabled={!selectedTime}
                        className="w-full bg-rose-600 text-white py-3 rounded-xl font-bold hover:bg-rose-700 transition-colors shadow-lg shadow-rose-500/30 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
                    >
                        Confirmar Agendamento
                    </button>
                </div>
            </Modal>
        </div>
    );
}
