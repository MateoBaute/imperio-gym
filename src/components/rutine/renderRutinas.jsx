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
            const response = await fetch('https://backend-imperio.vercel.app/rutinas');
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
        <div className="page-rutinas">
            <h1>Rutinas</h1>
            <p>Planes de entrenamiento pensados por nivel y objetivo</p>
            {admin ? (<button className='btn-rutinas' onClick={() => setShowModal(true)}>Crear Rutina</button>) : null}

            {showModal ? (<ModalRutinas onClose={() => setShowModal(false)} />) : null}
            {editRutina ? (<ModalEditRutinas rutinas={rutinas} idRutinaEditar={editRutinaId} onClose={() => setEditRutina(false)} />) : null}

            <Rutinas enviarId={(id) => seteditRutinaId(id)} activarEdicion={() => setEditRutina(true)} lista={rutinas} />
        </div>
    );
}