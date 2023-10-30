import usePacientes from '../hooks/usePacientes'
import ListadoPacientes from '../components/ListadoPacientes'
import Formulario from '../components/Formulario'

const AdministrarPacientes = () => {
  const { mostrarFormulario, setMostrarFormulario } = usePacientes()

  return (
    <div className='flex flex-col gap-10 md:flex-row'>
      <button
        type='button'
        className='bg-secondary text-white font-bold uppercase mx-10 p-3 rounded-md md:hidden'
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        {mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}
      </button>
      <div className={`${mostrarFormulario ? 'max-h-[800px]' : 'max-h-0'} overflow-hidden transition-all duration-500 md:max-h-max md:w-1/2 lg:w-2/5`}>
        <Formulario />
      </div>
      <div className='md:w-1/2 lg:w-3/5'>
        <ListadoPacientes />
      </div>
    </div>
  )
}

export default AdministrarPacientes
