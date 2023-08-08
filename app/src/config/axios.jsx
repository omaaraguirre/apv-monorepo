import axios from 'axios'

const { MODE, VITE_BACKEND_URL_DEV, VITE_BACKEND_URL_PROD } = import.meta.env
export const BACKEND_URL = MODE === 'development' ? VITE_BACKEND_URL_DEV : VITE_BACKEND_URL_PROD

const clienteAxios = axios.create({
  baseURL: `${BACKEND_URL}/api`
})

export default clienteAxios
