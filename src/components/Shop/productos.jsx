import { useState } from 'react';
import ModalProd from './modalPorductos'


// {productos}
export default function Products() {
    const [show, setShow] = useState(false)
    const productos = [
        {
            id: 1,
            name: 'Zapatillas Urbanas',
            price: 2100,
            description: 'Calzado cómodo con suela de goma antideslizante, ideal para uso diario.',
            img1: 'https://basuy.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fbasuy.vtexassets.com%2Farquivos%2Fids%2F832259%2F082049_1.jpg%3Fv%3D639082315019300000',
            img2: ''
        },
        {
            id: 2,
            name: 'Chaqueta Bomber',
            price: 1500,
            description: 'Chaqueta ligera resistente al viento con forro térmico interno.',
            img1: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRpPv2BWih2QgBNHtbeGesLvqr0ryEmsLQORaxwcC5KNmUsZ4NuTiAUIItJDNrpSoMPlJb3lvFj9t9A-rUAwv2_evBs4VvClxMEagU_kqZfqa_7VDhFHXH5Y91Xc9xJY9RWWwmhfFE&usqp=CAc',

        }
    ];

    const openModal = (id) => {
        const resultado = productos.find((p) => p.id === id);

    }

    return (
        <div className="ShopSection">
            {productos.map((product, index) => (
                <div key={index} className="CardShop">
                    <div>
                        <h2>{product.name}</h2>
                        <img src={product.img1} />
                        <p>{product.description}</p>
                    </div>
                    <button onClick={openModal(product.id)} className="btn-primary">Comprar</button>
                </div>
            ))}
            
        </div>
    );
}