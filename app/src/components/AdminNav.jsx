import { Link } from 'react-router-dom'

const AdminNav = () => {
  return (
    <nav className='flex gap-3 justify-center font-bold uppercase text-medium dark:text-light'>
      <Link
        to='/admin/perfil'
        className='hover:text-primary transition-colors duration-300'
      >
        Perfil
      </Link>
      <Link
        to='/admin/cambiarcontraseña'
        className='hover:text-primary transition-colors duration-300'
      >
        Cambiar Contraseña
      </Link>
    </nav>
  )
}

export default AdminNav
