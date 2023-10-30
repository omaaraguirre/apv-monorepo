import { useEffect, useState } from 'react'
import usePacientes from '../hooks/usePacientes'
import { showErrorToast, showSuccessToast } from '../config/toast'
import FormInput from './FormInput'

function Formulario () {
  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
  const [sintomas, setSintomas] = useState('')
  const [id, setId] = useState(null)

  const { paciente, guardarPaciente, actualizarPaciente, formRef } = usePacientes()

  useEffect(() => {
    if (paciente?.nombre) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(new Date(paciente.fecha).toLocaleDateString('en-CA'))
      setSintomas(paciente.sintomas)
      setId(paciente.id)
    }
  }, [paciente])

  const handleSubmit = async e => {
    e.preventDefault()
    if ([nombre.trim(), propietario.trim(), email.trim(), fecha.trim(), sintomas.trim()].includes('')) {
      return showErrorToast('Todos los campos son obligatorios')
    }
    if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      return showErrorToast('Email no válido')
    }

    let ok
    if (!paciente.id) {
      ok = await guardarPaciente({ nombre, propietario, email, fecha, sintomas })
    } else {
      ok = await actualizarPaciente({ nombre, propietario, email, fecha, sintomas, id })
    }
    if (ok) {
      showSuccessToast('Guardado correctamente')
      setNombre('')
      setPropietario('')
      setEmail('')
      setFecha(new Date().toISOString().split('T')[0])
      setSintomas('')
      setId(null)
    }
  }

  return (
    <>
      <h2 className='text-dark dark:text-lighter font-black text-3xl text-center'>Administrador de Pacientes</h2>
      <p className='text-medium dark:text-light text-xl my-5 text-center'>
        Añade tus Pacientes y <span className='text-primary font-bold'>Administralos</span>
      </p>
      <form
        className='flex flex-col text-medium dark:text-light font-bold shadow-lg p-5 rounded-xl bg-lighter dark:bg-darker'
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <FormInput
          label='Nombre de la Mascota'
          type='text'
          placeholder='Firulais'
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          autoFocus
        />
        <FormInput
          label='Nombre del Propietario'
          type='text'
          placeholder='Jane Doe'
          value={propietario}
          onChange={e => setPropietario(e.target.value)}
        />
        <FormInput
          label='Correo del Propietario'
          type='email'
          placeholder='jane_doe@email.com'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <FormInput
          label='Fecha de Alta'
          type='date'
          value={fecha}
          onChange={e => setFecha(e.target.value)}
        />
        <FormInput
          label='Describe los síntomas'
          type='text'
          placeholder='Cansancio, dificultad respiratoria, etc'
          value={sintomas}
          onChange={e => setSintomas(e.target.value)}
        />
        <input
          type='submit'
          value={id ? 'Guardar' : 'Agregar'}
          className='bg-secondary py-3 px-10 rounded-xl text-white font-bold mt-5 mx-auto hover:cursor-pointer hover:bg-primary transition-colors duration-300 md:w-auto'
        />
      </form>
    </>
  )
}

export default Formulario
