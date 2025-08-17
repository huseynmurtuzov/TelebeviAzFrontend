import "../assets/styles/hero.css"
import heroImage from "../assets/hero-bg.png"

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <img src={'https://images.unsplash.com/photo-1725940896118-739f53527af9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
           alt="Modern student housing" className="hero-image" />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <div className="hero-container">
          <h1 className="hero-title">Tələbələr üçün mənzil axtarışı</h1>
          <p className="hero-subtitle">
            Tələbələr üçün uyğun qiymətə keyfiyyətli mənzil və yataqxana yerləri. Təhlükəsiz və rahat yaşayış üçün ən
            yaxşı variantları seçdik. Həmyaşıdlarınızla birlikdə yaşayın və təhsil həyatınızdan maksimum zövq alın.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">5000+</span>
              <span className="stat-label">Aktiv Elan</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15000+</span>
              <span className="stat-label">Qeydiyyatlı Tələbə</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Şəhər</span>
            </div>
          </div>
          <div className="hero-actions">
            <button className="hero-btn primary">Elanlara bax</button>
            <button className="hero-btn secondary">Necə işləyir?</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
