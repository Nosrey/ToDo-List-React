import List from '../List/List'
// importo CortinaBlanca
import CortinaBlanca from '../CortinaBlanca/CortinaBlanca'
// importo MensajeConfirmar
import MensajeConfirmar from '../MensajeConfirmar/MensajeConfirmar'
// importo Calendar
import arrowBtnLeft from '../../media/arrow-btn-left.png'
import arrowBtnRight from '../../media/arrow-btn-right.png'
import Calendar from '../Calendar/Calendar'
// importo useState
import React, { useState } from 'react'
import './Home.css'


// creo un componente vacio
const Home = () => {
    const calendarRef = React.createRef()

    const sacarDiaInicial = function () {
        return new Date().toISOString().slice(0, 10)
    }

    // creo un estado para la cortina
    const [activo, setActivo] = useState(false)
    // para esconder el costado de la pagina
    const [escondido, setEscondido] = useState(false)
    // eslint-disable-next-line
    const [sacarButton, setSacarButton] = useState(false)
    const [tareas, setTareas] = useState([])
    const [diaElegido, setDiaElegido] = useState(sacarDiaInicial());
    const [eventos, setEventos] = useState([]);
    const [fecha, setFecha] = useState('');

    const esconderList = (e) => {
        e.preventDefault();
        // espero 0.3 segundos
        if (sacarButton) {
            setEscondido(false)
            setSacarButton(false)
        } else {
            setSacarButton(true)
            setTimeout(() => {
                // cambio el estado
                setEscondido(true)
            }, 300)
        }
        // setSacarButton(!sacarB
    }

    return (
        <div>
            {activo ? <MensajeConfirmar activo={activo} setActivo={setActivo} tareas={tareas} setTareas={setTareas} /> : null}
            <CortinaBlanca activo={activo} setActivo={setActivo} />
            {/* coloco aca el contenido de la pagina en flex horizontal */}
{/* 
            <button onClick={() => cambiarSacarButton()}>Cambiar</button>
            <h1>{sacarButton ? 'sacar: true' : 'sacar: false'}</h1>
            <h1>{escondido ? 'escondido: true' : 'escondido: false'}</h1> */}

            <button className={'lg:w-[3.5vw] h-auto fixed bottom-1 left-1 z-50 hidden lg:block '} onClick={(e) => esconderList(e)}>
                <img src={(escondido ? arrowBtnRight : arrowBtnLeft)} alt="arrow" className='w-full h-full' />
            </button>

            <div className={' h-[100vh] flex lg:flex-row-reverse flex-col sacar2 ' + (sacarButton ? ' sacar-activo2' : ' sacar-desactivo2 ') + (escondido ? ' sacar-desactivo2 ' : '')} >
                <Calendar calendarRef={calendarRef} diaElegido={diaElegido} setDiaElegido={setDiaElegido} tareas={tareas} setTareas={setTareas} />
                <List setEscondido={setEscondido} escondido={escondido} setSacarButton={setSacarButton} sacarButton={sacarButton} calendarRef={calendarRef} activo={activo} setActivo={setActivo} tareas={tareas} setTareas={setTareas} diaElegido={diaElegido} setDiaElegido={setDiaElegido} eventos={eventos} setEventos={setEventos} fecha={fecha} setFecha={setFecha} />
            </div>
        </div>
    )
}

// lo exporto
export default Home