import { createPortal } from "react-dom";

// Recibimos el producto y la función de cierre por props
export default function ModalProd({ product, onClose }) {

    return createPortal(
        <div className="modal-overlay">
            <div className="modalProds">
                <button onClick={onClose} className="close-btn">X</button>
                <h2>{product.name}</h2>
                <img src={product.img1}/>
                <p>{product.description}</p>
                <p><strong>Precio: ${product.price}</strong></p>
                <button className="btn-primary">Confirmar Compra</button>
            </div>
        </div>,
        document.body
    );
}