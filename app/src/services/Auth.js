import axios from '../config/axios'

export const getUserData = async token => {
  try {
    const { data, statusText } = await axios('/veterinarios/perfil', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return { data, ok: statusText === 'OK' }
  } catch (error) {
    return { data: error.response.data, ok: false }
  }
}

export const signIn = async ({ email, password }) => {
  try {
    const { data, statusText } = await axios.post('/veterinarios/login', {
      email,
      password
    })
    return { data, ok: statusText === 'OK' }
  } catch (error) {
    return { data: error.response.data, ok: false }
  }
}

export const signUp = async ({ nombre, email, password }) => {
  try {
    const { data, statusText } = await axios.post('/veterinarios', {
      nombre,
      email,
      password
    })
    return { data, ok: statusText === 'OK' }
  } catch (error) {
    return { data: error.response.data, ok: false }
  }
}

export const activateUser = async token => {
  try {
    const { data, statusText } = await axios(`/veterinarios/confirmar/${token}`)
    return { data, ok: statusText === 'OK' }
  } catch (error) {
    return { data: error.response.data, ok: false }
  }
}

export const requestPasswordChange = async email => {
  try {
    const { data, statusText } = await axios.post('/veterinarios/olvide', { email })
    return { data, ok: statusText === 'OK' }
  } catch (error) {
    return { data: error.response.data, ok: false }
  }
}

export const validateToken = async token => {
  try {
    const { data, statusText } = await axios(`/veterinarios/olvide/${token}`)
    return { data, ok: statusText === 'OK' }
  } catch (error) {
    return { data: error.response.data, ok: false }
  }
}

export const changePassword = async (token, password) => {
  try {
    const { data, statusText } = await axios.post(`/veterinarios/olvide/${token}`, { password })
    return { data, ok: statusText === 'OK' }
  } catch (error) {
    return { data: error.response.data, ok: false }
  }
}

export const updatePassword = async ({ token, password }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const { data, statusText } = await axios.put('/veterinarios/actualizarpassword', password, config)
    return { data, ok: statusText === 'OK' }
  } catch (error) {
    return { data: error.response.data, ok: false }
  }
}

export const updateInfo = async ({ token, info }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const { data, statusText } = await axios.put('/veterinarios/perfil', info, config)
    return { data, ok: statusText === 'OK' }
  } catch (error) {
    return { data: error.response.data, ok: false }
  }
}
