import imgGym from '../components/imgs/ImgGym.png'

export default function Home({ isLoggedIn }) {
    return (
        <div>
            <h1><span>Imperio</span> Gym</h1>
            <p>Welcome to Imprerio Gym, your trusted gym. We are a gym dedicated to helping you improve your health and your body.</p>
             <img src={imgGym} alt="imagenGym" id="ImgGymOne"/>
        </div>
    )
}