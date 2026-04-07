import { useState, useEffect } from "react";


export default function Rutinas({ lista, activarEdicion, enviarId }) {
    const [admin, setAdmin] = useState(false)

    async function eliminarRutina(id) {
        if (!confirm("¿Estás seguro de que quieres eliminar esta rutina?")) return;

        try {
            const response = await fetch(`https://backend-imperio.vercel.app/rutinaEliminar/${id}`, {
                method: 'DELETE', // Es el estándar para eliminar
            });

            if (response.ok) {
                alert("Rutina eliminada con éxito");
                // Aquí deberías refrescar la lista o llamar a una función 
                // que recibas por props para actualizar el estado del padre
                window.location.reload();
            } else {
                alert("Error al eliminar la rutina");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    }

    useEffect(() => {
        const verifiAdmin = localStorage.getItem('admin')
        if (verifiAdmin === 'true') {
            setAdmin(true)
        }

    }, [])

    return (
        <div className="contenedor-rutinas">
            {lista.map((rutina, index) => (
                <div key={index} className="tarjeta-rutina">
                    {/* Clase nueva: header-rutina */}
                    <div className="header-rutina">
                        <h2>{rutina.nombre}</h2>
                        <span className="spanRutinas">
                            Nivel: {rutina.nivel}
                        </span>
                    </div>

                    <div className="table-scroll-wrap">
                    <table className="tabla-ejercicios">
                        <thead>
                            <tr className="trRutinas">
                                <th className="thRutinas">Ejercicio</th>
                                <th className="thRutinas">Series</th>
                                <th className="thRutinas">Reps</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rutina.ejercicios.map((ej, i) => (
                                <tr key={i} className="trRutinass">
                                    {/* Clases nuevas: td-ejercicio y td-dato */}
                                    <td className="td-ejercicio">{ej.nombre}</td>
                                    <td className="td-dato">{ej.series}</td>
                                    <td className="td-dato">{ej.repeticiones}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                    {admin ? (<button id={rutina.id} className="btn-primary" onClick={() => { enviarId(rutina.id); activarEdicion(); }}  >Editar Rutina</button>) : null}
                    {admin && (
                        <button
                            className="btn-primary"
                            onClick={() => eliminarRutina(rutina.id)}
                        >
                            Eliminar Rutina
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}