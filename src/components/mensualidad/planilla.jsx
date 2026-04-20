import Clientes from './clientes'
import { useState } from 'react'

export default function Mensualidades() {
    const [clientes, setClientes] = useState([])
    const [nombre, setNombre] = useState('')
    const [cedula, setCedula] = useState('')
    const [correo, setCorreo] = useState('')
    const [monto, setMonto] = useState('')
    const [fechaPago, setFechaPago] = useState('')
    const [fechaVencimiento, setFechaVencimiento] = useState('')

    async function ingresarUsuario(){
        const body = {
            name: nombre,
            cedula: cedula,
            correo: correo,
            monto: monto,
            fechaPago: fechaPago,
            fechaVencimiento: fechaVencimiento
        }
        console.log(body)
        try{
            const response = await fetch('http://localhost:3001/api/user', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })

            const data = await response.json()
            if(data.success){
                alert('Usuario registrado con éxito')
                setClientes([...clientes, body])
            } else {
                alert('Error al registrar usuario')
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Error al registrar usuario')
        }

    }

    return (
        <div className="ingresoUsuarios">
            <h1>Mensualidades</h1>
                <div className="ingresoUsuarios__form">
                    <input className="inputMensualidad" type="text" placeholder="Nombre del cliente" onChange={(e) => setNombre(e.target.value)} />
                    <input className="inputMensualidad" type="number" placeholder="Cédula del cliente" onChange={(e) => setCedula(e.target.value)} />
                    <input className="inputMensualidad" type="email" placeholder="Correo electrónico del cliente" onChange={(e) => setCorreo(e.target.value)} />
                    <input className="inputMensualidad" type="number" placeholder="Monto a pagar" onChange={(e) => setMonto(e.target.value)} />
                    <input className="inputMensualidad" type="date" placeholder="Fecha de pago" onChange={(e) => setFechaPago(e.target.value)} />
                    <input className="inputMensualidad" type="date" placeholder="Fecha de vencimiento" onChange={(e) => setFechaVencimiento(e.target.value)} />
                </div>
                <div className="ingresoUsuarios__buttons">
                    <button className="buttonMensualidad" onClick={ingresarUsuario}>Registrar pago</button>
                </div>
            <div className="usuariosMensualidad">
                <Clientes />
            </div>
        </div>
    )
}