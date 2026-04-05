import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "../stylesComponents.css";
import ModalLoginSuccess from './modalLoginSucces';

export default function ModalLogin({ onClose }) {
    const [isRegister, setIsRegister] = useState(false)
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    async function login() {
        console.log(name, pass);
        try {
            const response = await fetch('http://localhost:3001/login', {
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
                setTimeout(() => onClose(), 1200);
            } else {
                alert(data.menssage);
            }
        } catch (error) {
            alert('Error connecting to server');
        }
    }

    async function register() {
        try {
            const response = await fetch('http://localhost:3001/register', {
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
                onClose();
            } else if (event.key === 'Enter') {
                if (isRegister) {
                    register();
                } else {
                    login();
                }
            }
        };

        // Añadimos el evento al teclado
        window.addEventListener('keydown', handleEsc);
        // Retornamos una función de limpieza para eliminar el evento
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);


    return createPortal(
        <div id="divModal" className="modal-wrapper" onClick={onClose}>
            {success ? (
                <ModalLoginSuccess />
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

                        <p>
                            {isRegister ? "¿You have an account? " : "¿You don't have an account? "}
                            <a style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setIsRegister(!isRegister)}>
                                {isRegister ? "Login" : "Register"}
                            </a>
                        </p>
                    </div>
                </div>
            )}
        </div>,
        document.body
    );
}