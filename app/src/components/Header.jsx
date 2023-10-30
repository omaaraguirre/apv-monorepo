import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import ThemeButton from './ThemeButton'

const Header = () => {
  const { cerrarSesion } = useAuth()

  return (
    <header className='py-10 bg-primary dark:bg-secondary'>
      <div className='container mx-auto flex flex-col lg:flex-row justify-between items-center gap-5'>
        <h1 className='font-bold text-2xl text-lighter text-center'>
          Administrador de Pacientes de <span className='text-white font-black'>Veterinaria</span>
        </h1>
        <nav className='flex gap-4 flex-col items-center lg:flex-row text-white text-md uppercase font-bold'>
          <Link className='' to='/admin'>Pacientes</Link>
          <Link className='' to='/admin/perfil'>Perfil</Link>
          <button
            className='text-white text-md uppercase font-bold'
            type='button'
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>
          <ThemeButton />
        </nav>
      </div>
    </header>
  )
}

export default Header
