import { Link } from 'react-router-dom'
import '../stylesComponents.css'
import logoImg from '../imgs/logo.png'

export default function Header({isLoggedIn, handleLogin}) {

    function CloseSession(){
        localStorage.removeItem('admin')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        location.reload()
    }

    return (
        <header>
            <nav className="header-nav">
                <div className="logo">
                    <Link to="/">
                        <img src={logoImg} alt="logo" className="logo-img" />
                    </Link>
                </div>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/nosotros">Nosotros</Link></li>
                    <li><Link to="/rutinas">Rutinas</Link></li>
                    <li><Link to="/shop">Tienda</Link></li>
                    {!isLoggedIn ? (
                        <button id='btn-Login' className="btn-primary" onClick={handleLogin}>logIn</button>
                    ) : (
                        <li onClick={CloseSession} id='CloseSession' >Salir</li>
                    )}
                </ul>
            </nav>
        </header>
    )
}