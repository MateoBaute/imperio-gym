import { useState, useEffect } from 'react';
import ModalProd from './modalPorductos'


// {productos}
export default function Products() {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const productos = [
        {
            id: 1,
            name: 'Remeras Imperio Gym',
            price: 1,
            description: 'Remera tela de anti-transpirante, ideal para el Gym.',
            img: 'https://basuy.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fbasuy.vtexassets.com%2Farquivos%2Fids%2F832259%2F082049_1.jpg%3Fv%3D639082315019300000',
            size: ['XS', 'S', 'M', 'L', 'XL'],
            color: ['Blanco', 'Negro', 'Rojo']
        },
        {
            id: 2,
            name: 'Chaqueta Imperio Gym',
            price: 2,
            description: 'Chaqueta ligera resistente al viento con forro térmico interno.',
            img: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRpPv2BWih2QgBNHtbeGesLvqr0ryEmsLQORaxwcC5KNmUsZ4NuTiAUIItJDNrpSoMPlJb3lvFj9t9A-rUAwv2_evBs4VvClxMEagU_kqZfqa_7VDhFHXH5Y91Xc9xJY9RWWwmhfFE&usqp=CAc',
            size: ['XS', 'S', 'M', 'L', 'XL'],
            color: ['Negro', 'Azul', 'Rojo']

        }
    ];

    const openModal = (id) => {
        const resultado = productos.find((p) => p.id === id);
        setSelectedProduct(resultado);
        document.body.style.overflow = 'hidden';

    }
    
    const closeModal = () => {
        setSelectedProduct(null);
        document.body.style.overflow = 'auto';
    };

    useEffect(()=> {
        addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        return (() => {
            removeEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                }
            });
        });
    }, [])

    return (
        <div className="ShopSection">
            {productos.map((product, index) => (
                <div key={index} className="CardShop">
                    <div>
                        <h2>{product.name}</h2>
                        <img src={product.img} />
                        <p>{product.description}</p>
                        <p><strong>Precio: ${product.price}</strong></p>
                    </div>
                    <button onClick={() => openModal(product.id)} className="btn-primary">Ver Producto</button>
                </div>
            ))}
            {selectedProduct && (
                <ModalProd product={selectedProduct} onClose={closeModal} />
            )}
        </div>
    );
}


//La primera guerra mundial es Hisoria historica