import { Link } from 'react-router-dom'

const AdminNav = () => {
  return (
    <nav className='flex gap-3 justify-center'>
      <Link
        to='/admin/perfil'
        className='font-bold uppercase text-gray-500'
      >Perfil
      </Link>
      <Link
        to='/admin/cambiarcontraseña'
        className='font-bold uppercase text-gray-500'
      >Cambiar Contraseña
      </Link>
    </nav>
  )
}

export default AdminNav
