import jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'
import Veterinario from '../models/Veterinario.js'
import { JWT_SECRET } from '../config/config.js'

const checkAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization || !authorization.startsWith('Bearer')) {
      throw createHttpError(403, 'JWT no válido o inexistente')
    }

    const token = authorization.split(' ')[1]
    const decoded = jwt.verify(token, JWT_SECRET)
    req.veterinario = await Veterinario.findById(decoded?.id).select('-password -token -confirmado')
    return next()
  } catch (error) {
    return next(error)
  }
}

export default checkAuth
