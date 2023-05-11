import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')

  const [alerta, setAlerta] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({ msg: 'Campos vacíos', error: true })
      setTimeout(() => {
        setAlerta({})
      }, 3000)
      return
    }

    if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setAlerta({ msg: 'Email no válido', error: true })
      setTimeout(() => {
        setAlerta({})
      }, 3000)
      return
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: 'Las contraseñas no coinciden', error: true })
      setTimeout(() => {
        setAlerta({})
      }, 3000)
      return
    }

    if (password.length < 6) {
      setAlerta({ msg: 'La contraseña debe ser de mínimo 6 caracteres', error: true })
      setTimeout(() => {
        setAlerta({})
      }, 3000)
      return
    }
    setAlerta({})

    try {
      const url = '/veterinarios'
      await clienteAxios.post(url, { nombre, email, password })
      setAlerta({ msg: 'Se han enviado las instrucciones de activación a tu correo', error: false })
      setTimeout(() => {
        setAlerta({})
      }, 3000)
      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true })
      setTimeout(() => {
        setAlerta({})
      }, 3000)
    }
  }

  const { msg } = alerta

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Crea tu Cuenta y Administra tus <span className='text-black'>Pacientes</span>
        </h1>
      </div>
      <div className='mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta alerta={alerta} />}
        <form
          onSubmit={handleSubmit}
        >
          <div className='py-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Nombre
            </label>
            <input
              type='text'
              placeholder='Tu Nombre'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
          <div className='py-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Correo
            </label>
            <input
              type='email'
              placeholder='Tu correo'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='py-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Contraseña
            </label>
            <input
              type='password'
              placeholder='Tu Contraseña'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='py-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Repeetir Contraseña
            </label>
            <input
              type='password'
              placeholder='Repite tu Contraseña'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>
          <input type='submit' value='Registrar' className='bg-indigo-700 w-full py-3  px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto' />
        </form>
        <nav className='text-center mt-10 flex flex-col gap-4 lg:flex-row lg:justify-between'>
          <Link className='block text-gray-500' to='/'>¿Ya tienes una cuenta? Inicia Sesión</Link>
          <Link className='block text-gray-500' to='/olvide'>Olvidé mi contraseña</Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar
