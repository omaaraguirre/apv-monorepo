import AdminNav from './AdminNav'
import useAuth from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import Alerta from '../components/Alerta'

const EditarPerfil = () => {
  const { auth, actualizarPerfil, mostrarAlerta, alerta } = useAuth()

  const [perfil, setPerfil] = useState({})

  useEffect(() => {
    setPerfil(auth)
  }, [auth])

  const handleSubmit = async e => {
    e.preventDefault()
    const { nombre, email, telefono, web } = perfil
    if (nombre.trim() === '') { return mostrarAlerta('Nombre es obligatorio', true) }
    if (email.trim() === '') { return mostrarAlerta('Correo es obligatorio', true) }
    if (!email.trim().toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) { return mostrarAlerta('Correo no válido', true) }
    if (web && !web.trim().match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi)) { return mostrarAlerta('Sitio Web no válido', true) }
    if (telefono && !telefono.trim().match(/^\d{10}$/)) { return mostrarAlerta('Teléfono no válido', true) }

    await actualizarPerfil(perfil)
  }

  const { msg } = alerta

  return (
    <>
      <AdminNav />
      <h2 className='font-black text-3xl text-center mt-10'>Editar Perfil</h2>
      <p className='text-xl mt-5 mb-10 text-center'>
        Modifica tu <span className='text-indigo-600 font-bold'>Información</span>
      </p>
      <div className='flex justify-center'>
        <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className='my-3'>
              <label className='uppercase font-bold text-gray-600'>Nombre</label>
              <input
                type='text'
                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                name='nombre'
                value={perfil.nombre || ''}
                onChange={e => setPerfil({
                  ...perfil, [e.target.name]: e.target.value
                })}
              />
            </div>
            <div className='my-3'>
              <label className='uppercase font-bold text-gray-600'>Sitio Web</label>
              <input
                type='text'
                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                name='web'
                value={perfil.web || ''}
                onChange={e => setPerfil({
                  ...perfil, [e.target.name]: e.target.value
                })}
              />
            </div>
            <div className='my-3'>
              <label className='uppercase font-bold text-gray-600'>Teléfono</label>
              <input
                type='text'
                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                name='telefono'
                value={perfil.telefono || ''}
                onChange={e => setPerfil({
                  ...perfil, [e.target.name]: e.target.value
                })}
              />
            </div>
            <div className='my-3'>
              <label className='uppercase font-bold text-gray-600'>Correo</label>
              <input
                type='text'
                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                name='email'
                value={perfil.email || ''}
                onChange={e => setPerfil({
                  ...perfil, [e.target.name]: e.target.value
                })}
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

export default EditarPerfil
