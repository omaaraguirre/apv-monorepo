import usePacientes from '../hooks/usePacientes'
import useModal from '../hooks/useModal'

const Paciente = ({ paciente }) => {
  const { email, fecha, nombre, propietario, sintomas, id } = paciente
  const { setEdicion, eliminarPaciente } = usePacientes()
  const { setOnConfirm, setShowModal } = useModal()

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha)
    return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(nuevaFecha)
  }

  const handleEdit = () => setEdicion(paciente)

  const handleDelete = () => {
    setOnConfirm(() => () => eliminarPaciente(id))
    setShowModal(true)
  }

  return (
    <div className='flex flex-col gap-1 font-bold uppercase text-secondary dark:text-primary bg-lighter dark:bg-darker shadow-md p-3 md:p-5 rounded-xl w-[min(100%,500px)] mx-auto'>
      <p className='grid grid-cols-[1fr,2fr] gap-3 text-right'>
        Nombre: <span className='text-left font-normal normal-case text-dark dark:text-lighter'>{nombre}</span>
      </p>
      <p className='grid grid-cols-[1fr,2fr] gap-3 text-right'>
        Propietario: <span className='text-left font-normal normal-case text-dark dark:text-lighter'>{propietario}</span>
      </p>
      <p className='grid grid-cols-[1fr,2fr] gap-3 text-right'>
        Correo: <span className='text-left font-normal normal-case text-dark dark:text-lighter'>{email}</span>
      </p>
      <p className='grid grid-cols-[1fr,2fr] gap-3 text-right'>
        Fecha: <span className='text-left font-normal normal-case text-dark dark:text-lighter'>{formatearFecha(fecha)}</span>
      </p>
      <p className='grid grid-cols-[1fr,2fr] gap-3 text-right'>
        Síontomas: <span className='text-left font-normal normal-case text-dark dark:text-lighter'>{sintomas}</span>
      </p>
      <div className='flex gap-5 items-center mx-auto mt-5'>
        <button
          type='button'
          className='bg-secondary py-2 px-5 rounded-xl text-white font-bold hover:cursor-pointer hover:bg-primary transition-colors duration-300 md:w-auto'
          onClick={handleEdit}
        >
          Editar
        </button>
        <button
          type='button'
          className='bg-medium py-2 px-5 rounded-xl text-white font-bold hover:cursor-pointer hover:bg-red transition-colors duration-300 md:w-auto'
          onClick={handleDelete}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default Paciente
