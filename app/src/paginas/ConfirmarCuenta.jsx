import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})

  const params = useParams()
  const { token } = params

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${token}`
        const { data } = await clienteAxios(url)
        setCuentaConfirmada(true)
        setAlerta({ msg: data.msg, error: false })
        setTimeout(() => {
          setAlerta({})
        }, 3000)
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true })
        setTimeout(() => {
          setAlerta({})
        }, 3000)
      }
      setCargando(false)
    }
    confirmarCuenta()
  }, [])

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Confirma tu Cuenta y Administra tus <span className='text-black'>Pacientes</span>
        </h1>
      </div>
      <div className='mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {!cargando && <Alerta alerta={alerta} />}

        {cuentaConfirmada && <Link className='block text-center my-5 text-gray-500' to='/'>Iniciar Sesión</Link>}
      </div>
    </>
  )
}

export default ConfirmarCuenta
