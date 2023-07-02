import List from '../List/List'
// importo CortinaBlanca
import CortinaBlanca from '../CortinaBlanca/CortinaBlanca'
// importo MensajeConfirmar
import MensajeConfirmar from '../MensajeConfirmar/MensajeConfirmar'
// importo Calendar
import Calendar from '../Calendar/Calendar'
// importo useState
import { useState } from 'react'


// creo un componente vacio
const Home = () => {
    // creo un estado para la cortina
    const [activo, setActivo] = useState(false)
    const [tareas, setTareas] = useState([])
    const [diaElegido, setDiaElegido] = useState(null);
    const [eventos, setEventos] = useState([]);


    return (
        <div>
            {activo ? <MensajeConfirmar activo={activo} setActivo={setActivo} tareas={tareas} setTareas={setTareas} /> : null}
            <CortinaBlanca activo={activo} setActivo={setActivo} />
            {/* coloco aca el contenido de la pagina en flex horizontal */}
            <div className='flex flex-row'>
                <List activo={activo} setActivo={setActivo} tareas={tareas} setTareas={setTareas} diaElegido={diaElegido} setDiaElegido={setDiaElegido} eventos={eventos} setEventos={setEventos} />
                <Calendar diaElegido={diaElegido} setDiaElegido={setDiaElegido} eventos={tareas} setEventos={setTareas} />
            </div>
        </div>
    )
}

// lo exporto
export default Home