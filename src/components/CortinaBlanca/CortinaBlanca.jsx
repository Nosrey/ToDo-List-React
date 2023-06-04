// creo un nuevo componente con un fondo transparente y un boton para cerrar la cortina que recibe un valor de true o false para mostrar o no la cortina y que el boton de cerrar lo pondra en false, sera usando un estado de setActivo
const CortinaBlanca = ({activo, setActivo}) => {
    // creo una funcion para cerrar la cortina
    const cerrarCortina = () => {
        // cambio el estado a false
        setActivo(false)
    }
    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 z-10 ${activo ? 'block' : 'hidden'}`}>
            <button className="absolute top-0 right-0 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={cerrarCortina}>X</button>
        </div>
    )
}

// lo exporto
export default CortinaBlanca