import { useState, useEffect } from 'react'

export default function pedidos() {
    const [compras, setCompras] = useState([]);

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
        try{
            const response = await fetch('https://localhost:3001/datosUser');
            const data = await response.json();

            
        }catch (error){

        }
    }

    useEffect(()=> {
        traerCompras();
    }, [])

    return(
    <div className="SectionsPedidos">
        <h1>Pedidos</h1>
        {compras.length === 0 ? (
            <p>No hay compras registradas.</p>
        ) : (
            compras.map((compra, index) => (
                <div key={compra.id ?? `${compra.idUsuario ?? 'u'}-${compra.idProducto ?? 'p'}-${index}`}>
                    <p><strong>Usuario:</strong> {compra.idUsuario}</p>
                    <p><strong>Producto:</strong> {compra.idProducto}</p>
                    <p><strong>Fecha:</strong> {compra.fechaCompra}</p>
                </div>
            ))
        )}
    </div>
    
)}