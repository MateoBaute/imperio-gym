import { useEffect } from 'react';
import '../components/success.css';

export default function Success() {
    useEffect(() => {
        localStorage.removeItem('pendingProductId');
    }, []);

    return (
        <div className="success-container">
            <h1>¡Pago exitoso!</h1>
            <p>Gracias por tu compra. Tu pedido ha sido procesado correctamente.</p>
            <p>Pase luego por el gimnasio a retirar su pedido. ¡Muchas gracias por su compra!</p>
        </div>
    );
}
