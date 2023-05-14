import Veterinario from '../models/Veterinario.js'
import generarJWT from '../helpers/generarJWT.js'
import generarId from '../helpers/generarId.js'
import emailRegistro from '../helpers/EmailRegistro.js'
import emailOlvidePassword from '../helpers/EmailOlvidePassword.js'

export const registrar = async (req, res) => {
  const { email, nombre } = req.body

  const existeUsuario = await Veterinario.findOne({ email })
  if (existeUsuario) {
    return res.status(403).json({ msg: 'Usuario ya registrado' })
  }

  try {
    const veterinario = new Veterinario(req.body)
    const guardado = await veterinario.save()

    emailRegistro({ email, nombre, token: guardado.token })

    res.send({ guardado })
  } catch (error) {
    res.send({ msg: error.message })
  }
}

export const perfil = (req, res) => {
  const { veterinario } = req
  res.send(veterinario)
}

export const confirmar = async (req, res) => {
  const { token } = req.params
  const usuario = await Veterinario.findOne({ token })
  if (!usuario) {
    const error = new Error('Token no válido')
    return res.status(404).json({ msg: error.message })
  }

  try {
    usuario.token = null
    usuario.confirmado = true
    await usuario.save()
    res.send({ msg: 'Usuario confirmado correctamente' })
  } catch (error) {
    res.send({ msg: error.message })
  }
}

export const autenticar = async (req, res) => {
  const { email, password } = req.body

  const usuario = await Veterinario.findOne({ email })
  if (!usuario) {
    const error = new Error('Usuario no encontrado')
    return res.status(403).json({ msg: error.message })
  }

  if (!usuario.confirmado) {
    const error = new Error('Usuario no confirmado')
    return res.status(403).json({ msg: error.message })
  }

  const autenticado = await usuario.comprobarPassword(password)
  if (!autenticado) {
    const error = new Error('Password incorrecto')
    return res.status(403).json({ msg: error.message })
  }

  res.json({
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    token: generarJWT(usuario.id)
  })
}

export const olvidePassword = async (req, res) => {
  const { email } = req.body
  const veterinario = await Veterinario.findOne({ email })
  if (!veterinario) {
    const error = new Error('El usuario no existe')
    return res.status(400).json({ msg: error.message })
  }

  try {
    veterinario.token = generarId()
    await veterinario.save()

    emailOlvidePassword({
      email,
      nombre: veterinario.nombre,
      token: veterinario.token
    })
    res.json({ msg: 'Hemos enviado un email con las instrucciones' })
  } catch (error) {
    const e = new Error('Hubo un probema al recuperar usuario')
    return res.status(403).json({ msg: e.message })
  }
}

export const comprobarToken = async (req, res) => {
  const { token } = req.params
  const veterinario = await Veterinario.findOne({ token })
  if (!veterinario) {
    const error = new Error('Token no válido')
    return res.status(400).json({ msg: error.message })
  }
  res.json({ msg: 'Token válido, el usuario existe' })
}

export const nuevoPassword = async (req, res) => {
  const { token } = req.params // GET
  const { password } = req.body // POST

  const veterinario = await Veterinario.findOne({ token })
  if (!veterinario) {
    const error = new Error('Token no válido')
    return res.status(400).json({ msg: error.message })
  }

  try {
    veterinario.token = null
    veterinario.password = password
    await veterinario.save()
    res.json({ msg: 'Password modificado correctamente' })
  } catch (error) {
    const e = new Error('Hubo un error')
    return res.status(400).json({ msg: e.message })
  }
}

export const actualizarPerfil = async (req, res) => {
  const veterinario = await Veterinario.findById(req.params.id)
  if (!veterinario) {
    const error = new Error('Error al obtener información de Veterinario')
    return res.status(404).json({ msg: error.message })
  }

  if (veterinario.email !== req.body.email) {
    const existeEmail = await Veterinario.findOne({ email: req.body.email })
    if (existeEmail) {
      const error = new Error(`${req.body.email} ya tiene una cuenta registrada`)
      return res.status(403).json({ msg: error.message })
    }
  }

  try {
    veterinario.nombre = req.body.nombre
    veterinario.email = req.body.email
    veterinario.web = req.body.web
    veterinario.telefono = req.body.telefono

    const veterinarioActualizado = await veterinario.save()
    res.json(veterinarioActualizado)
  } catch (error) {
    const e = new Error('Hubo un error')
    return res.status(403).json({ msg: e.message })
  }
}

export const actualizarPassword = async (req, res) => {
  const { _id } = req.veterinario
  const { passwordActual, nuevoPassword } = req.body

  const veterinario = await Veterinario.findById(_id)
  if (!veterinario) {
    const error = new Error('Hubo un error al obtener datos de veterinario')
    return res.status(403).json({ msg: error.message })
  }

  if (!await veterinario.comprobarPassword(passwordActual)) {
    const error = new Error('La Contraseña Actual es incorrecta')
    return res.status(403).json({ msg: error.message })
  }

  veterinario.password = nuevoPassword
  await veterinario.save()
  res.json({ msg: 'Contraseña actualizada correctamente' })
}

export const all = async (req, res) => {
  try {
    const veterinarios = await Veterinario.find()
    return res.json(veterinarios)
  } catch (error) {
    res.send({ msg: error.message })
  }
}
