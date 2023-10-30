import mongoose from 'mongoose'
import { MONGO_URI } from './config.js'

const conectarDB = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB conectado')
    return db
  } catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default conectarDB
