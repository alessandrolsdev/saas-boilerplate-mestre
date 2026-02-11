import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

export default function Calendar({
    events = [],
    onDateClick,
    onEventClick,
    onDrop
}) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[700px]">
            <style>{`
                .fc-event { cursor: pointer; border: none; }
                .fc-event-main { padding: 4px; font-weight: 500; }
                .fc-toolbar-title { font-size: 1.25rem !important; font-weight: 600; color: #1f2937; }
                .fc-button-primary { background-color: #f43f5e !important; border-color: #f43f5e !important; }
                .fc-button-primary:hover { background-color: #e11d48 !important; border-color: #e11d48 !important; }
                .fc-day-today { background-color: #fff1f2 !important; }
            `}</style>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                locale={ptBrLocale}
                events={events} // [{ title: 'Corte de Cabelo', start: '2024-02-10T10:00:00', end: '2024-02-10T11:00:00', backgroundColor: '#f43f5e' }]
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                dateClick={onDateClick}
                eventClick={onEventClick}
                eventDrop={onDrop}
                height="100%"
                slotMinTime="08:00:00"
                slotMaxTime="20:00:00"
                allDaySlot={false}
                slotDuration="00:30:00"
            />
        </div>
    );
}
