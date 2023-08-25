import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlungin from '@fullcalendar/daygrid';
import timeGridPluning from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// importo useEffect y useState
import { useEffect, useState } from 'react';

function Calendar({ diaElegido, setDiaElegido, tareas, setTareas, calendarRef }) {
    const lgHeight = '98vh';
    const othersHeight = '80vh';
    const [calendarHeight, setCalendarHeight] = useState(lgHeight);
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


    useEffect(() => {
        function handleResize() {
            // checo el tamaño de la pantalla y si es menor a 1024px, cambio el alto del calendario
            let newHeight
            window.innerWidth < 1024 ? (newHeight = othersHeight) :(newHeight = lgHeight)
            setCalendarHeight(newHeight);
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return <div className='w-auto lg:w-screen mx-1 mt-1 lg:mx-2 mb-2 lg:my-0'>
        <FullCalendar
            eventRender={(info) => {
                // Acceder al elemento HTML del evento
                let evento = info.el;
                // Establecer la propiedad white-space: nowrap
                evento.style.whiteSpace = 'wrap';
                evento.style.overflow = 'hidden';
            }}
            ref={calendarRef}
            plugins={[dayGridPlungin, timeGridPluning, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: 'prev,next today',
                center: '',
                // no coloco nada en right, lo quiero vacio
                right: 'title'
            }}
            height={calendarHeight}        
            weekends={true}
            eventOrdering={false}
            eventClick={elegirEvento}
            events={tareas}
            selectable={true}
            selectHelper={true}
            select={elegirDia}     
            longPressDelay={0.1}       
        />
    </div>;
}

export default Calendar;