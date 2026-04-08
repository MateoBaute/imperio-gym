import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

export default function ModalCrear({ onClose }) {
    // 1. ESTADOS
    const [ejerciciosCatalogo, setEjerciciosCatalogo] = useState([]); // Los que vienen de la DB
    const [numEjercicios, setNumEjercicios] = useState(0);
    
    // Estados para el formulario
    const [nombre, setNombre] = useState("");
    const [nivel, setNivel] = useState("");
    const [listaEjercicios, setListaEjercicios] = useState([]);

    // 2. CARGAR EJERCICIOS AL MONTAR
    async function traerEjercicios() {
        try {
            const response = await fetch('https://backend-imperio.vercel.app/ejercicios');
            const data = await response.json();
            if (data.success) setEjerciciosCatalogo(data.data);
        } catch (error) {
            console.error("Error al traer ejercicios:", error);
        }
    }

    useEffect(() => {
        traerEjercicios();
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // 3. FUNCIONES DE LÓGICA
    const definirCantidad = () => {
        const cant = prompt('¿Cuántos ejercicios va a tener la rutina?');
        if (cant && !isNaN(cant)) {
            const n = parseInt(cant);
            setNumEjercicios(n);
            // Inicializamos el array de la rutina con objetos vacíos
            setListaEjercicios(Array(n).fill({ ejercicio_id: "", series: 0, repeticiones: 0 }));
        }
    };

    const updateEjercicio = (index, campo, valor) => {
        const nuevos = [...listaEjercicios];
        // Creamos una copia del objeto para no mutar el estado directamente
        nuevos[index] = { ...nuevos[index], [campo]: valor };
        setListaEjercicios(nuevos);
    };

    const guardarRutina = async () => {
        let creadorId = localStorage.getItem('userId');
        if(creadorId === null){
            creadorId = 0;
        }
        const body = {
            nombreRutina: nombre,
            nivel: nivel,
            creador: creadorId,
            ejercicios: listaEjercicios 
        };

        try {
            const res = await fetch('https://backend-imperio.vercel.app/nuevaRutina', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if(data.success)
                alert("¡Rutina guardada con éxito!")
                window.location.reload();
        } catch (error) {
            alert("Error al conectar con el servidor");
        }
    };

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="contenidoModalRutinas" onClick={(e) => e.stopPropagation()}>
                <div className="contenidoModal">
                    <h2>Crear Rutina</h2>
                    <button className="btn-rutinas" onClick={definirCantidad}>
                        {numEjercicios > 0 ? 'Cambiar cantidad' : 'Definir cantidad de ejercicios'}
                    </button><br />

                    <label>Nombre de la Rutina: </label>
                    <input 
                        className="inputRutinas" 
                        type="text" 
                        placeholder="Ej: Empuje Hipertrofia" 
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    <label>Nivel: </label>
                    <select onChange={(e) => setNivel(e.target.value)}>
                        <option value="">Selecciona nivel</option>
                        <option value="Principiante">Principiante</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Experto">Experto</option>
                    </select>

                    {/* RENDERIZADO DINÁMICO */}
                    {listaEjercicios.map((_, index) => (
                        <div key={index} className="ejercicio-row">
                            <label>Ejercicio {index + 1}: </label>
                            <select onChange={(e) => updateEjercicio(index, 'ejercicio_id', e.target.value)}>
                                <option value="">Selecciona un ejercicio</option>
                                {ejerciciosCatalogo.map((ej) => (
                                    <option key={ej.id} value={ej.id}>{ej.nombre}</option>
                                ))}
                            </select>

                            <div className="ejercicio-row__inputs">
                                <div>
                                    <label>Series: </label>
                                    <input className="inputRutinas" type="number" onChange={(e) => updateEjercicio(index, 'series', e.target.value)} />
                                </div>
                                <div>
                                    <label>Reps: </label>
                                    <input className="inputRutinas" type="number" onChange={(e) => updateEjercicio(index, 'repeticiones', e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {numEjercicios > 0 && (
                        <button type="button" onClick={guardarRutina} className="btn-primary modal-rutina__save">
                            Guardar Rutina
                        </button>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}