import { AppContext } from '../contexts/AppContext'
import { useState, useEffect } from 'react'

export default function AppProvider({ children }) {
    
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
    document.body.style.overflow = 'hidden'; // Evita el scroll del fondo
  }

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto'; // Restaura el scroll del fondo

    // Si al cerrar el modal el token existe, actualizamos el estado
    if (localStorage.getItem("token") === "true") {
      setIsLoggedIn(true);
    }
  }

    return (
        <AppContext.Provider value={{ isLoggedIn, showModal, handleLogin, handleCloseModal }}>
            {children}
        </AppContext.Provider>
    )
}