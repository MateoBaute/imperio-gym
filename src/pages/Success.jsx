import { useEffect, useRef } from "react"; // 1. Importa useRef
import '../components/success.css';

export default function Success() {
    const ejecutado = useRef(false); // 2. Crea la referencia

    async function guardarProducto(productoId) {
        if (!productoId) return;
        let UserId = localStorage.getItem('userId');
        const idUsuario = parseInt(UserId);
        if (!idUsuario) return;
        const fechaParaBBDD = new Date().toISOString().split('T')[0];

        const body = {
            fecha: fechaParaBBDD,
            idProducto: productoId,
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
                localStorage.removeItem('pendingProductId');
                console.log("Compra guardada con éxito");
            }
        } catch (error) {
            console.error("Error al guardar la compra:", error);
        }

    };

    useEffect(() => {
        // const pendingProductId = Number(localStorage.getItem('pendingProductId'));
        const pendingProductId = 2;
        if (!ejecutado.current) {
            guardarProducto(pendingProductId);
            ejecutado.current = true; // 4. Marca como ejecutado
        }
    }, []);

    return (
        <div className="success-container">
            <h1>¡Pago exitoso!</h1>
            <p>Gracias por tu compra. Tu pedido ha sido procesado correctamente.</p>
        </div>
    );
};