import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { showErrorToast, showSuccessToast } from '../config/toast'
import { activateUser, changePassword, getUserData, requestPasswordChange, signIn, signUp, updateInfo, updatePassword, validateToken } from '../services/Auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = window.localStorage.getItem('token')
      if (!token) return setCargando(false)

      const { data, ok } = await getUserData(token)
      setAuth(ok ? data : {})
      !ok && showErrorToast(data.msg)

      setCargando(false)
    }
    autenticarUsuario()
  }, [])

  const register = async ({ nombre, email, password }) => {
    const { data, ok } = await signUp({ nombre, email, password })
    if (ok) {
      showSuccessToast(`Se han enviado las instrucciones de activación a ${data.email}`)
    } else {
      showErrorToast(data.msg)
    }
    return ok
  }

  const confirmarCuenta = async token => {
    const { data, ok } = await activateUser(token)
    setCargando(false)
    if (ok) showSuccessToast(data.msg)
    else showErrorToast(data.msg)
    return ok
  }

  const solicitarCambioPassword = async ({ email }) => {
    const { data, ok } = await requestPasswordChange(email)
    if (ok) showSuccessToast(data.msg)
    else showErrorToast(data.msg)
    return ok
  }

  const comprobarToken = async token => {
    const { data, ok } = await validateToken(token)
    if (!ok) showErrorToast(data.msg)
    return ok
  }

  const cambiarPassword = async (token, password) => {
    const { data, ok } = await changePassword(token, password)
    if (ok) showSuccessToast(data.msg)
    else showErrorToast(data.msg)
    return ok
  }

  const login = async ({ email, password }) => {
    const { data, ok } = await signIn({ email, password })
    if (ok) {
      window.localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/admin')
    } else {
      showErrorToast(data.msg)
    }
  }

  const cerrarSesion = () => {
    window.localStorage.removeItem('token')
    setAuth({})
    navigate('/')
  }

  const actualizarPerfil = async info => {
    const token = window.localStorage.getItem('token')
    if (!token) { return setCargando(false) }
    const { data, ok } = await updateInfo({ token, info })
    if (ok) showSuccessToast(data.msg)
    else showErrorToast(data.msg)
  }

  const actualizarPassword = async password => {
    const token = window.localStorage.getItem('token')
    if (!token) { return setCargando(false) }
    const { data, ok } = await updatePassword({ token, password })
    if (ok) showSuccessToast(data.msg)
    else showErrorToast(data.msg)
    return ok
  }

  return (
    <AuthContext.Provider value={{
      auth,
      cargando,
      login,
      cerrarSesion,
      register,
      confirmarCuenta,
      solicitarCambioPassword,
      comprobarToken,
      cambiarPassword,
      actualizarPerfil,
      actualizarPassword
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
