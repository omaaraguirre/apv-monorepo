import nodemailer from 'nodemailer'

const emailRegistro = async (data) => {
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

  const { email, nombre, token, host } = data
  const info = await transport.sendMail({
    from: `APV <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Comprueba tu Cuenta en APV',
    text: 'Comprueba tu cuenta en APV',
    html: `
        Hola <strong>${nombre}</strong></p>
        <p>Has creado tu cuenta en DevWebCamp, sólo debes confirmarla presionando el siguiente enlace:</p>
        <p><a href='http://${host}/confirmar/${token}'>Confirmar cuenta</a></p>
        <p>Si no solicitaste esto, puedes ignorar el correo.</p>
        `
  })

  console.log('Mensaje enviado: %s', info.messageId)
}

export default emailRegistro
