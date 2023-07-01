// importo useState
import { useState } from 'react'
import deleteBtn from '../../media/delete-btn.png'
import editBtn from '../../media/edit-btn.png'

// creo un componente vacio
const ListElement = ({ tarea, id, index, listaTareas, setListaTareas }) => {
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
        <div className="flex my-1 text-center py-1">
            {/* muestro la id y luego la tarea */}
            {/* creo un input de form para aplicar el checked cuando quieras marcar que la tarea esta completada     */}
            <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} className="w-[7.5%]" />
            <div className='w-[72.5%] text-base mx-3 flex justify-center items-center'>
                <p className={`w-full ${checked ? 'line-through' : ''}`}>{tarea}</p>
            </div>

            <div className='w-[20%] flex justify-center items-center'>
                <button className="w-[2vw] text-white font-medium rounded-lg text-sm" onClick={(e) => eliminarElemento(e)}>
                    <img src={editBtn} alt="editBtn" className=' object-cover' />
                </button>

                <button className="w-[2vw] ml-auto text-white font-medium rounded-lg text-sm ml-2" onClick={(e) => eliminarElemento(e)}>
                    <img src={deleteBtn} alt="deleteBtn" className=' object-cover' />
                </button>
            </div>

        </div>
    )
}

// lo exporto
export default ListElement