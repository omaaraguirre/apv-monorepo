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
      <main className='py-10 w-[min(95%,1200px)] mx-auto'>
        <Outlet />
      </main>
      <Footer />
      {showModal && <Modal />}
    </>
  )
}

export default RutaProtegida
