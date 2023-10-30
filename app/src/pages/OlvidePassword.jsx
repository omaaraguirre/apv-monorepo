import { Link } from 'react-router-dom'
import { useState } from 'react'
import { showErrorToast } from '../config/toast'
import useAuth from '../hooks/useAuth'
import FormInput from '../components/FormInput'

const OlvidePassword = () => {
  const [email, setEmail] = useState('')
  const { solicitarCambioPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (email === '') {
      return showErrorToast('Email obligatorio', true)
    }

    if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      return showErrorToast('Email no válido', true)
    }

    const ok = await solicitarCambioPassword({ email })
    if (ok) setEmail('')
  }

  return (
    <>
      <h1 className='text-primary font-black text-6xl text-center'>
        Recupera tu Acceso y no pierdas tus <span className='text-medium dark:text-light'>Pacientes</span>
      </h1>
      <div className='shadow-lg px-5 py-10 rounded-xl bg-lighter dark:bg-darker'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col text-medium dark:text-light text-xl font-bold'
        >
          <FormInput
            label='Correo'
            type='email'
            placeholder='john_doe@domain.com'
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoFocus
          />
          <input
            type='submit'
            value='Enviar'
            className='bg-secondary py-3 px-10 rounded-xl text-white font-bold mt-5 mx-auto hover:cursor-pointer hover:bg-primary transition-colors duration-300 md:w-auto'
          />
        </form>
        <nav className='text-center text-black dark:text-light mt-5 flex flex-col gap-4 lg:flex-row lg:justify-between'>
          <Link className='opacity-70 hover:underline hover:opacity-100 transition-opacity duration-300' to='/'>¿Recordaste tu contraseña? Inicia Sesión</Link>
          <Link className='opacity-70 hover:underline hover:opacity-100 transition-opacity duration-300' to='/registrar'>¿No tienes una cuenta? Regístrate</Link>
        </nav>
      </div>
    </>
  )
}

export default OlvidePassword
