import 'dotenv/config.js'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import createHttpError from 'http-errors'
import conectarDB from './config/db.js'
import { PORT, WHITELISTED_DOMAINS } from './config/config.js'
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'
import errorMiddleware from './middleware/errorMiddleware.js'

conectarDB()

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors(
  { origin: WHITELISTED_DOMAINS }
))

app.use('/api/veterinarios', veterinarioRoutes)
app.use('/api/pacientes', pacienteRoutes)
app.use((req, res, next) => next(createHttpError(404, 'Ruta no encontrada')))
app.use(errorMiddleware)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
