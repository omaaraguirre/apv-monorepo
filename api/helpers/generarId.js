import crypto from 'node:crypto'

const generarId = () => {
  return crypto.randomUUID()
}

export default generarId
