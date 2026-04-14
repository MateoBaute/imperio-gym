import { useState, useEffect } from 'react'

export default function Servicios() {
    const [servicios, setSetvicios] = useState([]);

    const arrayServicios = [
        {
            id: 1,
            nombre: 'Asesoramiento de entrenamiento',
            descripcion: 'Contamos con personal altamente capacitado para asesorarte en tu entrenamiento y estar atentos ante cualquier consulta'
        },
        {
            id: 2,
            nombre: 'Rutinas Especiales',
            descripcion: 'Nuestros expertos en musculación se encuentran ahí para tener en cuenta lesiones, condición física y tus objetivos para tu cambio físico. Si lo deseas podes pedir una rutina Personalisada'
        },
        {
            id: 3,
            nombre: 'Noc que otro servicio poner',
            descripcion: 'No se me ocurri[o otro servicio pero tengo que poner tres cards para que quede mas lindo je'
        }
    ]

    useEffect(() => {
        setSetvicios(arrayServicios)
    }, [])

        return (
            <div className="servicios-grid">
                {servicios.map((servicio) => (
                    <div key={servicio.id} className="serviciosCards">
                        <h3>{servicio.nombre}</h3>
                        <p>{servicio.descripcion}</p>
                    </div>
                ))}
            </div>
        )
    }
