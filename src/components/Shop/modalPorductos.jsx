import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { AppContext } from "../../contexts/AppContext";
import { useContext } from "react";

export default function ModalProd({ product, onClose }) {
    const { isLoggedIn } = useContext(AppContext);
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    async function pagarProducto(id) {
        // ── Validaciones de sesión ──────────────────────────────────────
        if (!isLoggedIn) {
            alert("Debes iniciar sesión para realizar una compra.");
            return;
        }

        const userId = Number(localStorage.getItem('userId'));
        if (!userId) {
            alert("No se encontró el usuario. Iniciá sesión de nuevo.");
            return;
        }

        // ── Validaciones de precio ──────────────────────────────────────
        const precioNumero = Number(String(product.price).replace(',', '.'));
        if (!Number.isFinite(precioNumero) || precioNumero <= 0) {
            alert("El precio del producto no es un número válido.");
            return;
        }

        // ── Validaciones de talle y color ───────────────────────────────
        if (product.size?.length > 0 && !size) {
            alert("Por favor, selecciona un talle.");
            return;
        }
        if (product.color?.length > 0 && !color) {
            alert("Por favor, selecciona un color.");
            return;
        }

        // ── Armar el nombre con talle y color (solo si aplica) ──────────
        const extras = [
            size ? `Talle: ${size}` : null,
            color ? `Color: ${color}` : null,
        ].filter(Boolean).join(', ');

        const productoParaPagar = {
            name: extras ? `${product.name} (${extras})` : product.name,
            price: precioNumero,
            idProducto: id,
            idUsuario: userId,
        };

        // ── Llamada al backend ──────────────────────────────────────────
        try {
            setLoading(true);

            const response = await fetch("https://backend-imperio.vercel.app/create_preference", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productoParaPagar),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || "Error en el servidor");
            }

            const data = await response.json();

            if (data.init_point) {
                // ✅ Ya NO guardamos nada en localStorage ni llamamos a /guardarCompra.
                // La compra se registra automáticamente en el backend cuando MP
                // confirma el pago a través del webhook (/webhook/mercadopago).
                window.location.href = data.init_point;
            } else {
                alert("No se pudo obtener el link de pago.");
            }

        } catch (error) {
            console.error("Error al procesar pago:", error);
            alert("Hubo un error al iniciar el pago: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modalProds" onClick={(e) => e.stopPropagation()}>

                <div id="Close">
                    <button onClick={onClose} className="close-btn">X</button>
                </div>

                <h2>{product.name}</h2>

                <img className="imagenShop"
                    src={`https://backend-imperio.vercel.app/productos/${product.id}/imagen`}
                    alt={product.name}
                />

                <div className="sizeContainer">
                    {/* Solo renderizamos el select de talle si el producto tiene talles */}
                    {product.size?.length > 0 && (
                        <div id="SizeCont" className="modal-prod-field">
                            <label className="modal-prod-label" htmlFor={`prod-size-${product.id}`}>
                                Talle
                            </label>
                            <select
                                id={`prod-size-${product.id}`}
                                className="modal-prod-select"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                            >
                                <option value="">Elegir talle</option>
                                {product.size.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Solo renderizamos el select de color si el producto tiene colores */}
                    {product.color?.length > 0 && (
                        <div id="ColorCont" className="modal-prod-field">
                            <label className="modal-prod-label" htmlFor={`prod-color-${product.id}`}>
                                Color
                            </label>
                            <select
                                id={`prod-color-${product.id}`}
                                className="modal-prod-select"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            >
                                <option value="">Elegir color</option>
                                {product.color.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                <p>{product.description}</p>
                <p><strong>Precio: ${product.price}</strong></p>

                <button
                    onClick={() => pagarProducto(product.id)}
                    className="btn-primary"
                    disabled={loading}
                >
                    {loading ? "Procesando..." : "Confirmar Compra"}
                </button>

            </div>
        </div>,
        document.body
    );
}
