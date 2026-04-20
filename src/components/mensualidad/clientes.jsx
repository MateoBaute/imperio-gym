import { useState, useEffect } from "react";
import RegistroIngresos from './RegistroIngresos'
import { parseFechaCalendario, formatearFechaCalendario } from "../../utils/fechaCalendario";

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(0);
    const [show, setShow] = useState(false);

    useEffect(() => { fetchClientes(); }, []);

    async function fetchClientes() {
        try {
            setCargando(true);
            const response = await fetch('https://backend-imperio.vercel.app/api/mensualidad');
            const data = await response.json();

            if (data.success && data.datos) {
                const clientesMap = {};
                data.datos.forEach(pago => {
                    const fechaPagoActual = parseFechaCalendario(pago.fechaPago);
                    if (!clientesMap[pago.cedula] || fechaPagoActual > clientesMap[pago.cedula].fechaPago) {
                        clientesMap[pago.cedula] = {
                            cedula: pago.cedula,
                            nombre: pago.name,
                            correo: pago.correo,
                            monto: pago.monto,
                            fechaPago: fechaPagoActual,
                            fechaVencimiento: parseFechaCalendario(pago.fechaVencimiento),
                            id: pago.id
                        };
                    }
                });
                setClientes(Object.values(clientesMap));
                setError(null);
            } else {
                setError('Error al obtener los clientes');
            }
        } catch (error) {
            setError('Error al cargar los clientes');
        } finally {
            setCargando(false);
        }
    }

    const hoy = new Date();

    if (cargando) return <div className="clientes-container"><p>Cargando mensualidades...</p></div>;
    if (error) return <div className="clientes-container"><p className="error">{error}</p></div>;

    const onClose = () => { setShow(false) }

    return (
        <div className="clientes-container">
            {clientes.length === 0 ? (
                <p>No hay mensualidades registradas</p>
            ) : (
                <div className="clientes-list">
                    {clientes.map((cliente, index) => {
                        const vencido = cliente.fechaVencimiento < hoy;
                        return (
                            <div key={index} className={`cliente-row ${vencido ? 'cliente-row--vencido' : 'cliente-row--activo'}`}>
                                {/* Avatar / inicial */}
                                <div className="cliente-row__avatar">
                                    {cliente.nombre.charAt(0).toUpperCase()}
                                </div>

                                {/* Nombre + correo */}
                                <div className="cliente-row__info">
                                    <span className="cliente-row__nombre">{cliente.nombre}</span>
                                    <span className="cliente-row__correo">{cliente.correo}</span>
                                </div>

                                {/* Cédula */}
                                <div className="cliente-row__field">
                                    <span className="cliente-row__label">Cédula</span>
                                    <span className="cliente-row__value">{cliente.cedula}</span>
                                </div>

                                {/* Monto */}
                                <div className="cliente-row__field">
                                    <span className="cliente-row__label">Monto</span>
                                    <span className="cliente-row__value">${cliente.monto}</span>
                                </div>

                                {/* Último pago */}
                                <div className="cliente-row__field">
                                    <span className="cliente-row__label">Último pago</span>
                                    <span className="cliente-row__value">{formatearFechaCalendario(cliente.fechaPago)}</span>
                                </div>

                                {/* Vencimiento + badge */}
                                <div className="cliente-row__field">
                                    <span className="cliente-row__label">Vencimiento</span>
                                    <span className="cliente-row__value">{formatearFechaCalendario(cliente.fechaVencimiento)}</span>
                                </div>

                                <span className={`cliente-row__badge ${vencido ? 'badge--vencido' : 'badge--activo'}`}>
                                    {vencido ? 'Vencido' : 'Activo'}
                                </span>

                                <button
                                    className="cliente-row__btn"
                                    onClick={() => {
                                        setUserId(cliente.id);
                                        setShow(true);
                                    }}
                                >
                                    Ver más
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
            {show ? (<RegistroIngresos onClose={onClose} idUser={userId} />) : null}
            
        </div>
    );
}