import '../components/stylesComponents.css'
import Productos from '../components/Shop/productos'

export default function Shop() {
  return (
    <div className="Shop">
      <header className="page-header">
        <h1>Tienda</h1>
        <p className="subtitle">Productos y merchandising del gimnasio</p>
      </header>
      <Productos />
    </div>
  )
}
