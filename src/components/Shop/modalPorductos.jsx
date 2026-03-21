import { createPortal } from "react-dom";

// Recibimos el producto y la función de cierre por props
export default function ModalProd({ product, onClose }) {


    function guardarProducto(){
        const producto = {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            img: product.img1,
            size: product.size,
            color: product.color
        }
    }

    return createPortal(
        <div className="modal-overlay">
            <div className="modalProds">
                <div id="Close" >
                    <button onClick={onClose} className="close-btn">X</button>
                </div>
                <h2>{product.name}</h2>
                <img src={product.img} />
                <div className="sizeContainer">
                    <select className="size-option">
                        {product.size?.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <select className="size-option">
                        {product.color?.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                <p>{product.description}</p>
                <p><strong>Precio: ${product.price}</strong></p>
                <button className="btn-primary">Confirmar Compra</button>
            </div>
        </div>,
        document.body
    );
}


// import { createPortal } from "react-dom";
// import { useState } from "react"; // 1. Importamos useState

// export default function ModalProd({ product, onClose }) {
//     // 2. Estado para el índice de la imagen actual
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const nextImage = () => {
//         // Si es la última imagen, vuelve a la primera (0)
//         setCurrentIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
//     };

//     const prevImage = () => {
//         // Si es la primera, va a la última
//         setCurrentIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
//     };

//     return createPortal(
//         <div className="modal-overlay">
//             <div className="modalProds">
//                 <div id="Close" >
//                     <button onClick={onClose} className="close-btn">X</button>
//                 </div>
                
//                 <h2>{product.name}</h2>

//                 {/* 3. Estructura del Carrusel */}
//                 <div className="carousel-container" style={{ position: 'relative', textAlign: 'center' }}>
//                     <button onClick={prevImage} className="nav-btn left">‹</button>
                    
//                     <img 
//                         src={product.images[currentIndex]} 
//                         alt={product.name} 
//                         style={{ width: '100%', height: 'auto' }} 
//                     />
                    
//                     <button onClick={nextImage} className="nav-btn right">›</button>
                    
//                     {/* Indicador de posición (opcional) */}
//                     <p>{currentIndex + 1} / {product.images.length}</p>
//                 </div>

//                 {/* ... resto del contenido (selects, descripción, etc) */}
//             </div>
//         </div>,
//         document.body
//     );
// }