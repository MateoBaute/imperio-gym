import { createPortal } from "react-dom";
import { useState, useEffect } from "react";


export default function ModalCrearProducto({ onClose }) {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState(null);
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const handleSubmit = async (e) => {
        console.log('Se ejejcutó HandelSubmit');
        e.preventDefault();

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("precio", precio);
        formData.append("descripcion", descripcion);
        formData.append("imagen", imagen);
        formData.append("size", size);
        formData.append("color", color);

        console.log(descripcion);
        try {
            const res = await fetch("https://backend-imperio.vercel.app/productos", {
                method: "POST",
                body: formData
            });

            const text = await res.text();
            let data = {};
            if (text) {
                try {
                    data = JSON.parse(text);
                } catch {
                    data = {};
                }
            }
            console.log(data);

            if (!res.ok) {
                const msg =
                    data?.message ||
                    data?.error ||
                    (text && !text.trim().startsWith("{") ? text.slice(0, 200) : null) ||
                    `Error al crear el producto (${res.status})`;
                alert(msg);
                return;
            }

            if (data.success === false) {
                alert(data.message || "No se pudo crear el producto");
                return;
            }

            alert("El producto se creó correctamente.");
            onClose?.();
        } catch (error) {
            console.error(error);
            alert(error?.message || "No se pudo conectar con el servidor. Revisa tu conexión.");
        }
    };

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modalForm" onClick={(e) => e.stopPropagation()}>
                    <button onClick={onClose} type="button" className="close-btn">X</button>
                <form onSubmit={handleSubmit}>
                    <h2>Crear Producto</h2>
                    <input type="text" placeholder="Nombre" onChange={(e) => setNombre(e.target.value)} />
                    <input type="number" placeholder="Precio" onChange={(e) => setPrecio(e.target.value)} />
                    <input type="text" placeholder="Descripción" onChange={(e) => setDescripcion(e.target.value)} />
                    <input type="file" onChange={(e) => setImagen(e.target.files[0])} />
                    <input type="text" placeholder="Talla" onChange={(e) => setSize(e.target.value)} />
                    <input type="text" placeholder="Color" onChange={(e) => setColor(e.target.value)} />
                    <button type="submit" className='btn-primary'>Crear Producto</button>
                </form>
            </div>
        </div>,
        document.body
    );
}