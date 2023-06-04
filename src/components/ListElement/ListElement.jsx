// importo useState
import { useState } from 'react'

// creo un componente vacio
const ListElement = ({tarea, id, index, listaTareas, setListaTareas}) => {
    // creo un estado de checked
    const [checked, setChecked] = useState(false)    
    
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

    return (
        <div className="flex w-full">
            {/* muestro la id y luego la tarea */}    
            {/* creo un input de form para aplicar el checked cuando quieras marcar que la tarea esta completada     */}
            <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} className="mr-4" />
            <p className={`inline mr-4 text-xl ${checked ? 'line-through' : ''}`}><strong>{index + 1}</strong> - {tarea}</p>
            <button className="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-1 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mr-1" onClick={(e) => eliminarElemento(e)}><strong>X</strong></button>
        </div>
    )
}

// lo exporto
export default ListElement