import { createPortal } from "react-dom";

export default function editRutinas(){

    return createPortal(
        <div className="modal-wrapper">
        <div className="contenidoModalRutinas">
            <div className="contenidoModal">
                <h2>Editar Rutina</h2>
            </div>
        </div>
    </div>,
    document.body
    )
}