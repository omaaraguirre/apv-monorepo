import axios from 'axios'

const backendURL = import.meta.env.VITE_BACKEND_URL
const backendDomain = new URL(backendURL).hostname

const clienteAxios = axios.create({
  baseURL: `https://${backendDomain}/api`
})

export default clienteAxios
