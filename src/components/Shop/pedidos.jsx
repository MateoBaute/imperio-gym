import { useState, useEffect } from 'react'

export default function Pedidos() {
    const [compras, setCompras] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const [productosPorId, setProductosPorId] = useState({});

    async function traerCompras(){
        try {

            const response = await  fetch('https://backend-imperio.vercel.app/compras');
            const data = await response.json();

            if(data.success){
                setCompras(data.compras)
            }

        }catch (error){

        }
    }

    async function datosUsuario(){
        const usuarioId = localStorage.getItem('userId');
        const idUsuarioInt = Number(usuarioId);
        console.log(idUsuarioInt)

        const body = { idUsuarioInt}

        try{
            const response = await fetch('https://backend-imperio.vercel.app/comprasUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();

            if(data.success){
                setUsuario(data.user)
                console.log(usuario)
            }

        }catch (error){

        }
    }

    async function traerProductoCompra(idProducto){
        const body = {idProducto: idProducto}
        try{
            const response = await fetch('https://backend-imperio.vercel.app/productoCompra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();

            if(data.success){
                return data.producto;
            }
            return null;

        }catch (error){
            console.error('Error al traer el producto:', error);
            return null;
        }
    }

    const formatearFecha = (fecha) => {
        if (!fecha) return 'Fecha no encontrada';
        const fechaObj = new Date(fecha);
        if (Number.isNaN(fechaObj.getTime())) return 'Fecha no valida';

        return fechaObj.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    useEffect(()=> {
        traerCompras();
        datosUsuario();
    }, [])

    useEffect(() => {
        async function cargarProductos() {
            if (compras.length === 0) return;

            const idsUnicos = [...new Set(compras.map((compra) => Number(compra.idProducto)).filter(Boolean))];
            const resultados = await Promise.all(idsUnicos.map((id) => traerProductoCompra(id)));

            const productosMap = {};
            idsUnicos.forEach((id, index) => {
                if (resultados[index]) {
                    productosMap[id] = resultados[index];
                }
            });
            setProductosPorId(productosMap);
        }

        cargarProductos();
    }, [compras]);

    return(
    <div className="SectionsPedidos">
        <h1>Pedidos</h1>
        {compras.length === 0 ? (
            <p>No hay compras registradas.</p>
        ) : (
            compras.map((compra, index) => (
                <div key={compra.id ?? `${compra.idUsuario ?? 'u'}-${compra.idProducto ?? 'p'}-${index}`}>
                    <p><strong>Usuario:</strong> {usuario ? usuario.name : 'Usuario no encontrado'}</p>
                    <p><strong>Producto:</strong> {productosPorId[Number(compra.idProducto)]?.name ?? 'Producto no encontrado'}</p>
                    <p><strong>Fecha:</strong> {formatearFecha(compra.fechaCompra)}</p>
                </div>
            ))
        )}
    </div>
    
)}