import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'
import EditarPerfil from './layout/EditarPerfil'
import CambiarContraseña from './layout/CambiarContraseña'
import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import NuevoPassword from './paginas/NuevoPassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import AdministrarPacientes from './paginas/AdministrarPacientes'
import NotFound from './paginas/NotFound'

import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'

function App () {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
              <Route path='olvide' element={<OlvidePassword />} />
              <Route path='olvide/:token' element={<NuevoPassword />} />
              <Route path='confirmar/:token' element={<ConfirmarCuenta />} />
            </Route>
            <Route path='/admin' element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path='perfil' element={<EditarPerfil />} />
              <Route path='cambiarcontraseña' element={<CambiarContraseña />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
