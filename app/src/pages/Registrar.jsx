import { useState } from 'react'
import { Link } from 'react-router-dom'
import { showErrorToast } from '../config/toast'
import useAuth from '../hooks/useAuth'
import FormInput from '../components/FormInput'

const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const { register } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()

    if ([nombre, email, password, repetirPassword].includes('')) {
      return showErrorToast('Todos los campos son obligatorios', true)
    }

    if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      return showErrorToast('Email no válido', true)
    }

    if (password !== repetirPassword) {
      return showErrorToast('Las contraseñas no coinciden', true)
    }

    if (password.length < 6) {
      return showErrorToast('La contraseña debe ser de mínimo 6 caracteres', true)
    }

    const ok = await register({ nombre, email, password })
    if (ok) {
      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')
    }
  }

  return (
    <>
      <h1 className='text-primary font-black text-6xl text-center'>
        Crea tu Cuenta y Administra tus <span className='text-medium dark:text-light'>Pacientes</span>
      </h1>
      <div className='shadow-lg px-5 py-10 rounded-xl bg-lighter dark:bg-darker'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col text-medium dark:text-light text-xl font-bold'
        >
          <FormInput
            label='Nombre'
            placeholder='John Doe'
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            autoFocus
          />
          <FormInput
            label='Correo'
            type='email'
            placeholder='john_doe@email.com'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <FormInput
            label='Contraseña'
            type='password'
            placeholder='••••••••••'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <FormInput
            label='Repetir Contraseña'
            type='password'
            placeholder='••••••••••'
            value={repetirPassword}
            onChange={e => setRepetirPassword(e.target.value)}
          />
          <input
            type='submit'
            value='Registrar'
            className='bg-secondary py-3 px-10 rounded-xl text-white font-bold mt-5 mx-auto hover:cursor-pointer hover:bg-primary transition-colors duration-300 md:w-auto'
          />
        </form>
        <nav className='text-center text-black dark:text-light mt-5 flex flex-col gap-4 lg:flex-row lg:justify-between'>
          <Link className='opacity-70 hover:underline hover:opacity-100 transition-opacity duration-300' to='/'>¿Ya tienes una cuenta? Inicia Sesión</Link>
          <Link className='opacity-70 hover:underline hover:opacity-100 transition-opacity duration-300' to='/olvide'>Olvidé mi contraseña</Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar
