import { createPortal } from "react-dom"

export default function modalProd(){
    return createPortal (
        <div className="modalProds">Hola</div>
    ), document.body
}