import List from '../List/List'
// importo CortinaBlanca
import CortinaBlanca from '../CortinaBlanca/CortinaBlanca'
// importo MensajeConfirmar
import MensajeConfirmar from '../MensajeConfirmar/MensajeConfirmar'
// importo Calendar
import Calendar from '../Calendar/Calendar'
// importo useState
import React, { useState } from 'react'


// creo un componente vacio
const Home = () => {
    const calendarRef = React.createRef()

    const sacarDiaInicial = function () {
        return new Date().toISOString().slice(0, 10)
    }

    // creo un estado para la cortina
    const [activo, setActivo] = useState(false)
    const [tareas, setTareas] = useState([])
    const [diaElegido, setDiaElegido] = useState(sacarDiaInicial());
    const [eventos, setEventos] = useState([]);
    const [fecha, setFecha] = useState('');

    const prueba = function (idEvento, nuevoColor) {
        var calendarApi = calendarRef.current.getApi()
        if (calendarApi) {
            // Obtener la referencia al evento que deseas actualizar
            const evento = calendarApi.getEventById(idEvento);
            // Llamar al método setProp() para actualizar la propiedad "color"
            evento.setProp('color', nuevoColor);
        } else {
            console.log('No se pudo actualizar el color del evento');
        }
    }   


    return (
        <div>
            {activo ? <MensajeConfirmar activo={activo} setActivo={setActivo} tareas={tareas} setTareas={setTareas} /> : null}
            <CortinaBlanca activo={activo} setActivo={setActivo} />
            {/* coloco aca el contenido de la pagina en flex horizontal */}
            <button className='border-2 bg-blue-400 p-2 text-white' onClick={prueba}>Probar</button>
            <div className='flex flex-row'>
                <List activo={activo} setActivo={setActivo} tareas={tareas} setTareas={setTareas} diaElegido={diaElegido} setDiaElegido={setDiaElegido} eventos={eventos} setEventos={setEventos} fecha={fecha} setFecha={setFecha} />
                <Calendar calendarRef={calendarRef} diaElegido={diaElegido} setDiaElegido={setDiaElegido} tareas={tareas} setTareas={setTareas} />
            </div>
        </div>
    )
}

// lo exporto
export default Home