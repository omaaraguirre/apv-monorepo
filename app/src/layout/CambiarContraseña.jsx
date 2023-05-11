import { useState } from 'react'
import AdminNav from './AdminNav'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'

const CambiarContraseña = () => {
  const { actualizarPassword, alerta, mostrarAlerta } = useAuth()
  const [passwordActual, setPasswordActual] = useState('')
  const [nuevoPassword, setNuevoPassword] = useState('')
  const [nuevoPassword2, setNuevoPassword2] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    if ([passwordActual, nuevoPassword, nuevoPassword2].includes('')) { return mostrarAlerta('Todos los campos son obligatorios', true) }
    if (nuevoPassword.length < 6) { return mostrarAlerta('La nueva contraseña debe ser de mínimo 6 caracteres', true) }
    if (nuevoPassword !== nuevoPassword2) { return mostrarAlerta('Las nuevas contraseñas no coinciden', true) }

    await actualizarPassword({ passwordActual, nuevoPassword })
  }

  const { msg } = alerta

  return (
    <>
      <AdminNav />
      <h2 className='font-black text-3xl text-center mt-10'>Cambiar Contraseña</h2>
      <p className='text-xl mt-5 mb-10 text-center'>
        Modifica tu <span className='text-indigo-600 font-bold'>Contraseña</span>
      </p>
      <div className='flex justify-center'>
        <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className='my-3'>
              <label className='uppercase font-bold text-gray-600'>Contraseña Actual</label>
              <input
                type='password'
                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                name='passwordActual'
                value={passwordActual}
                onChange={e => setPasswordActual(e.target.value)}
              />
            </div>
            <div className='my-3'>
              <label className='uppercase font-bold text-gray-600'>Nueva Contraseña</label>
              <input
                type='password'
                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                name='nuevoPassword'
                value={nuevoPassword}
                onChange={e => setNuevoPassword(e.target.value)}
              />
            </div>
            <div className='my-3'>
              <label className='uppercase font-bold text-gray-600'>Repite tu Nueva Contraseña</label>
              <input
                type='password'
                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                name='nuevoPassword2'
                value={nuevoPassword2}
                onChange={e => setNuevoPassword2(e.target.value)}
              />
            </div>

            <input
              type='submit'
              value='Guardar'
              className='bg-indigo-700 hover:bg-indigo-800 hover:cursor-pointer px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 '
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default CambiarContraseña
