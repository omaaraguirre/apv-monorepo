import Paciente from '../models/Paciente.js'

export const agregarPaciente = async (req, res) => {
  const paciente = new Paciente(req.body)
  paciente.veterinario = req.veterinario._id
  try {
    const pacienteGuardado = await paciente.save()
    res.json(pacienteGuardado)
  } catch (error) {
    console.log('\u001b[31m' + error.message + '\u001b[0m')
    const e = new Error('Error al agregar paciente')
    res.status(403).json({ msg: e.message })
  }
}

export const obtenerPacientes = async (req, res) => {
  try {
    const veterinario = req.veterinario._id
    const pacientes = await Paciente.find({ veterinario })
    res.json(pacientes)
  } catch (error) {
    console.log('\u001b[31m' + error.message + '\u001b[0m')
    const e = new Error('Error al obtener pacientes')
    res.status(403).json({ msg: e.message })
  }
}

export const obtenerPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id)
    if (!paciente) { return res.status(404).json({ msg: 'Paciente no encontrado' }) }
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) { return res.status(403).json({ msg: 'Acción no válida' }) }

    res.json(paciente)
  } catch (error) {
    console.log('\u001b[31m' + error.message + '\u001b[0m')
    const e = new Error('Error al obtener paciente')
    res.status(403).json({ msg: e.message })
  }
}

export const actualizarPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id)
    if (!paciente) { return res.status(404).json({ msg: 'Paciente no encontrado' }) }
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) { return res.status(403).json({ msg: 'Acción no válida' }) }

    paciente.nombre = req.body.nombre || paciente.nombre
    paciente.propietario = req.body.propietario || paciente.propietario
    paciente.email = req.body.email || paciente.email
    paciente.fecha = req.body.fecha || paciente.fecha
    paciente.sintomas = req.body.sintomas || paciente.sintomas

    const pacienteActualizado = await paciente.save()
    res.json(pacienteActualizado)
  } catch (error) {
    const e = new Error('Error al actualizar paciente')
    res.status(403).json({ msg: e.message })
  }
}

export const eliminarPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id)
    if (!paciente) { return res.status(404).json({ msg: 'Paciente no encontrado' }) }
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) { return res.status(403).json({ msg: 'Acción no válida' }) }

    await paciente.deleteOne()
    res.json({ msg: 'Paciente Eliminado' })
  } catch (error) {
    const e = new Error('Error al eliminar paciente')
    res.status(403).json({ msg: e.message })
  }
}
