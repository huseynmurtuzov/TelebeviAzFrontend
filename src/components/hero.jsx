import "./hero.css"
import logo from '../assets/logo.png'
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-background">
        <img
          src={'https://images.unsplash.com/photo-1725940896118-739f53527af9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
          alt="Modern interior with wooden panels and white furniture"
          className="hero-image"
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <h1 className="hero-title">Tələbələr üçün mənzil axtarışı</h1>
        <p className="hero-description">
          Tələbələr üçün uyğun qiymətə keyfiyyətli mənzil və yataqxana yerləri. Təhlükəsiz və rahat yaşayış üçün ən
          yaxşı variantları seçdik.
        </p>
        <button className="hero-button" onClick={() => window.location.href="/search"}>Elanlara bax</button>
      </div>
    </section>
  )
}
