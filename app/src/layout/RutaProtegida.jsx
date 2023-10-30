import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useModal from '../hooks/useModal'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Loading from '../components/Loading'
import Modal from '../components/Dialog'

const RutaProtegida = () => {
  const { auth, cargando } = useAuth()
  const { showModal } = useModal()

  if (cargando) { return <Loading /> }
  if (!auth.id) { return <Navigate to='/' /> }

  return (
    <>
      <Header />
      <main className='px-5 py-10 max-w-7xl mx-auto'>
        <Outlet />
      </main>
      <Footer />
      {showModal && <Modal />}
    </>
  )
}

export default RutaProtegida
