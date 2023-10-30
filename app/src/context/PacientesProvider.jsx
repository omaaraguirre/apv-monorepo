import { createContext, useState, useEffect, useRef } from 'react'
import { showErrorToast, showSuccessToast } from '../config/toast'
import { getPatients, addPatient, updatePatient, deletePatient } from '../services/Paciente.js'

const PacientesContext = createContext()

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    const obtenerPacientes = async () => {
      const { data, ok } = await getPatients()
      if (ok) setPacientes(data)
      else showErrorToast(data.msg)
    }
    obtenerPacientes()
  }, [])

  const guardarPaciente = async paciente => {
    const { data, ok } = await addPatient(paciente)
    if (ok) {
      setPacientes(prevState => [...prevState, data])
      setMostrarFormulario(false)
    } else showErrorToast(data.msg)
    return ok
  }

  const actualizarPaciente = async paciente => {
    const { data, ok } = await updatePatient(paciente)
    if (ok) {
      const pacientesActualizados = pacientes.map(pac => pac.id === data.id ? data : pac)
      setPacientes(pacientesActualizados)
      setMostrarFormulario(false)
    } else showErrorToast(data.msg)
    return ok
  }

  const setEdicion = paciente => {
    setPaciente(paciente)
    setMostrarFormulario(true)
    formRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const eliminarPaciente = async id => {
    const { data, ok } = await deletePatient(id)
    if (ok) {
      const pacientesActualizados = pacientes.filter(pacienteState => pacienteState.id !== id)
      setPacientes(pacientesActualizados)
      showSuccessToast('Paciente eliminado')
    } else showErrorToast(data.msg)
  }

  return (
    <PacientesContext.Provider value={{
      pacientes,
      guardarPaciente,
      actualizarPaciente,
      setEdicion,
      formRef,
      mostrarFormulario,
      setMostrarFormulario,
      paciente,
      eliminarPaciente
    }}
    >
      {children}
    </PacientesContext.Provider>
  )
}

export default PacientesContext
