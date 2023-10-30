import axios from 'axios'
import { BACKEND_URL } from './config'

const clienteAxios = axios.create({
  baseURL: `${BACKEND_URL}/api`
})

export default clienteAxios
