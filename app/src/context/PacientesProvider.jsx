import { createContext, useState, useEffect } from 'react'
import clienteAxios from '../config/axios'
import useAuth from '../hooks/useAuth'

const PacientesContext = createContext()

export const PacientesProvider = ({ children }) => {
  const { auth } = useAuth()
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = window.localStorage.getItem('token')
        if (!token) return
        const url = '/pacientes'
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        const { data } = await clienteAxios(url, config)
        setPacientes(data)
      } catch (error) {
        console.log(error.response.data.msg)
      }
    }
    obtenerPacientes()
  }, [auth])

  const guardarPaciente = async (paciente) => {
    const token = window.localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    try {
      if (paciente.id) {
        const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
        const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
        setPacientes(pacientesActualizados)
      } else {
        const { data } = await clienteAxios.post('/pacientes', paciente, config)
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data
        setPacientes([pacienteAlmacenado, ...pacientes])
      }
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  const setEdicion = (paciente) => {
    setPaciente(paciente)
  }

  const eliminarPaciente = async (id) => {
    const confirmar = confirm('¿Eliminar?')
    if (!confirmar) return
    try {
      const token = window.localStorage.getItem('token')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      await clienteAxios.delete(`/pacientes/${id}`, config)
      const pacientesActualizados = pacientes.filter(pacienteState => pacienteState._id !== id)
      setPacientes(pacientesActualizados)
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  return (
    <PacientesContext.Provider value={{ pacientes, guardarPaciente, setEdicion, paciente, eliminarPaciente }}>
      {children}
    </PacientesContext.Provider>
  )
}

export default PacientesContext
