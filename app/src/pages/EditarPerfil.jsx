import AdminNav from '../components/AdminNav'
import useAuth from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import { showErrorToast } from '../config/toast'
import FormInput from '../components/FormInput'

const EditarPerfil = () => {
  const { auth, actualizarPerfil } = useAuth()
  const [perfil, setPerfil] = useState({
    nombre: '',
    web: '',
    telefono: '',
    email: ''
  })

  useEffect(() => {
    setPerfil(auth)
  }, [auth])

  const handleChange = e => setPerfil({
    ...perfil, [e.target.name]: e.target.value
  })

  const handleSubmit = async e => {
    e.preventDefault()
    const { nombre, email, telefono, web } = perfil
    if (nombre.trim() === '') {
      return showErrorToast('Nombre es obligatorio', true)
    }
    if (email.trim() === '') {
      return showErrorToast('Correo es obligatorio', true)
    }
    if (!email.trim().toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      return showErrorToast('Correo no válido', true)
    }
    if (web && !web.trim().match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi)) {
      return showErrorToast('Sitio Web no válido', true)
    }
    if (telefono && !telefono.trim().match(/^\d{10}$/)) {
      return showErrorToast('Teléfono no válido', true)
    }

    await actualizarPerfil(perfil)
  }

  return (
    <>
      <AdminNav />
      <h2 className='text-dark dark:text-lighter font-black text-3xl text-center mt-10'>
        Editar Perfil
      </h2>
      <p className='text-medium dark:text-light text-xl my-5 text-center'>
        Modifica tu <span className='text-primary font-bold'>Información</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col text-medium dark:text-light font-bold shadow-lg p-5 rounded-xl bg-lighter dark:bg-darker w-[min(100%,600px)] mx-auto'
      >
        <FormInput
          name='nombre'
          label='Nombre'
          type='text'
          placeholder='John Doe'
          value={perfil.nombre}
          onChange={handleChange}
          autoFocus
        />
        <FormInput
          name='web'
          label='Sitio Web'
          type='text'
          placeholder='https://www.example.com'
          value={perfil.web}
          onChange={handleChange}
        />
        <FormInput
          name='telefono'
          label='Teléfono'
          type='tel'
          placeholder='1234567890'
          value={perfil.telefono}
          onChange={handleChange}
        />
        <FormInput
          name='email'
          label='Correo'
          type='email'
          placeholder='john_doe@domain.com'
          value={perfil.email}
          onChange={handleChange}
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

export default EditarPerfil
