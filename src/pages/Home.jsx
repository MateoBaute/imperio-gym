import imagenInicio from '../components/imgs/imagenInicio.jpg'

export default function Home() {

  return (
    <section className="page-home" aria-labelledby="home-title">
      <div className="page-home__hero">
        <img
          id="ImgGymOne"
          className="page-home__hero-img"
          src={imagenInicio}
          alt=""
          loading="eager"
          decoding="async"
        />
        <div className="page-home__hero-overlay" aria-hidden="true" />
        <div className="page-home__intro">
          <p className="eyebrow">Entrenamiento · comunidad · constancia</p>
          <h1 id="home-title">
            <span className="text-accent">Imperio</span> Gym
          </h1>
          <p className="lede">
            Un espacio pensado para entrenar con foco: equipamiento, acompañamiento y una comunidad que empuja en la misma dirección.
          </p>
        </div>
      </div>
    </section>
  )
}
