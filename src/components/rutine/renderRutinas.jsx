import Rutinas from './rutinas';
import { useEffect, useState } from 'react';
import ModalRutinas from './modalCrearRutina'
import ModalEditRutinas from './modalEditarRutina'

export default function RenderRutinas() {
    const [rutinas, setRutinas] = useState([]);
    const [admin, setAdmin] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [editRutina, setEditRutina] = useState(false)
    const [editRutinaId, seteditRutinaId] = useState(null);

    async function traerRutinas() {
        try {
            const response = await fetch('http://localhost:3001/rutinas');
            const data = await response.json();

            if (data.success) {
                const formateadas = data.data.map(item => {
                    let ejerciciosFinal = [];

                    // Si ya es un objeto/array, lo usamos directamente
                    if (typeof item.ejercicios === 'object' && item.ejercicios !== null) {
                        ejerciciosFinal = item.ejercicios;
                    }
                    // Si es un string, lo parseamos
                    else if (typeof item.ejercicios === 'string') {
                        try {
                            ejerciciosFinal = JSON.parse(item.ejercicios);
                        } catch (e) {
                            console.error("Error parseando ejercicios string", e);
                            ejerciciosFinal = [];
                        }
                    }

                    return {
                        id: item.id,
                        nombre: item.nombre_rutina,
                        nivel: item.nivel,
                        ejercicios: ejerciciosFinal
                    };
                });

                setRutinas(formateadas);
            }
        } catch (error) {
            console.error("Error al traer rutinas:", error);
        }
    }


    useEffect(() => {
        traerRutinas();
        const adminU = localStorage.getItem('admin');
        if (adminU === 'true') {
            setAdmin(true)
        }

        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                setShowModal(false)
                setEditRutina(false)
            }
        }
        window.addEventListener('keydown', handleEsc)

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [showModal, editRutinaId]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Rutinas Disponibles</h1>
            <p>Explora nuestros planes de entrenamiento</p>
            {admin ? (<button className='btn-rutinas' onClick={() => setShowModal(true)}>Crear Rutina</button>) : null}

            {showModal ? (<ModalRutinas />) : null}
            {editRutina ? (<ModalEditRutinas rutinas={rutinas} idRutinaEditar={editRutinaId} />) : null}

            <Rutinas enviarId={(id) => seteditRutinaId(id)} activarEdicion={() => setEditRutina(true)} lista={rutinas} />
        </div>
    );
}