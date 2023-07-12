import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlungin from '@fullcalendar/daygrid';
import timeGridPluning from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

function Calendar({ diaElegido, setDiaElegido, tareas, setTareas, calendarRef }) {
    const elegirDia = function (data) {
        let diaElegidoTemp = data.startStr
        setDiaElegido(diaElegidoTemp);

        let copiaTareas = tareas
        setTareas(copiaTareas.filter(evento => evento.date !== diaElegidoTemp))
        
        setTimeout(() => {
            setTareas(copiaTareas)
        }, 1);
    }

    const elegirEvento = function (data) {
        // del objeto data, saco la fecha del evento que tendra este formato "2023-07-04T16:04:00.000Z" y la convierto en este formato "2023-07-04" y la guardo en setDiaElegido
        let diaElegidoTemp = data.event.startStr.split('T')[0]
        setDiaElegido(diaElegidoTemp);

        let copiaTareas = tareas
        setTareas(copiaTareas.filter(evento => evento.date !== diaElegidoTemp))

        // espero medio segundo
        setTimeout(() => {
            setTareas(copiaTareas)
        }, 1);
    }

    // formato para los eventos
    // { title: 'event 2', date: '2023-07-08', allDay: false, color: 'red', start: new Date('2023-07-08T12:30:00') },

    return <div className='w-[100%] mx-2'>
        <FullCalendar
            ref={calendarRef}
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
            eventClick={elegirEvento}
            events={tareas}
            selectable={true}
            selectHelper={true}
            select={elegirDia}
        />
    </div>;
}

export default Calendar;