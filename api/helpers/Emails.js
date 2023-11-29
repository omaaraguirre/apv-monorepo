import nodemailer from 'nodemailer'
import { EMAIL_CONFIG, FRONTEND_URL } from '../config/config.js'

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

export const emailRegistro = async ({ email, nombre, token }) => {
  try {
    const info = await transport.sendMail({
      from: `APV <${EMAIL_CONFIG.FROM}>`,
      to: email,
      subject: 'Comprueba tu Cuenta en APV',
      text: 'Comprueba tu cuenta en APV',
      html: `
        Hola <strong>${nombre}</strong></p>
        <p>Has creado tu cuenta en APV, sólo debes confirmarla presionando el siguiente enlace:</p>
        <p><a href='${FRONTEND_URL}/confirmar/${token}'>Confirmar cuenta</a></p>
        <p>Si no solicitaste esto, puedes ignorar el correo.</p>
        `
    })
    console.log('Mensaje enviado 🚀', info.messageId)
  } catch (error) {
    console.log(error)
  }
}

export const emailOlvidePassword = async ({ email, nombre, token }) => {
  const info = await transport.sendMail({
    from: `APV <${EMAIL_CONFIG.FROM}>`,
    to: email,
    subject: 'Reestablece tu contraseña en APV',
    text: 'Reestablece tu contraseña en APV',
    html: `
        Hola <strong>${nombre}</strong></p>
        <p>Has solicitado reestablecer tu contraseña. Haz click en el siguiente enlace para continuar:</p>
        <p><a href='${FRONTEND_URL}/olvide/${token}'>Reestablecer contraseña</a></p>
        <p>Si no solicitaste esto, puedes ignorar el correo.</p>
        `
  })

  console.log('Mensaje enviado 🚀', info.messageId)
}
