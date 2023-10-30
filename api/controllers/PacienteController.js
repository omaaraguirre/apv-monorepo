import createHttpError from 'http-errors'
import Paciente from '../models/Paciente.js'

export const obtenerPacientes = async (req, res, next) => {
  try {
    const veterinario = req.veterinario._id
    const pacientes = await Paciente.find({ veterinario })
    res.json(pacientes)
  } catch (error) {
    next(error)
  }
}

export const agregarPaciente = async (req, res, next) => {
  try {
    const { nombre, propietario, email, fecha, sintomas } = req.body
    if (!nombre || !propietario || !email || !sintomas) {
      throw createHttpError(400, 'Todos los campos son obligatorios')
    }

    const paciente = new Paciente({ nombre, propietario, email, fecha, sintomas })
    paciente.veterinario = req.veterinario._id
    const pacienteGuardado = await paciente.save()
    res.json(pacienteGuardado)
  } catch (error) {
    next(error)
  }
}

export const obtenerPaciente = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id || !/^[a-f\d]{24}$/i.test(id)) {
      throw createHttpError(400, 'ID no válido')
    }

    const paciente = await Paciente.findById(id)
    if (!paciente) {
      throw createHttpError(404, 'Paciente no encontrado')
    }

    const isOwnerOfPatient = paciente.veterinario._id.toString() === req.veterinario._id.toString()
    if (!isOwnerOfPatient) {
      throw createHttpError(403, 'No tienes permiso para acceder a este paciente')
    }

    res.json(paciente)
  } catch (error) {
    next(error)
  }
}

export const actualizarPaciente = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id || !/^[a-f\d]{24}$/i.test(id)) {
      throw createHttpError(400, 'ID no válido')
    }

    const paciente = await Paciente.findById(id)
    if (!paciente) {
      throw createHttpError(404, 'Paciente no encontrado')
    }

    const isOwnerOfPatient = paciente.veterinario._id.toString() === req.veterinario._id.toString()
    if (!isOwnerOfPatient) {
      throw createHttpError(403, 'No tienes permiso para acceder a este paciente')
    }

    const { nombre, propietario, email, fecha, sintomas } = req.body
    paciente.nombre = nombre || paciente.nombre
    paciente.propietario = propietario || paciente.propietario
    paciente.email = email || paciente.email
    paciente.fecha = fecha || paciente.fecha
    paciente.sintomas = sintomas || paciente.sintomas

    const pacienteActualizado = await paciente.save()
    res.json(pacienteActualizado)
  } catch (error) {
    next(error)
  }
}

export const eliminarPaciente = async (req, res, next) => {
  try {
    const { id } = req.params
    const paciente = await Paciente.findById(id)
    if (!paciente) {
      throw createHttpError(404, 'Paciente no encontrado')
    }

    const isOwnerOfPatient = paciente.veterinario._id.toString() === req.veterinario._id.toString()
    if (!isOwnerOfPatient) {
      throw createHttpError(403, 'No tienes permiso para acceder a este paciente')
    }

    await paciente.deleteOne()
    res.json({ msg: 'Paciente Eliminado' })
  } catch (error) {
    next(error)
  }
}
