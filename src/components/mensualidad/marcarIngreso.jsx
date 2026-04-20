import { createPortal } from "react-dom"
import { useState } from "react"

export default function Ingresos({ onClose }) {
    const [name, setName] = useState('');
    const [cedula, setCedula] = useState('');


    const formatearFecha = (fecha) => {
        if (!fecha) return 'Fecha no encontrada';
        const fechaObj = new Date(fecha);
    
        const year = fechaObj.getFullYear();
        const month = String(fechaObj.getMonth() + 1).padStart(2, '0');
        const day = String(fechaObj.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    }

    async function marcarIngreso() {
        if (!name || !cedula) {
            return (alert('Debes completar todos los campos'))
        }
        const fecha = new Date;
        const fechaFormateada = formatearFecha(fecha);
        const cedulaFinal = Number(cedula)

        try {
            const response = await fetch('https://backend-imperio.vercel.app/marcarIngreso', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, cedulaFinal, fecha: fechaFormateada })
            })

            const data = await response.json()

            if (data.success) {
                alert(data.message);
            } else {
                alert(data.message); 
            }
        } catch (error) {
            console.log('Ha ocurrido un error: ', error);
            alert('Error al marcar ingreso');
        } finally {
            setName('');
            setCedula('');
        }
    }

    return createPortal(
        <div className='modal-overlay' onClick={onClose}>
            <div className="contenidoModalRegistro" onClick={(e) => { e.stopPropagation() }}>
                <h2>Marcar Ingreso al gym</h2>
                <div className='contenedorInputs' >
                    <label className="input-registro">
                        <span className="input-registro__label">Nombre completo</span>
                        <input type="text" value={name} placeholder="Ingrese su nombre completo" onChange={(e) => { setName(e.target.value) }} />
                    </label>
                    <label className="input-registro">
                        <span className="input-registro__label">Cedula</span>
                        <input type="number" value={cedula} placeholder="Ingrese su cedula" onChange={(e) => { setCedula(e.target.value) }} />
                    </label>
                </div>
                <button onClick={marcarIngreso} className="btn-primary">Confirmar Ingreso</button>
            </div>
        </div>, document.body
    )
}