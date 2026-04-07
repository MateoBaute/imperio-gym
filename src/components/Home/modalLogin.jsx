import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "../stylesComponents.css";
import ModalLoginSuccess from './modalLoginSucces';
import { AppContext } from '../../contexts/AppContext'
import { useContext } from 'react'

export default function ModalLogin() {
    const { handleCloseModal } = useContext(AppContext);

    const [isRegister, setIsRegister] = useState(false)
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    async function login() {
        console.log(name, pass);
        try {
            const response = await fetch('https://backend-imperio.vercel.app/login', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, pass })
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('token', "true"); // Guardado como string
                localStorage.setItem('admin', data.admin);
                localStorage.setItem('userId', data.id); // Guardamos el ID que necesitabas
                setSuccess(true);
                setTimeout(() => handleCloseModal(), 1200);
            } else {
                alert(data.menssage);
            }
        } catch (error) {
            alert('Error connecting to server');
        }
    }

    async function register() {
        try {
            const response = await fetch('https://backend-imperio.vercel.app/register', {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ name, pass, email })
            });

            const data = await response.json();

            if (data.success) { // Corregido: data.success
                alert(data.menssage);
                setIsRegister(false);
            } else {
                alert(data.menssage || 'Error en registro');
            }
        } catch (error) {
            alert('Error to connection with Data Base');
        }
    }

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                handleCloseModal();
            };
        };

        // Añadimos el evento al teclado
        window.addEventListener('keydown', handleEsc);
        // Retornamos una función de limpieza para eliminar el evento
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [handleCloseModal]);


    return createPortal(
        <div id="divModal" className="modal-wrapper" onClick={handleCloseModal}>
            {success ? (
                <ModalLoginSuccess user={name} />
            ) : (
                <div className="modalLogin" onClick={(e) => e.stopPropagation()}>
                    <div className="contentLogin">
                        
                        <h1>{isRegister ? "Register" : "Login"}</h1>
                        <label>Name:</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} />

                        {isRegister && (
                            <>
                                <label>Email: </label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} />
                            </>
                        )}

                        <label>Password: </label>
                        <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />

                        <button className="btn-primary" onClick={isRegister ? register : login}>
                            {isRegister ? "Register" : "LogIn"}
                        </button>

                        <div className="modal-login__hint">
                            <span>
                                {isRegister ? "¿Ya tenés cuenta? " : "¿No tenés cuenta? "}
                            </span>
                            <button type="button" className="modal-login__switch" onClick={() => setIsRegister(!isRegister)}>
                                {isRegister ? "Iniciar sesión" : "Registrarse"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>,
        document.body
    );
}