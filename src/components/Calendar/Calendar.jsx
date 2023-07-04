import FullCalendar from '@fullcalendar/react';
import dayGridPlungin from '@fullcalendar/daygrid';
import timeGridPluning from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

function Calendar({ diaElegido, setDiaElegido, tareas, setTareas }) {
    // [
    //     { title: 'event 1', date: '2023-07-07' },
    //     { title: 'event 2', date: '2023-07-08' }
    // ]

    const elegirDia = function (data) {
        setDiaElegido(data.startStr);
        console.log('soy data: ', data)
    }


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
            eventOrdering={false}
            events={tareas}
            selectable={true}
            selectHelper={true}
            select={elegirDia}
        />
    </div>;
}

export default Calendar;