import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Loading from '../components/Loading'
import ThemeButton from '../components/ThemeButton'

const AuthLayout = () => {
  const { auth, cargando } = useAuth()

  if (cargando) { return <Loading /> }
  if (auth.id) { return <Navigate to='/admin' /> }

  return (
    <main className='h-screen grid place-items-center'>
      <div className='absolute top-3 right-3 text-dark dark:text-light'>
        <ThemeButton />
      </div>
      <div className='grid md:grid-cols-2 gap-10 items-center p-10 max-w-7xl mx-auto'>
        <Outlet />
      </div>
    </main>
  )
}

export default AuthLayout
