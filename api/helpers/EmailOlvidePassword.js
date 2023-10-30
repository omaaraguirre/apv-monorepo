import nodemailer from 'nodemailer'
import { EMAIL_CONFIG, FRONTEND_URL } from '../config/config'

const emailOlvidePassword = async (data) => {
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
    subject: 'Reestablece tu contraseña en APV',
    text: 'Reestablece tu contraseña en APV',
    html: `
        Hola <strong>${nombre}</strong></p>
        <p>Has solicitado reestablecer tu contraseña. Haz click en el siguiente enlace para continuar:</p>
        <p><a href='${FRONTEND_URL}/olvide/${token}'>Reestablecer contraseña</a></p>
        <p>Si no solicitaste esto, puedes ignorar el correo.</p>
        `
  })

  console.log('Mensaje enviado: %s', info.messageId)
}

export default emailOlvidePassword
