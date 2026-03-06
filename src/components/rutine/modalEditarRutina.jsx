import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function editRutinas({ rutinas, idRutinaEditar }) {
    const [rutinaEncontrada, setRutinaEncontrada] = useState(null);
    const [ejerciciosCatalogo, setEjerciciosCatalogo] = useState([]);

    const [nombre, setNombre] = useState("");
    const [nivel, setNivel] = useState("");
    const [listaEjercicios, setListaEjercicios] = useState([]);

    function buscarRutina() {
        const rutinaBuscada = rutinas.find(rutina => rutina.id === idRutinaEditar);
        if (rutinaBuscada) {
            setRutinaEncontrada(rutinaBuscada);
            // CORRECCIÓN: Usa los nombres exactos que vienen de tu BD
            setNombre(rutinaBuscada.nombre);
            setNivel(rutinaBuscada.nivel);
            setListaEjercicios(rutinaBuscada.ejercicios);
        }
    }

    async function traerEjercicios() {
        try {
            const response = await fetch('http://localhost:3001/ejercicios');
            const data = await response.json();
            if (data.success) setEjerciciosCatalogo(data.data);
        } catch (error) {
            console.error("Error al traer ejercicios:", error);
        }
    }

    // SISTEMA DE GUARDADO (Actualiza listaEjercicios)
    const updateEjercicio = (index, field, value) => {
        const nuevaLista = [...listaEjercicios];

        nuevaLista[index] = { ...nuevaLista[index], [field]: value };
        setListaEjercicios(nuevaLista);
    };

    async function guardarRutina() {
        console.log("Guardando rutina con datos:", { nombre, nivel, listaEjercicios });
        const creadorId = localStorage.getItem('userId');
        try {
            const body = {
                nombreRutina: nombre, // Coincide con el back corregido
                nivel: nivel,
                creador: creadorId,
                ejercicios: listaEjercicios
            };
            console.log("Enviando al backend:", body);

            const response = await fetch(`http://localhost:3001/editarRutina/${idRutinaEditar}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            if (data.success) {
                alert("Rutina editada con éxito");
                window.location.reload();
            }
        } catch (error) {
            alert("Error al conectar con el servidor");
        }
    }

    useEffect(() => {
        buscarRutina();
        traerEjercicios();
        console.log("Rutina encontrada para editar:", idRutinaEditar);
    }, [idRutinaEditar]);

    if (!rutinaEncontrada) return null;

    return createPortal(
        <div className="modal-wrapper">
            <div className="contenidoModalRutinas">
                <div className="contenidoModal">
                    <h2>Editar Rutina</h2>

                    <label>Nombre de la rutina: </label>
                    <input
                        defaultValue={rutinaEncontrada.nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    <label>Nivel: </label>
                    <select defaultValue={rutinaEncontrada.nivel} onChange={(e) => setNivel(e.target.value)}>
                        <option value="Principiante">Principiante</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                    </select>

                    {/* Mapeo de la rutina encontrada originalmente */}
                    {rutinaEncontrada.ejercicios.map((ejercicio, index) => (
                        <div key={index} className="ejercicio-row">
                            <label>Ejercicio {index + 1}: </label>
                            <select onChange={(e) => updateEjercicio(index, 'ejercicio_id', e.target.value)}>
                                <option value={ejercicio.ejercicio_id}>{ejercicio.nombre}</option>
                                {ejerciciosCatalogo.map((ej) => (
                                    <option key={ej.id} value={ej.id}>{ej.nombre}</option>
                                ))}
                            </select>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <div>
                                    <label>Series: </label>
                                    <input
                                        className="inputRutinas"
                                        defaultValue={ejercicio.series}
                                        onChange={(e) => updateEjercicio(index, 'series', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>Reps: </label>
                                    <input
                                        className="inputRutinas"
                                        defaultValue={ejercicio.repeticiones}
                                        onChange={(e) => updateEjercicio(index, 'repeticiones', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <button onClick={guardarRutina} className="btn-primary">
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}