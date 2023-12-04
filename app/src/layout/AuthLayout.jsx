import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Loading from '../components/Loading'
import ThemeButton from '../components/ThemeButton'

const AuthLayout = () => {
  const { auth, cargando } = useAuth()

  if (cargando) { return <Loading /> }
  if (auth.id) { return <Navigate to='/admin' /> }

  return (
    <main className='w-[min(95%,1200px)] mx-auto h-screen grid place-items-center'>
      <div className='absolute top-5 right-5 text-dark dark:text-light'>
        <ThemeButton />
      </div>
      <div className='grid md:grid-cols-2 gap-10 items-center'>
        <Outlet />
      </div>
    </main>
  )
}

export default AuthLayout
