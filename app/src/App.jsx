import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'
import { ModalProvider } from './context/ModalProvider'

import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'

import Login from './pages/Login'
import Registrar from './pages/Registrar'
import OlvidePassword from './pages/OlvidePassword'
import NuevoPassword from './pages/NuevoPassword'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import AdministrarPacientes from './pages/AdministrarPacientes'
import EditarPerfil from './pages/EditarPerfil'
import CambiarContraseña from './pages/CambiarContraseña'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
              <Route path='olvide' element={<OlvidePassword />} />
              <Route path='olvide/:token' element={<NuevoPassword />} />
              <Route path='confirmar/:token' element={<ConfirmarCuenta />} />
            </Route>
            <Route
              path='/admin' element={
                <ModalProvider>
                  <PacientesProvider>
                    <RutaProtegida />
                  </PacientesProvider>
                </ModalProvider>
              }
            >
              <Route index element={<AdministrarPacientes />} />
              <Route path='perfil' element={<EditarPerfil />} />
              <Route path='cambiarcontraseña' element={<CambiarContraseña />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
