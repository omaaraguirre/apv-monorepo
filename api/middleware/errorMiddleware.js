import chalk from 'chalk'

const errorMiddleware = (error, req, res, next) => {
  const status = error.status || 500
  const isUnexpectedError = status === 500
  const { method, url } = req
  const { message } = error
  isUnexpectedError && console.log(chalk.bgRed(`${method} ${url} ${status} ${message}`))
  isUnexpectedError && console.log(chalk.redBright(error))
  res.status(status).json({
    msg: isUnexpectedError ? 'Error del servidor' : message
  })
}

export default errorMiddleware
