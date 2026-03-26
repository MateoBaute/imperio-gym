import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Home/header'
import Home from './pages/Home'
import Nosotros from './pages/Nosotros'
import Rutinas from './pages/Rutinas'
import Tienda from './pages/Tienda'
import ModalLogin from './components/Home/modalLogin' // Importación añadida
import { useState, useEffect } from 'react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setShowModal(true); // Ahora abre el modal en lugar de solo loguear
  }

  const handleCloseModal = () => {
    setShowModal(false);

    // Si al cerrar el modal el token existe, actualizamos el estado
    if (localStorage.getItem("token") === "true") {
      setIsLoggedIn(true);
    }
  }

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
      
      {showModal && <ModalLogin onClose={handleCloseModal} />}

      <main>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/rutinas" element={<Rutinas onClose={handleCloseModal} />} />
          <Route path="/shop" element={<Tienda />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App