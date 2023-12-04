import createHttpError from 'http-errors'
import Veterinario from '../models/Veterinario.js'
import generarJWT from '../helpers/generarJWT.js'
import generarId from '../helpers/generarId.js'
import { emailRegistro, emailOlvidePassword } from '../helpers/Emails.js'

export const registrar = async (req, res, next) => {
  try {
    const { email, nombre, password } = req.body
    if (!email || !nombre || !password) {
      throw createHttpError(400, 'Faltan datos')
    }
    const existeUsuario = await Veterinario.findOne({ email })
    if (existeUsuario) {
      throw createHttpError(403, 'El usuario ya existe')
    }

    const veterinario = new Veterinario(req.body)
    const guardado = await veterinario.save()
    await emailRegistro({ email, nombre, token: guardado.token })
    res.json(guardado)
  } catch (error) {
    next(error)
  }
}

export const confirmar = async (req, res, next) => {
  try {
    const { token } = req.params
    const usuario = await Veterinario.findOne({ token })
    if (!usuario) {
      throw createHttpError(404, 'Token no válido')
    }

    usuario.token = null
    usuario.confirmado = true
    await usuario.save()
    res.json({ msg: 'Usuario confirmado correctamente' })
  } catch (error) {
    next(error)
  }
}

export const olvidePassword = async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) {
      throw createHttpError(400, 'Faltan datos')
    }
    const veterinario = await Veterinario.findOne({ email })
    if (!veterinario) {
      throw createHttpError(404, 'El usuario no existe')
    }

    veterinario.token = generarId()
    await veterinario.save()
    emailOlvidePassword({
      email,
      nombre: veterinario.nombre,
      token: veterinario.token
    })
    res.json({ msg: 'Hemos enviado un email con las instrucciones' })
  } catch (error) {
    next(error)
  }
}

export const comprobarToken = async (req, res, next) => {
  try {
    const { token } = req.params
    if (!token) {
      throw createHttpError(400, 'Token no válido o inexistente')
    }
    const veterinario = await Veterinario.findOne({ token })
    if (!veterinario) {
      throw createHttpError(404, 'Token no válido')
    }

    res.json({ msg: 'Token válido, el usuario existe' })
  } catch (error) {
    next(error)
  }
}

export const nuevoPassword = async (req, res, next) => {
  try {
    const { token } = req.params
    const { password } = req.body
    const veterinario = await Veterinario.findOne({ token })
    if (!veterinario) {
      throw createHttpError(404, 'Token no válido')
    }

    veterinario.token = null
    veterinario.password = password
    await veterinario.save()
    res.json({ msg: 'Password modificado correctamente' })
  } catch (error) {
    next(error)
  }
}

export const autenticar = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      throw createHttpError(400, 'Faltan datos')
    }
    const usuario = await Veterinario.findOne({ email })
    if (!usuario) {
      throw createHttpError(404, 'Usuario no encontrado')
    }
    if (!usuario.confirmado) {
      throw createHttpError(403, 'Usuario no confirmado')
    }
    const autenticado = await usuario.comprobarPassword(password)
    if (!autenticado) {
      throw createHttpError(403, 'Password incorrecto')
    }

    res.json({
      id: usuario._id,
      nombre: usuario.nombre,
      web: usuario.web,
      telefono: usuario.telefono,
      email: usuario.email,
      token: generarJWT(usuario.id)
    })
  } catch (error) {
    next(error)
  }
}

export const perfil = (req, res, next) => {
  const { veterinario } = req
  res.json(veterinario)
}

export const actualizarPerfil = async (req, res, next) => {
  try {
    const { _id: id } = req.veterinario
    if (!id || !/^[a-f\d]{24}$/i.test(id)) {
      throw createHttpError(400, 'ID no válido')
    }

    const { nombre, email, web, telefono } = req.body
    if (!nombre || !email) {
      throw createHttpError(400, 'Faltan datos')
    }

    const veterinario = await Veterinario.findById(id)
    if (!veterinario) {
      throw createHttpError(404, 'Información del Veterinario no encontrada')
    }

    if (veterinario.email !== email) {
      const existeEmail = await Veterinario.findOne({ email })
      if (existeEmail) {
        throw createHttpError(403, 'Email ya registrado')
      }
    }

    veterinario.nombre = nombre
    veterinario.email = email
    veterinario.web = web
    veterinario.telefono = telefono
    const veterinarioActualizado = await veterinario.save()
    res.json({ ...veterinarioActualizado, msg: 'Perfil actualizado' })
  } catch (error) {
    next(error)
  }
}

export const actualizarPassword = async (req, res, next) => {
  try {
    const { _id: id } = req.veterinario
    const { passwordActual, nuevoPassword } = req.body
    if (!passwordActual || !nuevoPassword) {
      throw createHttpError(400, 'Faltan datos')
    }

    const veterinario = await Veterinario.findById(id)
    if (!veterinario) {
      throw createHttpError(404, 'Información del Veterinario no encontrada')
    }

    const validPassword = await veterinario.comprobarPassword(passwordActual)
    if (!validPassword) {
      throw createHttpError(403, 'La Contraseña Actual es incorrecta')
    }

    veterinario.password = nuevoPassword
    await veterinario.save()
    res.json({ msg: 'Contraseña actualizada correctamente' })
  } catch (error) {
    next(error)
  }
}

// export const eliminar = async (req, res, next) => {
//   try {
//     const { email } = req.params
//     const veterinario = await Veterinario.findOne({ email })
//     if (!veterinario) {
//       throw createHttpError(404, 'No existe veterinario')
//     }
//     await veterinario.deleteOne()
//     res.json({ msg: 'Eliminado correctamente' })
//   } catch (error) {
//     next(error)
//   }
// }

// export const getUserByEmail = async (req, res, next) => {
//   try {
//     const { email } = req.params
//     if (!email) {
//       throw createHttpError(400, 'Faltan datos')
//     }
//     const veterinario = await Veterinario.findOne({ email })
//     if (!veterinario) {
//       throw createHttpError(404, 'El usuario no existe')
//     }
//     res.json(veterinario)
//   } catch (error) {
//     next(error)
//   }
// }
