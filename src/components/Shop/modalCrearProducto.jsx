import { createPortal } from "react-dom";
import { useState } from "react";

export default function ModalCrearProducto({ onClose }) {

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState(null);
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");

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
            const res = await fetch("http://localhost:3001/productos", {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            console.log(data);

            onClose();
        } catch (error) {
            console.error(error);
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