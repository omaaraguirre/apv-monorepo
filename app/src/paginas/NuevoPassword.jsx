import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const NuevoPassword = () => {
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()
  const { token } = params

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide/${token}`)
        setTokenValido(true)
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true })
        setTimeout(() => {
          setAlerta({})
        }, 3000)
      }
    }
    comprobarToken()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if ([password, repetirPassword].includes('')) {
      setAlerta({ msg: 'Campos vacíos', error: true })
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

    try {
      const url = `/veterinarios/olvide/${token}`
      const { data } = await clienteAxios.post(url, { password })
      setAlerta({ msg: data.msg, error: false })
      setTimeout(() => {
        setAlerta({})
      }, 3000)
      setPasswordModificado(true)
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
      <h1 className='text-indigo-600 font-black text-6xl'>
        Reestablece tu Contraseña y Administra tus <span className='text-black'>Pacientes</span>
      </h1>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta alerta={alerta} />}
        {tokenValido && (
          <>
            {!passwordModificado && (
              <form
                onSubmit={handleSubmit}
              >
                <div className='py-5'>
                  <label className='uppercase text-gray-600 block text-xl font-bold'>
                    Nueva Contraseña
                  </label>
                  <input
                    type='password'
                    placeholder='Tu Nueva Contraseña'
                    className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className='py-5'>
                  <label className='uppercase text-gray-600 block text-xl font-bold'>
                    Repeetir Nueva Contraseña
                  </label>
                  <input
                    type='password'
                    placeholder='Repite tu Nueva Contraseña'
                    className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                    value={repetirPassword}
                    onChange={e => setRepetirPassword(e.target.value)}
                  />
                </div>
                <input type='submit' value='Guardar' className='bg-indigo-700 w-full py-3  px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto' />
              </form>
            )}
            {passwordModificado && <Link className='block text-gray-500 mt-5 text-center' to='/'>Iniciar Sesión</Link>}
          </>
        )}
      </div>
    </>
  )
}

export default NuevoPassword
