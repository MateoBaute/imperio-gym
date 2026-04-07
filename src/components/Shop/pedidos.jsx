import { useState, useEffect } from 'react'

export default function pedidos() {
    const [compras, setCompras] = useState([]);
    const [usuario, setUsuario] = useState(null);

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

        const body = {idUsuario: idUsuarioInt}

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

    useEffect(()=> {
        traerCompras();
        datosUsuario();
    }, [])

    return(
    <div className="SectionsPedidos">
        <h1>Pedidos</h1>
        {compras.length === 0 ? (
            <p>No hay compras registradas.</p>
        ) : (
            compras.map((compra, index) => (
                <div key={compra.id ?? `${compra.idUsuario ?? 'u'}-${compra.idProducto ?? 'p'}-${index}`}>
                    <p><strong>Usuario:</strong> {usuario ? usuario.name : 'Usuario no encontrado'}</p>
                    <p><strong>Producto:</strong> {compra.idProducto}</p>
                    <p><strong>Fecha:</strong> {compra.fechaCompra}</p>
                </div>
            ))
        )}
    </div>
    
)}