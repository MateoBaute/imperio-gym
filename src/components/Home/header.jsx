import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../stylesComponents.css'
import logoImg from '../imgs/logo.png'
import { AppContext } from '../../contexts/AppContext'
import { useContext } from 'react'

export default function Header() {
  const { isLoggedIn, handleLogin } = useContext(AppContext);

  const [menuOpen, setMenuOpen] = useState(false)
  const routeLocation = useLocation()

  function CloseSession() {
    localStorage.removeItem('admin')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    window.location.reload()
  }

  useEffect(() => {
    setMenuOpen(false)
  }, [routeLocation.pathname])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const closeOnWide = () => {
      if (mq.matches) setMenuOpen(false)
    }
    mq.addEventListener('change', closeOnWide)
    return () => mq.removeEventListener('change', closeOnWide)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onEsc = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className="site-header">
      <nav className="header-nav" aria-label="Principal">
        <div className="header-nav__brand">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src={logoImg} alt="Imperio Gym — inicio" className="logo-img" />
          </Link>
        </div>

        <button type="button" className={`header-nav__menu-toggle ${menuOpen ? 'is-active' : ''}`} aria-expanded={menuOpen} aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen((o) => !o)}><span className="header-nav__burger" aria-hidden /></button>

        {menuOpen ? (
          <div className="header-nav__backdrop" onClick={() => setMenuOpen(false)}aria-hidden/>
        ) : null}

        <ul id="primary-navigation" className={`header-nav__links ${menuOpen ? 'is-open' : ''}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link></li>

          <li><Link to="/nosotros" onClick={() => setMenuOpen(false)}>Nosotros</Link></li>
          <li><Link to="/rutinas" onClick={() => setMenuOpen(false)}>Rutinas</Link></li>
          <li><Link to="/shop" onClick={() => setMenuOpen(false)}>Tienda</Link></li>
          <li><Link to="/Mensuaidad" onClick={() => setMenuOpen(false)}>Mensuaidad</Link></li>
          {!isLoggedIn ? (
            <li className="header-nav__cta">
              <button type="button" id="btn-Login" className="btn-primary" onClick={() => {setMenuOpen(false); handleLogin();}}>Iniciar Sesion</button>
            </li>
          ) : (
            <li
              onClick={() => {
                setMenuOpen(false)
                CloseSession()
              }}
              id="CloseSession"
              role="button"
              tabIndex={0}
              className="header-nav__logout"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setMenuOpen(false)
                  CloseSession()
                }
              }}
            >
              Salir
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
