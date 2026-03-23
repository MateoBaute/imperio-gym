import { createPortal } from "react-dom";
import { useState } from "react";

// Recibimos el producto y la función de cierre por props
export default function ModalProd({ product, onClose }) {
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');



    function guardarProducto(){
        const producto = {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            img: product.img,
            size: size,
            color: color
        }
        console.log(producto)
    }

    return createPortal(
        <div className="modal-overlay">
            <div className="modalProds">
                <div id="Close" >
                    <button onClick={onClose} className="close-btn">X</button>
                </div>
                <h2>{product.name}</h2>
                <img src={product.img}  />
                <div className="sizeContainer">
                    <div id="SizeCont">
                        <label>Talle</label>
                        <select className="size-option" onChange={(e) => setSize(e.target.value)}>
                         {product.size?.map((s) => (
                             <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                    <div id="ColorCont">
                        <label>Color</label>
                        <select className="size-option" onChange={(e) =>  setColor(e.target.value)}>
                            {product.color?.map((c) => (
                             <option key={c}value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <p>{product.description}</p>
                <p><strong>Precio: ${product.price}</strong></p>
                <button onClick={guardarProducto()} className="btn-primary">Confirmar Compra</button>
            </div>
        </div>,
        document.body
    );
}