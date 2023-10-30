import express from 'express'
import { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword, actualizarPerfil, actualizarPassword /*, eliminar, getUserByEmail */ } from '../controllers/VeterinarioController.js'
import checkAuth from '../middleware/authMiddleware.js'

const router = express.Router()

// Pública
router.post('/', registrar)
router.get('/confirmar', confirmar)
router.get('/confirmar/:token', confirmar)
router.post('/login', autenticar)
router.post('/olvide', olvidePassword)
router.route('/olvide/:token')
  .get(comprobarToken)
  .post(nuevoPassword)

// Privada
router.route('/perfil')
  .get(checkAuth, perfil)
  .put(checkAuth, actualizarPerfil)
router.put('/actualizarpassword', checkAuth, actualizarPassword)

// router.get('/:email', getUserByEmail)
// router.delete('/eliminar/:email', eliminar)

export default router
