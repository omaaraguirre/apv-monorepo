import { Link } from 'react-router-dom'
import ThemeButton from '../components/ThemeButton'

const NotFound = () => {
  return (
    <>
      <div className='absolute top-3 right-3 text-dark dark:text-light'>
        <ThemeButton />
      </div>
      <div className='min-h-screen grid place-items-center'>
        <div className='flex flex-col gap-10 items-center'>
          <h2 className='text-4xl text-secondary font-semibold'>Página no encontrada</h2>
          <img src='/img/404.png' alt='Error 404' className='max-w-3xl' />
          <p className='text-xl text-primary'>No se ha encontrado la ruta solicitada.</p>
          <Link
            className='bg-secondary py-3 px-10 rounded-xl text-white font-bold mt-5 mx-auto hover:cursor-pointer hover:bg-primary transition-colors duration-300 md:w-auto'
            to='/'
          >
            Regresar
          </Link>
        </div>
      </div>
    </>
  )
}

export default NotFound
