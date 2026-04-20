import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import Ingresos from './ingresos'

export default function ModalIngresoCliente({ onClose, idUser }) {
    const [user, setUser] = useState(null)
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    useEffect(() => {
        if (!idUser) return;
        traerUsuarios(idUser)
    }, [idUser])

    async function traerUsuarios(id) {
        try {
            setCargando(true)
            setError(null)
            const response = await fetch('https://backend-imperio.vercel.app/usuario/mensualidades', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })
            const data = await response.json();

            if (data.success) {
                setUser(data.user)
            } else {
                setError('No se pudieron obtener los datos del usuario')
            }
        } catch (error) {
            setError('Error al consultar la base de datos')
        } finally {
            setCargando(false)
        }
    }

    function formatearValor(valor) {
        if (valor === null || valor === undefined || valor === "") return "Sin dato";
        if (typeof valor === "boolean") return valor ? "Si" : "No";
        if (valor instanceof Date && !Number.isNaN(valor.getTime())) {
            return valor.toLocaleDateString("es-ES");
        }
        if (typeof valor === "string") {
            const fechaParseada = new Date(valor);
            const esFechaISO = /^\d{4}-\d{2}-\d{2}(T.*)?$/.test(valor);
            if (esFechaISO && !Number.isNaN(fechaParseada.getTime())) {
                return fechaParseada.toLocaleDateString("es-ES");
            }
        }
        return String(valor);
    }

    function obtenerRegistroPrincipal() {
        if (!user) return null;
        if (Array.isArray(user)) return user[0] ?? null;
        if (typeof user === "object") return user;
        return null;
    }

    function renderFila(etiqueta, valor) {
        return (
            <div key={etiqueta} className="ingreso-usuario__fila">
                <span className="ingreso-usuario__etiqueta">{etiqueta}</span>
                <span className="ingreso-usuario__valor">{formatearValor(valor)}</span>
            </div>
        );
    }

    const registro = obtenerRegistroPrincipal();
    const nombreUsuario = registro?.name || registro?.nombre || "Datos del usuario";

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="contenidoModalIngreso" onClick={(e) => e.stopPropagation()}>
                <div className="ingreso-usuario__header">
                    <h2 className="ingreso-usuario__titulo">{nombreUsuario}</h2>
                    <p className="ingreso-usuario__subtitulo">Resumen de mensualidad</p>
                </div>

                {cargando && <p className="ingreso-usuario__estado">Cargando informacion...</p>}
                {error && <p className="ingreso-usuario__estado ingreso-usuario__estado--error">{error}</p>}

                {!cargando && !error && !user && (
                    <p className="ingreso-usuario__estado">No hay informacion para mostrar.</p>
                )}

                {!cargando && !error && registro && (
                    <div className="ingreso-usuario__card">
                        {renderFila("Cedula", registro.cedula)}
                        {renderFila("Correo", registro.correo)}
                        {renderFila("Monto", registro.monto)}
                        {renderFila("Fecha de pago", registro.fechaPago)}
                        {renderFila("Fecha de vencimiento", registro.fechaVencimiento)}
                    </div>
                )}
                <div className="IngresosCliente">
                    <Ingresos />
                </div>
            </div>
        </div>, document.body
    )
}