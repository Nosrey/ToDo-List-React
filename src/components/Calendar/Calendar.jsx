import FullCalendar from '@fullcalendar/react';
import dayGridPlungin from '@fullcalendar/daygrid';
import timeGridPluning from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

function Calendar() {
    return <div className='w-[100%] mx-2'>
        Calendar
        <FullCalendar
            plugins={[dayGridPlungin, timeGridPluning, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            height={"95%"}
            weekends={true}
            events={[
                { title: 'event 1', date: '2023-07-07' },
                { title: 'event 2', date: '2023-07-08' }
            ]}
        />        
    </div>;
}

export default Calendar;