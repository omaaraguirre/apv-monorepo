import express from 'express'
import { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword, actualizarPerfil, actualizarPassword, all } from '../controllers/VeterinarioController.js'
import checkAuth from '../middleware/authMiddleware.js'

const router = express.Router()

// Pública
router.post('/', registrar)
router.get('/confirmar', confirmar)
router.get('/confirmar/:token', confirmar)
router.post('/login', autenticar)
router.post('/olvide', olvidePassword)
// router.get("/olvide/:token", comprobarToken);
// router.post("/olvide/:token", nuevoPassword);
router.route('/olvide/:token').get(comprobarToken).post(nuevoPassword)

// Privada
router.get('/perfil', checkAuth, perfil)
router.put('/perfil/:id', checkAuth, actualizarPerfil)
router.put('/actualizarpassword', checkAuth, actualizarPassword)
router.get('/all', all)

export default router
