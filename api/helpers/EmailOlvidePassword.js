import nodemailer from 'nodemailer'

const emailOlvidePassword = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  const { email, nombre, token } = data
  const info = await transport.sendMail({
    from: `APV <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Reestablece tu contraseña en APV',
    text: 'Reestablece tu contraseña en APV',
    html: `
        Hola <strong>${nombre}</strong></p>
        <p>Has solicitado reestablecer tu contraseña. Haz click en el siguiente enlace para continuar:</p>
        <p><a href='${process.env.FRONTEND_URL}/olvide/${token}'>Reestablecer contraseña</a></p>
        <p>Si no solicitaste esto, puedes ignorar el correo.</p>
        `
  })

  console.log('Mensaje enviado: %s', info.messageId)
}

export default emailOlvidePassword
