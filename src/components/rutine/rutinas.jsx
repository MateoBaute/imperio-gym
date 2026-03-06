import { useState, useEffect } from "react";


export default function Rutinas({ lista, activarEdicion, enviarId }) {
    const [admin, setAdmin] = useState(false)


    useEffect(() => {
        if (localStorage.getItem('admin')) {
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

            {/* Clase nueva: tabla-ejercicios */}
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
            {admin ? (<button id={rutina.id} className="btn-primary"  onClick={() => { enviarId(rutina.id); activarEdicion(); }}  >Editar Rutina</button>) : null}
            <button className="btn-primary">Elegir {rutina.nombre}</button>
        </div>
    ))}
</div>
    );
}