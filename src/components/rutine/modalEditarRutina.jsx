import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function editRutinas({ rutinas, idRutinaEditar, onClose }) {
    const [rutinaEncontrada, setRutinaEncontrada] = useState(null);
    const [ejerciciosCatalogo, setEjerciciosCatalogo] = useState([]);

    const [nombre, setNombre] = useState("");
    const [nivel, setNivel] = useState("");
    const [listaEjercicios, setListaEjercicios] = useState([]);

    function buscarRutina() {
        const rutinaBuscada = rutinas.find(rutina => rutina.id === idRutinaEditar);
        console.log(rutinaBuscada);
        if (rutinaBuscada) {
            setRutinaEncontrada(rutinaBuscada);
            
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

        // Campos que deben ser enteros según la BBDD
        let val = value;
        if (field === 'series' || field === 'repeticiones' || field === 'ejercicio_id') {
            // parseInt; si no se puede, usar 0 para evitar NaN
            val = parseInt(value, 10);
            if (isNaN(val)) val = 0;
        }

        nuevaLista[index] = { ...nuevaLista[index], [field]: val };
        setListaEjercicios(nuevaLista);
    };

    async function guardarRutina() {
        // Enviar solo los campos que el backend espera
        const ejerciciosEnviar = listaEjercicios.map(ej => ({
            ejercicio_id: parseInt(ej.ejercicio_id, 10) || 0,
            series: parseInt(ej.series, 10) || 0,
            repeticiones: parseInt(ej.repeticiones, 10) || 0
        }));

        console.log("Guardando rutina con datos:", { nombre, nivel, ejerciciosEnviar });
        let creadorId = localStorage.getItem('userId');
        // asegurar que creadorId sea entero
        creadorId = parseInt(creadorId, 10) || 0;
        try {
            const body = {
                nombreRutina: nombre, // Coincide con el back corregido
                nivel: nivel,
                creador: creadorId,
                ejercicios: ejerciciosEnviar
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
        <div className="modal-wrapper" onClick={onClose}>
            <div className="contenidoModalRutinas" onClick={(e) => e.stopPropagation()}>
                <div className="contenidoModal">
                    <h2>Editar Rutina</h2>

                    <label >Nombre de la rutina: </label>
                    <input
                        className="inputRutinas"
                        defaultValue={rutinaEncontrada.nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    <label>Nivel: </label>
                    <select defaultValue={rutinaEncontrada.nivel} onChange={(e) => setNivel(e.target.value)}>
                        <option value="Principiante">Principiante</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Experto">Experto</option>
                    </select>

                    {/* Mapeo de la rutina encontrada originalmente */}
                    {rutinaEncontrada.ejercicios.map((ej, index) => (
                        <div key={index} className="ejercicio-row">
                            <label>Ejercicio {index + 1}: </label>
                            <select onChange={(e) => updateEjercicio(index, 'ejercicio_id', e.target.value)}>
                                <option value={ej.ejercicio_id}>{ej.nombre}</option>
                                
                                {ejerciciosCatalogo.map((ej) => (
                                    <option key={ej.id} value={ej.id}>{ej.nombre}</option>
                                ))}
                            </select>

                            <div className="ejercicio-row__inputs">
                                <div>
                                    <label>Series: </label>
                                    <input
                                        className="inputRutinas"
                                        defaultValue={ej.series}
                                        onChange={(e) => updateEjercicio(index, 'series', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>Reps: </label>
                                    <input
                                        className="inputRutinas"
                                        defaultValue={ej.repeticiones}
                                        onChange={(e) => updateEjercicio(index, 'repeticiones', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <button type="button" onClick={guardarRutina} className="btn-primary modal-rutina__save">
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}