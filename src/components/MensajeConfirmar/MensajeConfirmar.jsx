// creo un componente llamado MensajeConfirmar
const MensajeConfirmar = ({ activo, setActivo, tareas, setTareas }) => {
    let claseBtnRojo = "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
    let claseBtnAzul = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mr-1"


    // creo una funcion para cerrar la cortina
    const cerrar = (e) => {
        // cambio el estado a false
        e.preventDefault()
        setActivo(false)
    }

    // creo una funcion para eliminar todas las tareas
    const eliminarTodo = (e) => {
        e.preventDefault()
        // creo un array vacio
        let arrayVacio = []
        // guardo el array vacio en el localStorage
        localStorage.setItem('tareas', JSON.stringify(arrayVacio))
        // cambio el estado
        setTareas(arrayVacio)
        // cierro la cortina
        setActivo(false)
    }

    return (
        <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-8 z-20 ${activo ? 'block' : 'hidden'}`}>
            <h2 className="mb-4">¿Seguro quieres eliminar todas las tareas?</h2>
            <button onClick={eliminarTodo} className={claseBtnAzul}>Si</button>
            <button onClick={cerrar} className={claseBtnRojo}>No</button>
        </div>
    )
}

// lo exporto 
export default MensajeConfirmar