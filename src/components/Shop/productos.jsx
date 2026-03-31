import { useState, useEffect } from 'react';
import ModalProd from './modalPorductos'
import ModalCrearProducto from './modalCrearProducto';


// {productos}
export default function Products() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [agregar, setAgregar] = useState(false);
    const [productos, setProductos] = useState([]);
    const [admin, setAdmin] = useState(false);


    async function obtenerProds() {
        try {
            const response = await fetch('http://localhost:3001/productosGet');
            const data = await response.json();


            if (data.success) {
                console.log('data.data:', data.data);
                // Transformamos los datos antes de guardarlos en el estado
                const productosFormateados = data.data.map(prod => ({
                    ...prod,
                    // Si size es un string "S,M,L", lo convertimos en ["S", "M", "L"]
                    size: typeof prod.size === 'string' ? prod.size.split(',') : [],
                    // Hacemos lo mismo con color
                    color: typeof prod.color === 'string' ? prod.color.split(',') : []
                }));
                console.log(productosFormateados);
                setProductos(productosFormateados);
            }
        } catch (error) {
            console.error('Error fetching products:', error);

        }
    }

    const openModalCompra = (id) => {
        const resultado = productos.find((p) => p.id === id);
        console.log(resultado)
        setSelectedProduct(resultado);
        document.body.style.overflow = 'hidden';

    }

    const closeModal = () => {
        setSelectedProduct(null);
        setAgregar(false);
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
        const userType = localStorage.getItem('admin');
        if (userType === 'true') {
            setAdmin(true);
        }
        console.log(admin, userType);
        console.log(productos);
        obtenerProds();


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
            <div id='agregarProd'>{admin && (
                <button className='btn-primary' onClick={() => { setAgregar(true) }}>Agregar Producto</button>
            )}</div>
            {productos.map((product, index) => (
                <div onClick={() => openModalCompra(product.id)} key={index} className="CardShop">
                    <div>
                        <h2>{product.name}</h2>
                        <div className='img-container'>
                            <img src={`http://localhost:3001/productos/${product.id}/imagen`} />
                        </div>
                        <p>{product.description}</p>
                        <p><strong>Precio: ${product.price}</strong></p>
                    </div>
                    <button onClick={() => openModalCompra(product.id)} className="btn-primary">Ver Producto</button>
                </div>
            ))}
            {agregar && (
                <ModalCrearProducto onClose={closeModal} />
            )}

            {selectedProduct && (
                <ModalProd product={selectedProduct} onClose={closeModal} />
            )}
        </div>
    );
}


//La primera guerra mundial es Hisoria historica