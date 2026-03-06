import RenderRutinas from "../components/rutine/renderRutinas"

export default function Rutinas({onClose}) {
    return (
        <div>
            <RenderRutinas onClose={onClose} />
        </div>
    )
}
