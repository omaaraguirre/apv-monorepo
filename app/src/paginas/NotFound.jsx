import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='min-h-screen grid place-items-center '>
      <div className='flex flex-col gap-10 items-center'>
        <h2 className='text-4xl text-blue-800/80 font-semibold'>Página no encontrada</h2>
        <img src='/img/404.png' alt='Error 404' className='max-w-3xl' />
        <p className='text-xl text-blue-900'>No se ha encontrado la ruta solicitada.</p>
        <Link className='text-white bg-blue-700 py-2 px-5 rounded-md hover:bg-blue-800 transition-color duration-300 font-semibold' to='/'>Regresar</Link>
      </div>
    </div>
  )
}

export default NotFound
