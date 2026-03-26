import imgGym from '../components/imgs/ImgGym.png'

export default function Home({ isLoggedIn }) {
    return (
        <div>
            <h1><span>Imperio</span> Gym</h1>
            <p>Bienvenido a Imperio Gym, tu gimnasio de confianza. Somos un gimnasio dedicado a ayudarte a mejorar tu salud y tu cuerpo.</p>
             <img src={imgGym} alt="imagenGym" id="ImgGymOne"/>
        </div>
    )
}