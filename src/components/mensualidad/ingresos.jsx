import { useState, useEffect } from "react";
import { formatearFechaCalendario } from "../../utils/fechaCalendario";

function formatearFecha(fecha) {
    if (!fecha) return "Sin fecha";
    return formatearFechaCalendario(fecha, "es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default function Ingresos({ userName }) {
    const [ingresos, setIngresos] = useState([]);
    const [cargando, setCargando] = useState(false);

    async function traerIngresos(name) {
        try {
            setCargando(true);
            const response = await fetch("https://backend-imperio.vercel.app/ingresos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });

            const data = await response.json();

            if (data.success && Array.isArray(data.ingresos)) {
                setIngresos(data.ingresos);
            } else {
                setIngresos([]);
            }
        } catch (error) {
            console.log(error);
            alert("Error al traer los ingresos del usuario");
            setIngresos([]);
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        if (!userName || userName === "Datos del usuario") return;
        traerIngresos(userName);
    }, [userName]);

    return (
        <div className="usuariosMensualidad usuariosMensualidad--ingresos-historial">
            {cargando && (
                <p className="ingreso-usuario__estado">Cargando ingresos...</p>
            )}

            {!cargando && ingresos.length > 0 && (
                <div className="clientes-list ingresos-historial__list">
                    {ingresos.map((ingreso, index) => {
                        const nombre =
                            ingreso.name ||
                            ingreso.nombre ||
                            userName ||
                            "Sin nombre";
                        const inicial = String(nombre).charAt(0).toUpperCase();
                        const cedula =
                            ingreso.cedula != null && ingreso.cedula !== ""
                                ? String(ingreso.cedula)
                                : "—";

                        return (
                            <div
                                key={ingreso.id ?? `ingreso-${index}`}
                                className="cliente-row cliente-row--activo"
                            >
                                <div className="cliente-row__avatar">
                                    {inicial}
                                </div>
                                <div className="cliente-row__info">
                                    <span className="cliente-row__nombre">
                                        {nombre}
                                    </span>
                                    <span className="cliente-row__correo">
                                        Registro de ingreso
                                    </span>
                                </div>
                                <div className="cliente-row__field">
                                    <span className="cliente-row__label">
                                        Cédula
                                    </span>
                                    <span className="cliente-row__value">
                                        {cedula}
                                    </span>
                                </div>
                                <div className="cliente-row__field">
                                    <span className="cliente-row__label">
                                        Fecha
                                    </span>
                                    <span className="cliente-row__value">
                                        {formatearFecha(ingreso.fecha)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {!cargando && ingresos.length === 0 && (
                <p className="ingreso-usuario__estado ingresos-historial__empty">
                    No hay registros de que este usuario haya ingresado
                </p>
            )}
        </div>
    );
}
