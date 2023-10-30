import usePacientes from '../hooks/usePacientes'
import Paciente from './Paciente'

const ListadoPacientes = () => {
  const { pacientes } = usePacientes()

  return (
    <>
      <h2 className='text-dark dark:text-lighter font-black text-3xl text-center'>
        Listado de Pacientes
      </h2>
      <p className='text-medium dark:text-light text-xl my-5 text-center'>
        Administra tus <span className='text-primary font-bold'>Pacientes y Citas</span>
      </p>
      <div className='flex flex-col gap-10'>
        {
          pacientes.length
            ? pacientes.map(paciente => (<Paciente key={paciente.id} paciente={paciente} />))
            : <p className='text-medium dark:text-light text-center'>Comienza agregando pacientes y aparecerán aquí</p>
        }
      </div>
    </>
  )
}

export default ListadoPacientes
