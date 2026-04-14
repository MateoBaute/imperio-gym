import { useEffect, useState } from 'react';
import '../components/success.css';

export default function Success() {
    const [codigoReferencia, setCodigoReferencia] = useState('');

    useEffect(() => {
        localStorage.removeItem('pendingProductId');
        const guardado = localStorage.getItem('confirmPaiment');
        if (guardado) {
            setCodigoReferencia(guardado);
            localStorage.removeItem('confirmPaiment');
        }
    }, []);

    return (
        <div className="success-container">
            <h1>¡Pago exitoso!</h1>
            <p>Gracias por tu compra. Tu pedido ha sido procesado correctamente.</p>
                <p>
                    {codigoReferencia
                        ? <p> Guardá este código para confirmar tu compra al retirar el producto: <strong>{codigoReferencia}</strong></p>
                        :'  ————————  '}
                </p>
                . ¡Gracias por tu compra!
        </div>
    );
}
