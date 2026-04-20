import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

import { useState, useEffect } from 'react'

import Planilla from '../components/mensualidad/planilla'
import MarcarIngresos from '../components/mensualidad/marcarIngreso'


export default function () {
    const { admin } = useContext(AppContext)
    const [Ingreso, setIngreso] = useState(false)

    const onClose = () => { setIngreso(false) }

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

    return (
        <div className="mensualidades">
                <Planilla />
            <div className="mensualidades__marcar-wrap">
                <button
                    type="button"
                    className="btn-marcar-ingreso"
                    onClick={() => { setIngreso(true) }}
                >
                    Marcar ingreso al gym
                </button>
                {Ingreso ? (
                    <MarcarIngresos onClose={onClose}/>) : null}
            </div>
        </div>
    )
}