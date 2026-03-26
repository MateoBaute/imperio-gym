import '../components/stylesComponents.css'
import Productos from '../components/Shop/productos'

export default function Shop() {
    return (
        <div className='Shop'>
            <h1>Shop</h1>
            <p>Nuestros Productos</p>
            <Productos />
        </div>
    )
}
