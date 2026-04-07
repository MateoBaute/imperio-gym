import { createPortal } from "react-dom";
import { useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { useContext } from "react";

// Recibimos el producto y la función de cierre por props
export default function ModalProd({ product, onClose }) {
    const { isLoggedIn } = useContext(AppContext)
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');

    async function pagarProducto(id) {
        if (!isLoggedIn) {
            alert("Debes iniciar sesión para realizar una compra.");
            return;
        }
        const precioNumero = parseInt(product.price);

//Verificación de campos antes de enviar la solicitud
        if (isNaN(precioNumero)) {
            alert("El precio del producto no es un número válido.");
            return;
        }
        if (product.size && !size) {
            alert("Por favor, selecciona un talle.");
            return;
        }
        if (product.color && !color) {
            alert("Por favor, selecciona un color.");
            return;
        }

        const productoParaPagar = {
            name: `${product.name} (Talle: ${size}, Color: ${color})`,
            price: product.price, // Asegúrate que sea un número
        };

        try {
            const response = await fetch("https://backend-imperio.vercel.app/create_preference", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productoParaPagar),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error en el servidor");
            }

            const data = await response.json();

            if (data.init_point) {
                localStorage.setItem('pendingProductId', String(id));
                // Redirige al checkout de Mercado Pago
                window.location.href = data.init_point;

            } else {
                alert("No se pudo obtener el link de pago");
            }
        } catch (error) {
            console.error("Error al procesar pago:", error);
            alert("Hubo un error: " + error.message);
        }
    }



    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modalProds" onClick={(e) => e.stopPropagation()}>
                <div id="Close">
                    <button onClick={onClose} className="close-btn">X</button>
                </div>
                <h2>{product.name}</h2>
                <img src={`https://backend-imperio.vercel.app/productos/${product.id}/imagen`} />
                <div className="sizeContainer">
                    <div id="SizeCont" className="modal-prod-field">
                        <label className="modal-prod-label" htmlFor={`prod-size-${product.id}`}>Talle</label>
                        <select id={`prod-size-${product.id}`} className="modal-prod-select" onChange={(e) => setSize(e.target.value)}>
                            <option value="">Elegir talle</option>
                            {product.size?.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                    <div id="ColorCont" className="modal-prod-field">
                        <label className="modal-prod-label" htmlFor={`prod-color-${product.id}`}>Color</label>
                        <select id={`prod-color-${product.id}`} className="modal-prod-select" onChange={(e) => setColor(e.target.value)}>
                            <option value="">Elegir color</option>
                            {product.color?.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <p>{product.description}</p>
                <p><strong>Precio: ${product.price}</strong></p>
                <button onClick={() => pagarProducto(product.id)} className="btn-primary">Confirmar Compra</button>
            </div>
        </div>,
        document.body
    );
}