// import ListElement
import ListElement from '../ListElement/ListElement'
import bgBanner from '../../media/bg-banner.jpg'
// importo todo-icon.png
import todoIcon from '../../media/todo-icon.png'
// traigo el useState
import { useState, useEffect } from 'react'
// importo List.css
import './List.css'

// creo un componente vacio
const List = ({ setSacarButton, setEscondido, escondido, calendarRef, activo, setActivo, tareas, setTareas, diaElegido, setDiaElegido, eventos, setEventos, fecha, setFecha, sacarButton }) => {
    // creo un estado para la tarea
    const [tarea, setTarea] = useState('')
    // creo un estado con un booleando llamado advertir
    const [advertir, setAdvertir] = useState(false)

    // creo una funcion para agregar tareas al array tareas
    let agregarTarea = (e) => {
        e.preventDefault();
        if (tarea.length > 0 && diaElegido !== null) {
            // creo un objeto con la tarea y el id
            let tareaObjeto = {
                title: tarea,
                color: 'blue',
                date: diaElegido,
                id: Date.now(),
            }

            if (fecha !== '') {
                tareaObjeto.allDay = false;
                tareaObjeto.start = new Date(diaElegido + 'T' + fecha + ':00')
            }

            // agrego el objeto al array tareas
            setTareas([...tareas, tareaObjeto])
            // guardo el array en el localStorage
            localStorage.setItem('tareas', JSON.stringify([...tareas, tareaObjeto]))
            // cambio el estado
            // vacio el formulario
            setTarea('')
            setFecha('')
        } else {
            setAdvertir(true)
            setTimeout(() => {
                setAdvertir(false)
            }, 2000)
        }
    }

    const eliminarTodasLasTareas = (e) => {
        e.preventDefault();
        setActivo(true);
    };

    // creo un useEffect para que se ejecute una sola vez donde reviso si hay algo en localStorage de tareas, si es asi lo asigno al estado tareas
    useEffect(() => {
        if (localStorage.getItem('tareas')) {
            setTareas(JSON.parse(localStorage.getItem('tareas')))
        }
    }, [setTareas])

    return (
        <div className={'bg-black w-[100%] lg:w-[30%] pb-4 lg:pb-8 bg-cover sacar lg:h-full ' + (escondido ? ' hidden w-[0]' : '')} style={{ backgroundImage: `url(${bgBanner})` }}>
            {/* si el estado es true, muestro el formulario */}
            {/* agrego la imagen todoIcon como icono de cabecera */}
            <div className='flex flex-col items-center justify-center h-full lg:mt-0 mt-1'>
                <img src={todoIcon} alt="todo-icon" className='hidden lg:block w-[10%] lg:w-[35%] mx-auto' />
                <div className='lg:w-[80%]'>
                    {/* creo un input responsivo con el estado tarea */}
                    <h2 className='text-white mb-2 lg:mt-0 mt-2 font-bold text-2xl lg:text-base'>Escribe la tarea</h2>
                    <input type="text" value={tarea} onChange={(e) => setTarea(e.target.value)} class={"bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 w-[60vw] lg:w-[85%] mx-auto lg:mb-4 mb-4 lg:mb-2  " + (advertir && "border-red-600 border-4 animate-bounce  ")} />

                    {/* creo un input para elegir la hora del dia para la tarea*/}
                    <strong className='text-white mt-4 text-2xl lg:text-base '>Escribe la hora</strong>
                    <h3 className='text-gray-300 text-base lg:text-xs mb-2 lg:mb-2'>( Ejemplo: 04:52 a.m )</h3>
                    <input type="time" value={fecha} onChange={(e) => setFecha(e.target.value)} class={"bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 lg:w-[60] w-[35vw] mx-auto lg:mb-2 mb-2"} />

                    <div className='flex flex-col justify-center items-center'>
                        <strong className='text-white lg:mb-4 mb-2 lg:text-base text-2xl'>{diaElegido}</strong>
                        <button onClick={(e) => {
                            e.preventDefault();
                            agregarTarea(e)
                        }}
                            className={"lg:mt-0 mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-2xl lg:text-base px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-[25vw] lg:w-[40%] mb-6 lg:mb-4"}>Crear</button>

                        {/* boton para cancelar descartado */}
                        {/* <button onClick={(e) => cancelarForm(e)} className={"focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-[40%]"}>Cancelar</button> */}
                    </div>
                </div>
                {/* reviso la longitud del localStorage y si es mayor a 0, muestro el array donde en listElement mapeo el array */}
                {tareas.filter(evento => evento.date === diaElegido).length > 0 && (
                    <div className='h-[18vh] overflow-auto w-full'>
                        <div className='flex flex-col items-start inline-flex border rounded px-2 bg-gray-100 rounded-lg shadow-lg w-[90%]'>
                            {tareas.filter(evento => evento.date === diaElegido).sort((a, b) => a.title - b.title).sort((a, b) => a.title.localeCompare(b.title)).map((tarea, index) => (
                                <div key={index} className='w-full'>
                                    <ListElement
                                        calendarRef={calendarRef}
                                        tarea={tarea.title}
                                        index={index}
                                        id={tarea.id}
                                        listaTareas={tareas}
                                        color={tarea.color}
                                        setListaTareas={setTareas}
                                    />
                                    {index !== JSON.parse(localStorage.getItem('tareas')).length - 1 && (
                                        <div className="border-b w-full mt-2"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <button className={'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg lg:text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 mt-4 mb-0'} onClick={eliminarTodasLasTareas}>Eliminar todas las tareas</button>
            </div>
        </div>
    )
}

// lo exporto
export default List
