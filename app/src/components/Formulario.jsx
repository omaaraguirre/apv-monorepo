import { useEffect, useState } from 'react'
import Alerta from '../components/Alerta'
import usePacientes from '../hooks/usePacientes'

function Formulario () {
  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState(Date.now())
  const [sintomas, setSintomas] = useState('')
  const [alerta, setAlerta] = useState({})
  const [id, setId] = useState(null)

  const { guardarPaciente, paciente } = usePacientes()

  useEffect(() => {
    if (paciente?.nombre) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(new Date(paciente.fecha).toLocaleDateString('en-CA'))
      setSintomas(paciente.sintomas)
      setId(paciente._id)
    }
  }, [paciente])

  const handleSubmit = e => {
    e.preventDefault()
    if ([nombre.trim(), propietario.trim(), email.trim(), fecha.trim(), sintomas.trim()].includes('')) {
      setAlerta({ msg: 'Todos los campos son obligatorios', error: true })
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
      document.querySelector('#email').select()
      return
    }

    guardarPaciente({ nombre, propietario, email, fecha, sintomas, id })
    setAlerta({ msg: 'Guardado correctamente', error: false })
    setTimeout(() => {
      setAlerta({})
    }, 3000)
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha(Date.now())
    setSintomas('')
    setId(null)
  }

  const { msg } = alerta

  return (
    <>
      <h2 className='font-black text-3xl text-center'>Administrador de Pacientes</h2>
      <p className='text-xl mt-5 mb-10 text-center'>
        Añade tus Pacientes y <span className='text-indigo-600 font-bold'>Administralos</span>
      </p>
      {msg && <Alerta alerta={alerta} />}
      <form className='bg-white py-10 px-5 shadow-md rounded-md' onSubmit={handleSubmit}>
        <div className='mb-5'>
          <label htmlFor='nombre' className='text-gray-700 uppercase font-bold'>Nombre Mascota</label>
          <input
            id='nombre'
            type='text'
            placeholder='Nombre de la Mascota'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='propietario' className='text-gray-700 uppercase font-bold'>Nombre Propietario</label>
          <input
            id='propietario'
            type='text'
            placeholder='Nombre del Propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={propietario}
            onChange={e => setPropietario(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='email' className='text-gray-700 uppercase font-bold'>Correo del propietario</label>
          <input
            id='email'
            type='email'
            placeholder=' Correo del propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='fecha' className='text-gray-700 uppercase font-bold'>Fecha de Alta</label>
          <input
            id='fecha'
            type='date'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={fecha}
            onChange={e => setFecha(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='sintomas' className='text-gray-700 uppercase font-bold'>Síntomas</label>
          <textarea
            id='sintomas'
            placeholder='Describe los síntomas '
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={sintomas}
            onChange={e => setSintomas(e.target.value)}
          />
        </div>
        <input
          type='submit'
          value={id ? 'Guardar' : 'Agregar'}
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold rounded-md hover:bg-indigo-800 cursor-pointer transition-colors'
        />
      </form>
    </>
  )
}

export default Formulario
