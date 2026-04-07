
import './App.css'
//hooks y context
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppContext } from './contexts/AppContext'
import { useContext } from 'react'

//components
import Header from './components/Home/header'
import Home from './pages/Home'
import Nosotros from './pages/Nosotros'
import Rutinas from './pages/Rutinas'
import Tienda from './pages/Tienda'
import ModalLogin from './components/Home/modalLogin'
import Pedidos from './components/Shop/pedidos'

//pages
import Success from './pages/Success'
import Failure from './pages/Failure'
import Pending from './pages/Pending'



function App() {

  const { showModal,} = useContext(AppContext);

  return (
      <BrowserRouter>
        <Header />

        {showModal && <ModalLogin />}

        <main>
          <Routes>
            <Route path="/" element={<Home  />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/rutinas" element={<Rutinas />} />
            <Route path="/shop" element={<Tienda />} />
            <Route path='/Success' element={<Success />} />
            <Route path='/Failure' element={<Failure />} />
            <Route path='/Pending' element={<Pending />} />
            <Route path='/pedidos' element={<Pedidos />} />
          </Routes>
        </main>
      </BrowserRouter>
  )
}

export default App