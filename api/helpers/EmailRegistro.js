import nodemailer from 'nodemailer'
import { EMAIL_CONFIG, FRONTEND_URL } from '../config/config.js'

const emailRegistro = async data => {
  const transport = nodemailer.createTransport({
    host: EMAIL_CONFIG.HOST,
    auth: {
      user: EMAIL_CONFIG.USER,
      pass: EMAIL_CONFIG.PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  const { email, nombre, token } = data
  const info = await transport.sendMail({
    from: `APV <${EMAIL_CONFIG.USER}>`,
    to: email,
    subject: 'Comprueba tu Cuenta en APV',
    text: 'Comprueba tu cuenta en APV',
    html: `
        Hola <strong>${nombre}</strong></p>
        <p>Has creado tu cuenta en DevWebCamp, sólo debes confirmarla presionando el siguiente enlace:</p>
        <p><a href='${FRONTEND_URL}/confirmar/${token}'>Confirmar cuenta</a></p>
        <p>Si no solicitaste esto, puedes ignorar el correo.</p>
        `
  })

  console.log('Mensaje enviado: %s', info.messageId)
}

export default emailRegistro
