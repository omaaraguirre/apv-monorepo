import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const ConfirmarCuenta = () => {
  const { confirmarCuenta } = useAuth()
  const params = useParams()

  useEffect(() => {
    const { token } = params
    confirmarCuenta(token)
  }, [])

  return (
    <>
      <h1 className='text-primary font-black text-6xl text-center'>
        Confirma tu Cuenta y Administra tus <span className='text-medium dark:text-light'>Pacientes</span>
      </h1>
      <div className='shadow-lg px-5 py-10 rounded-xl bg-lighter dark:bg-darker'>
        <nav className='text-center text-black dark:text-light'>
          <Link className='opacity-70 hover:underline hover:opacity-100 transition-opacity duration-300' to='/'>Inicia Sesión</Link>
        </nav>
      </div>
    </>
  )
}

export default ConfirmarCuenta
