// importo useState
import { useState } from 'react'
import deleteBtn from '../../media/delete-btn.png'
import editBtn from '../../media/edit-btn.png'

// creo un componente vacio
const ListElement = ({ tarea, id, index, listaTareas, setListaTareas, color, calendarRef }) => {
    // eslint-disable-next-line
    const obtenerColor = () => {
        return color === 'blue' ? false : true
    }

    const [checked, setChecked] = useState(obtenerColor())

    const cambiarChecked = () => {
        var calendarApi = calendarRef?.current.getApi()
        let nuevoColor = checked ? 'blue' : 'red'
        if (calendarApi) {
            setChecked(!checked)
            // Obtener la referencia al evento que deseas actualizar
            const evento = calendarApi.getEventById(id);
            // Llamar al método setProp() para actualizar la propiedad "color"
            evento.setProp('color', nuevoColor);
            
            // obtengo todos los eventos en una variable
            let copiaTareas = [...listaTareas]
            // busco el evento con la misma id y le cambio el color
            // eslint-disable-next-line
            copiaTareas.map(tarea => {
                if (tarea.id === id) {
                    tarea.color = nuevoColor
                } 
            })
            // guardo el array en el localStorage
            localStorage.setItem('tareas', JSON.stringify(copiaTareas))
            // lo aplico al estado de listaTareas
            setListaTareas(copiaTareas)
        } else {
            console.log('No se pudo actualizar el color del evento');
        }
    }

    // creo la funcion eliminarElemento que buscara el elemento por su id dentro del localStorage y lo eliminara
    const eliminarElemento = (e) => {
        e.preventDefault();
        // creo una variable que almacene el array de tareas del localStorage
        let tareas = JSON.parse(localStorage.getItem('tareas'))
        // creo una variable que almacene el array de tareas filtrado
        let tareasFiltradas = tareas.filter(tarea => tarea.id !== id)
        // guardo el array en el localStorage
        localStorage.setItem('tareas', JSON.stringify(tareasFiltradas))
        // lo aplico al estado de listaTareas
        setListaTareas(tareasFiltradas)
        console.log('la id es: ', id)
        console.log('listo: ', tareasFiltradas)
    }

    // creo la funcion editarElemento para editar el elemento
    const editarElemento = (e) => {
        e.preventDefault();
        // creo una variable que almacene el array de tareas del localStorage
        let tareas = JSON.parse(localStorage.getItem('tareas'))
        // ubico la tarea con la misma id y reemplazo el titulo con prompt
        tareas.map(tarea => {
            if (tarea.id === id) {
                tarea.title = prompt('Ingrese el nuevo titulo de la tarea')
                return 1 
            } else return 0
        })
        // guardo el array en el localStorage
        localStorage.setItem('tareas', JSON.stringify(tareas))
        // lo aplico al estado de listaTareas
        setListaTareas(tareas)
    }
    return (
        <div className="flex my-1 text-center py-1">
            {/* muestro la id y luego la tarea */}
            {/* creo un input de form para aplicar el checked cuando quieras marcar que la tarea esta completada     */}
            <input type="checkbox" checked={checked} onChange={(e) => cambiarChecked(e)} className="w-[7.5%]" />
            <div className='w-[72.5%] text-base mx-3 flex justify-center items-center'>
                <p className={`w-full ${checked ? 'line-through' : ''}`}>{tarea}</p>
            </div>

            <div className='w-[20%] flex justify-center items-center'>
                <button className="w-[8vw] lg:w-[2vw] text-white font-medium rounded-lg lg:text-sm text-base" onClick={(e) => editarElemento(e)}>
                    <img src={editBtn} alt="editBtn" className=' object-cover' />
                </button>

                <button className="w-[8vw] lg:w-[2vw] ml-auto text-white font-medium rounded-lg lg:text-sm text-base ml-2" onClick={(e) => eliminarElemento(e)}>
                    <img src={deleteBtn} alt="deleteBtn" className=' object-cover' />
                </button>
            </div>

        </div>
    )
}

// lo exporto
export default ListElement