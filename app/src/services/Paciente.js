import clienteAxios from '../config/axios'

export const getPatients = async () => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const { data, statusText } = await clienteAxios('/pacientes', config)
    return { data, ok: statusText === 'OK' }
  } catch (error) {
    return { data: error.response.data, ok: false }
  }
}

export const addPatient = async patient => {
  const token = window.localStorage.getItem('token')
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const { data, statusText } = await clienteAxios.post('/pacientes', patient, config)
    return { data, ok: statusText === 'OK' }
  } catch (error) {
    return { data: error.response.data, ok: false }
  }
}

export const updatePatient = async patient => {
  const token = window.localStorage.getItem('token')
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const { data, statusText } = await clienteAxios.put(`/pacientes/${patient.id}`, patient, config)
    return { data, ok: statusText === 'OK' }
  } catch (error) {
    return { data: error.response.data, ok: false }
  }
}

export const deletePatient = async id => {
  try {
    const token = window.localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const { data, statusText } = await clienteAxios.delete(`/pacientes/${id}`, config)
    return { data, ok: statusText === 'OK' }
  } catch (error) {
    return { data: error.response.data, ok: false }
  }
}
