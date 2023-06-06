// import ListElement
import ListElement from '../ListElement/ListElement'
// traigo el useState
import { useState, useEffect } from 'react'

// creo un componente vacio
const List = ({ activo, setActivo, tareas, setTareas }) => {
    let claseBtnRojo = "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
    let claseBtnAzul = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mr-1"

    // creo un estado para la tarea
    const [tarea, setTarea] = useState('')

    let cancelarForm = (e) => {
        e.preventDefault();
        // cambio el estado
        // si cancelo el formulario, borro el valor del input
        setTarea('')
    }

    // creo una funcion para agregar tareas al array tareas
    let agregarTarea = (e) => {
        e.preventDefault();
        if (tarea.length > 0) {
            // creo un objeto con la tarea y el id
            let tareaObjeto = {
                tarea: tarea,
                id: Date.now()
            }
            // agrego el objeto al array tareas
            setTareas([...tareas, tareaObjeto])
            // guardo el array en el localStorage
            localStorage.setItem('tareas', JSON.stringify([...tareas, tareaObjeto]))
            // cambio el estado
            // vacio el formulario
            setTarea('')
        } else {
            alert('No se puede agregar una tarea vacia')
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
        <div className='my-2'>
            <button className={claseBtnRojo + ' ml-1'} onClick={eliminarTodasLasTareas}>Eliminar todas las tareas</button>
            {/* si el estado es true, muestro el formulario */}
            <form>
                {/* creo un input responsivo con el estado tarea */}
                <input type="text" value={tarea} onChange={(e) => setTarea(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 w-1/4 mx-auto mb-2" />

                <button onClick={(e) => {
                    e.preventDefault();
                    agregarTarea(e)
                }}
                    className={claseBtnAzul}>Crear</button>

                <button onClick={(e) => cancelarForm(e)} className={claseBtnRojo}>Cancelar</button>
            </form>
            {/* reviso la longitud del localStorage y si es mayor a 0, muestro el array donde en listElement mapeo el array */}
            {tareas.length > 0 && (
                <div className='flex flex-col items-start inline-flex  border rounded p-4 bg-gray-100 mt-4 rounded-lg shadow-lg w-[80%]'>
                    {JSON.parse(localStorage.getItem('tareas')).map((tarea, index) => (
                        <div key={index}>
                            <ListElement
                                tarea={tarea.tarea}
                                index={index}
                                id={tarea.id}
                                listaTareas={tareas}
                                setListaTareas={setTareas}
                            />
                            {index !== JSON.parse(localStorage.getItem('tareas')).length - 1 && (
                                <div className="border-b w-full mt-2"></div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

// lo exporto
export default List
