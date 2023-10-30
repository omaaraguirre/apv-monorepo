import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { showErrorToast } from '../config/toast'
import useAuth from '../hooks/useAuth'
import FormInput from '../components/FormInput'

const NuevoPassword = () => {
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [showForm, setShowForm] = useState(false)
  const { comprobarToken, cambiarPassword } = useAuth()
  const params = useParams()
  const { token } = params

  useEffect(() => {
    (async () => setShowForm(await comprobarToken(token)))()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    if ([password, repetirPassword].includes('')) {
      return showErrorToast('Campos vacíos')
    }
    if (password !== repetirPassword) {
      return showErrorToast('Las contraseñas no coinciden')
    }
    if (password.length < 6) {
      return showErrorToast('La contraseña debe ser de mínimo 6 caracteres')
    }

    const ok = await cambiarPassword(token, password)
    console.log(ok)
    if (ok) {
      setShowForm(false)
    }
  }

  return (
    <>
      <h1 className='text-primary font-black text-6xl text-center'>
        Reestablece tu Contraseña y Administra tus <span className='text-medium dark:text-light'>Pacientes</span>
      </h1>
      <div className='shadow-lg px-5 py-10 rounded-xl bg-lighter dark:bg-darker'>
        {
          showForm
            ? (
              <form
                onSubmit={handleSubmit}
                className='flex flex-col text-medium dark:text-light text-xl font-bold'
              >
                <FormInput
                  label='Nueva Contraseña'
                  type='password'
                  placeholder='••••••••••'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <FormInput
                  label='Repetir Nueva Contraseña'
                  type='password'
                  placeholder='••••••••••'
                  value={repetirPassword}
                  onChange={e => setRepetirPassword(e.target.value)}
                />
                <input
                  type='submit'
                  value='Guardar'
                  className='bg-secondary py-3 px-10 rounded-xl text-white font-bold mt-5 mx-auto hover:cursor-pointer hover:bg-primary transition-colors duration-300 md:w-auto'
                />
              </form>
              )
            : (
              <nav className='text-center text-black dark:text-light mt-5 flex flex-col gap-4 lg:flex-row lg:justify-between'>
                <Link className='opacity-70 hover:underline hover:opacity-100 transition-opacity duration-300' to='/olvide'>Solicitar Cambio</Link>
                <Link className='opacity-70 hover:underline hover:opacity-100 transition-opacity duration-300' to='/'>Inicia Sesión</Link>
              </nav>
              )
        }
      </div>
    </>
  )
}

export default NuevoPassword
