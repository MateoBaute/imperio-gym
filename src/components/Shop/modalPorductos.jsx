import { createPortal } from "react-dom";
import { useState } from "react";

// Recibimos el producto y la función de cierre por props
export default function ModalProd({ product, onClose }) {
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');

    async function pagarProducto(id) {
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
            const response = await fetch("http://localhost:3001/create_preference", {
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
                // Redirige al checkout de Mercado Pago
                window.location.href = data.init_point;
                guardarProducto(id);

            } else {
                alert("No se pudo obtener el link de pago");
            }
        } catch (error) {
            console.error("Error al procesar pago:", error);
            alert("Hubo un error: " + error.message);
        }
    }

    async function guardarProducto(idProducto) {
        let UserId = localStorage.getItem('userId');
        const idUsuario = parseInt(UserId);

        const body = {
            productoId: idProducto,
            idUsuario: idUsuario
        };
        try {
            const res = await fetch('http://localhost:3001/guardarCompra', {
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


    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modalProds" onClick={(e) => e.stopPropagation()}>
                <div id="Close">
                    <button onClick={onClose} className="close-btn">X</button>
                </div>
                <h2>{product.name}</h2>
                <img src={product.img} />
                <div className="sizeContainer">
                    <div id="SizeCont">
                        <select className="size-option" onChange={(e) => setSize(e.target.value)}>
                            <option value="">Talle</option>
                            {product.size?.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                    <div id="ColorCont">
                        <select className="size-option" onChange={(e) => setColor(e.target.value)}>
                            <option value="">Color</option>
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