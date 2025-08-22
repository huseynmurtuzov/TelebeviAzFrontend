import "../assets/styles/hero.css"
import heroImage from "../assets/hero-bg.png"
import { useNavigate } from "react-router-dom"

const Hero = () => {
  const navigate = useNavigate();
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
            Tələbəsən və Bakıda kirayə ev axtarırsan? Ya da ev tapmısan ama otaq yoldaşı axtarırsan? Tam doğru yerdəsən.
            Bu platforma daha çox bölgələrdən Bakıya gəlib kirayə ev axtaran tələbələr üçün qurulub və heç bir kar amacı
            güdmür.
          </p>
          {/* <div className="hero-stats">
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
          </div> */}
          <div className="hero-actions">
            <a className="hero-btn primary" href="/listings">Elanlara bax</a>
            <a href="#howitworks" className="hero-btn secondary">Necə işləyir?</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
