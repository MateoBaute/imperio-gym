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
                Pasá por el gimnasio a retirar tu pedido y mostrá este código de referencia:{' '}
                <strong>
                    {codigoReferencia
                        ? <p> `   Guardá este código para confirmar tu compra al retirar el producto: ${codigoReferencia}    `</p>
                        :'  ————————  '}
                </strong>
                . ¡Gracias por tu compra!
            </p>
        </div>
    );
}
