import { useState } from 'react'
import AdminNav from '../components/AdminNav'
import useAuth from '../hooks/useAuth'
import { showErrorToast } from '../config/toast'
import FormInput from '../components/FormInput'

const CambiarContraseña = () => {
  const { actualizarPassword } = useAuth()
  const [passwordActual, setPasswordActual] = useState('')
  const [nuevoPassword, setNuevoPassword] = useState('')
  const [nuevoPassword2, setNuevoPassword2] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    if ([passwordActual, nuevoPassword, nuevoPassword2].includes('')) {
      return showErrorToast('Todos los campos son obligatorios')
    }
    if (nuevoPassword.length < 6) {
      return showErrorToast('La nueva contraseña debe ser de mínimo 6 caracteres')
    }
    if (nuevoPassword !== nuevoPassword2) {
      return showErrorToast('Las nuevas contraseñas no coinciden')
    }

    const ok = await actualizarPassword({ passwordActual, nuevoPassword })
    if (ok) {
      setPasswordActual('')
      setNuevoPassword('')
      setNuevoPassword2('')
    }
  }

  return (
    <>
      <AdminNav />
      <h2 className='text-dark dark:text-lighter font-black text-3xl text-center mt-10'>Cambiar Contraseña</h2>
      <p className='text-medium dark:text-light text-xl my-5 text-center'>
        Modifica tu <span className='text-primary font-bold'>Contraseña</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col text-medium dark:text-light font-bold shadow-lg p-5 rounded-xl bg-lighter dark:bg-darker w-[min(100%,600px)] mx-auto'
      >
        <FormInput
          label='Contraseña Actual'
          type='password'
          placeholder='•••••••••'
          value={passwordActual}
          onChange={e => setPasswordActual(e.target.value)}
          autoFocus
        />
        <FormInput
          label='Nueva Contraseña'
          type='password'
          placeholder='•••••••••'
          value={nuevoPassword}
          onChange={e => setNuevoPassword(e.target.value)}
        />
        <FormInput
          label='Repetir Nueva Contraseña'
          type='password'
          placeholder='•••••••••'
          value={nuevoPassword2}
          onChange={e => setNuevoPassword2(e.target.value)}
        />
        <input
          type='submit'
          value='Guardar'
          className='bg-secondary py-3 px-10 rounded-xl text-white font-bold mt-5 mx-auto hover:cursor-pointer hover:bg-primary transition-colors duration-300 md:w-auto'
        />
      </form>
    </>
  )
}

export default CambiarContraseña
