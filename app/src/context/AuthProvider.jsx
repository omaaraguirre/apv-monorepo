import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/axios'

const AuthContext = createContext()

export const AuthProvider = (props) => {
  const { children } = props
  const [auth, setAuth] = useState({})
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = window.localStorage.getItem('token')
      if (!token) {
        setCargando(false)
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await clienteAxios('/veterinarios/perfil', config)
        setAuth(data)
      } catch (error) {
        setAuth({})
      }
      setCargando(false)
    }
    autenticarUsuario()
  }, [])

  const cerrarSesion = () => {
    window.localStorage.removeItem('token')
    setAuth({})
  }

  const actualizarPerfil = async (datos) => {
    const token = window.localStorage.getItem('token')
    if (!token) { return setCargando(false) }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const url = `/veterinarios/perfil/${datos._id}`
      await clienteAxios.put(url, datos, config)

      mostrarAlerta('Cambios guardados')
    } catch (error) {
      mostrarAlerta(error.response.data.msg, true)
    }
  }

  const actualizarPassword = async (datos) => {
    const token = window.localStorage.getItem('token')
    if (!token) { return setCargando(false) }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const url = '/veterinarios/actualizarpassword'
      const { data } = await clienteAxios.put(url, datos, config)
      console.log(data)
      mostrarAlerta('Cambios guardados')
    } catch (error) {
      mostrarAlerta(error.response.data.msg, true)
    }
  }

  const mostrarAlerta = (msg, error = false) => {
    setAlerta({ msg, error })
    setTimeout(() => {
      setAlerta({})
    }, 3000)
  }

  return (
    <AuthContext.Provider value={{
      auth,
      setAuth,
      cargando,
      cerrarSesion,
      actualizarPerfil,
      actualizarPassword,
      mostrarAlerta,
      alerta
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
