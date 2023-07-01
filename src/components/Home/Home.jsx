import List from '../List/List'
// importo CortinaBlanca
import CortinaBlanca from '../CortinaBlanca/CortinaBlanca'
// importo MensajeConfirmar
import MensajeConfirmar from '../MensajeConfirmar/MensajeConfirmar'
import { useState } from 'react'

// creo un componente vacio
const Home = () => {
    // creo un estado para la cortina
    const [activo, setActivo] = useState(false)

    const [tareas, setTareas] = useState([])


    return (
        <div>
            {activo ? <MensajeConfirmar activo={activo} setActivo={setActivo} tareas={tareas} setTareas={setTareas} /> : null}
            <CortinaBlanca activo={activo} setActivo={setActivo} />
            <div className='flex flex-row'>
                <List activo={activo} setActivo={setActivo} tareas={tareas} setTareas={setTareas} />
            </div>
        </div>
    )
}

// lo exporto
export default Home