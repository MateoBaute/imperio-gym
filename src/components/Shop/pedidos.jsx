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

    useEffect(()=> {
        traerCompras();
    }, [compras])

    return(
    <div className="SectionsPedidos">
        <h1>Pedidos</h1>
    </div>
    
)}