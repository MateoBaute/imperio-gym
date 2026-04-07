import { useEffect } from "react";
import '../components/success.css';

export default function Success() {

    async function guardarProducto(idProducto) {
            let UserId = localStorage.getItem('userId');
            const idUsuario = parseInt(UserId);
    
            const body = {
                productoId: idProducto,
                idUsuario: idUsuario
            };
            try {
                const res = await fetch('https://backend-imperio.vercel.app/guardarCompra', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
                const data = await res.json();
    
                if (data.success) {
                    console.log("Compra guardada con éxito");
                }
            } catch (error) {
                console.error("Error al guardar la compra:", error);
            }
    
        };

    useEffect(() => {
        guardarProducto();
    }, []);

    return (
    <div className="success-container">
        <h1>¡Pago exitoso!</h1>
        <p>Gracias por tu compra. Tu pedido ha sido procesado correctamente.</p>
    </div>
    );
};