import express from 'express'
import conectarDB from './config/db.js'
import dotenv from 'dotenv'
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'
import cors from 'cors'
import path from 'path'

const app = express()
app.use(express.json()) // Habilita el envío de JSON vía POST
dotenv.config()
conectarDB()

app.use(cors())
app.use(express.static('../app/dist'))
app.use('/api/veterinarios', veterinarioRoutes)
app.use('/api/pacientes', pacienteRoutes)
app.use((req, res) => res.sendFile(path.resolve('../app/dist/index.html')))

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log('Server running')
})
